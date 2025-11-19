import { Injectable, Logger } from '@nestjs/common';
import { Ofx, OfxResponse } from 'ofx-data-extractor';
import { getMethodName } from '../common/utils/utils';
import { DatabaseService } from '../database/db.service';
import { v4 as uuiddv4 } from 'uuid';
import { PayeeMapper, LikePattern } from '../common/utils/classes/payeeMapper';
// DTO imports
import { BankDto } from '../database/dto/bank.dto';
import { AccountDto } from '../database/dto/account.dto';
import { PayeeDto } from '../database/dto/payee.dto';
import { PayeeMappingDto } from '../database/dto/payeeMapping.dto';
import { TransactionTypeDto } from '../database/dto/transactionType.dto';
import { TransactionImportDto } from '../database/dto/transactionImport.dto';

//TODO: fix [Object, Object] output in debug logging

@Injectable()
export class FileIoService {
  private payeeMapper: PayeeMapper;

  constructor(
    private logger: Logger,
    private databbaseService: DatabaseService,
  ) {
    this.payeeMapper = new PayeeMapper(this.logger, this.databbaseService);
  }

  async processQfxFile(file: Express.Multer.File): Promise<OfxResponse> {
    const context = getMethodName(Error('fake'));
    try {
      const ofx = Ofx.fromBuffer(file.buffer);
      this.logger.debug(`processing Qfx file: ${file.originalname}`, context);
      const version = ofx.getHeaders().OFXHEADER;

      switch (version) {
        case '100':
          return this.processQfx100File(ofx.toJson(), 1, 1);
        default:
          return this.unsupportedFileVersion('qfx', version);
      }
    } catch (e) {
      this.logger.error(
        `Error processing file ${file.originalname}`,
        e instanceof Error ? e?.stack : e,
        context,
      );
      throw new Error('Qfx processing error');
    }
  }

  processOfxFile(file: Express.Multer.File): OfxResponse {
    const ofx = Ofx.fromBuffer(file.buffer);
    const ofxResponse = ofx.toJson();

    return ofxResponse;
  }

  unsupportedFile(file: Express.Multer.File): OfxResponse {
    throw new Error(`Unsupported File Type mimetype: ${file.mimetype}`);
  }

  private unsupportedFileVersion(
    fileType: string,
    fileVersion: string,
  ): OfxResponse {
    throw new Error(`Unsupported version ${fileVersion} of ${fileType}`);
  }

  //TODO: UPDATE USER LOGIC AFTER SECURITY
  private async processQfx100File(
    file: OfxResponse,
    userId: number,
    tenantId: number,
  ): Promise<OfxResponse> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug('processing qfx version 102', context);

      const bankOrg = file.OFX.SIGNONMSGSRSV1.SONRS.FI?.ORG || '';
      const bankId =
        file.OFX.SIGNONMSGSRSV1.SONRS.FI?.FID ||
        file.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.BANKID;
      const bank: BankDto = await this.getBank(bankOrg, bankId, userId);
      this.logger.debug(`Bank found: ${bank.toString()}`, context);

      const accountNum =
        file.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM.ACCTID;
      const account: AccountDto = await this.getAccount(
        accountNum,
        bank.id || 0,
      );
      this.logger.debug(`Account found ${account.toString()}`, context);

      const uniquePayees: string[] = [
        ...new Set(
          file.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STRTTRN?.map(
            (transaction) =>
              transaction.TRNTYPE.toUpperCase() === 'CHECK' &&
              (<string>transaction.NAME).toUpperCase().includes('DRAFT')
                ? 'DRAFT'
                : <string>transaction.NAME || '',
          ),
        ),
      ];

      const payeesHandled: number = await this.handlePayeeInserts(
        uniquePayees,
        userId,
      );
      this.logger.debug(
        `New Payees Inserted for file import: ${payeesHandled}`,
      );

      const transactionTypes: TransactionTypeDto[] =
        await this.databbaseService.getTransactionTypesByAccountType(
          account.accountTypeId,
        );
      const transactionTypesMap: Map<string, TransactionTypeDto> = new Map(
        transactionTypes.map((transType) => {
          return [transType.importName, transType];
        }),
      );
      this.logger.debug(
        `Transaction Types found ${[...transactionTypesMap.keys()].toString()}`,
      );

      const transList: TransactionImportDto[] = [];

      for (const statementTransaction of file.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS
        .BANKTRANLIST.STRTTRN || []) {
        const payee: PayeeDto | PayeeMappingDto = await this.payeeMapper.get(
          statementTransaction.NAME,
        );
        const payeeId: number =
          payee instanceof PayeeDto ? payee.id : payee.mappedPayeeId;

        transList.push({
          tenantId,
          typeId:
            transactionTypesMap.get(statementTransaction.TRNTYPE)?.id || 0,
          transactionAmount: Math.abs(statementTransaction.TRNAMT),
          transactionDate: new Date(statementTransaction.DTPOSTED),
          payeeId,
          reconciled: 'N',
          categoryId: 1,
          subCategoryId: 1,
          createdById: 1,
          lastModifiedById: 1,
        });
      }

      const transactionPromises: Promise<boolean>[] = [];

      transList.forEach((transaction) => {
        transactionPromises.push(
          this.databbaseService.insertImportTransaction(transaction),
        );
      });

      const results = Promise.allSettled(transactionPromises);

      /* Error handling  Change this whole thing to a single db transaction so I can rollback ?  */

      throw new Error('temp');
    } catch (e) {
      //TODO: ADD ERROR LOGIC TO LET THE FRONT END KNOW IF DB links are missing
      this.logger.error(
        'Qfx 102 file processing error',
        e instanceof Error ? e?.stack : e,
        context,
      );
      throw new Error('Qfx 102 Processing Error');
    }
  }

  /*****DB lookup/insert handlers */

  private async getBank(
    externalOrg: string,
    externalId: string,
    userId: number,
  ): Promise<BankDto> {
    let result: BankDto = await this.databbaseService.getBankByExternalId(
      externalId,
      externalOrg,
    );

    if (!result) {
      result = await this.databbaseService.insertBank({
        name: uuiddv4(),
        externalId: externalId,
        externalOrg: externalOrg,
        createdById: userId,
        lastModifiedById: userId,
      });
    }

    if (!result) {
      throw new Error('Bank Find/Insert Error On import');
    }
    return result;
  }

  /* No Insert handling - There is no way to determine the Account Type and so no way to pull accurate Transaction Types related to the new account */
  private async getAccount(
    accountNum: string,
    bankId: number,
  ): Promise<AccountDto> {
    const result: AccountDto =
      await this.databbaseService.getAccountByBankAndNumber(bankId, accountNum);
    if (!result) {
      throw new Error('Account Find/Insert Error on import');
    }
    return result;
  }

  private async handlePayeeInserts(
    uniquePayees: string[],
    userId: number,
  ): Promise<number> {
    let insertCounter = 0;
    for (const payee of uniquePayees) {
      const payeeRecord: PayeeDto | PayeeMappingDto =
        await this.payeeMapper.get(payee);
      if (!payeeRecord) {
        if (
          await this.payeeMapper.set(
            payee,
            <PayeeDto>{ payeeName: payee },
            LikePattern.DIRECT,
          )
        ) {
          insertCounter += 1;
        }
      }
    }
    return insertCounter;
  }
}
