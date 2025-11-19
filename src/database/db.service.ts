import { Injectable, Logger } from '@nestjs/common';
import { formatDateForDB } from '../common/utils/utils';
import { MysqlService } from '../database/mysql/mysql.service';

// DTO imports
import { BankDto } from './dto/bank.dto';
import { AccountDto } from './dto/account.dto';
import { PayeeDto } from './dto/payee.dto';
import { PayeeMappingDto } from './dto/payeeMapping.dto';
import { TransactionTypeDto } from './dto/transactionType.dto';
import { UserRoleDto } from './dto/useRole.dto';
import { UserDto } from './dto/user.dto';
import { AccountTypeDto } from './dto/accountType.dto';
import { DbModifyResult } from './dto/dbRowModify.dto';
import { TenantDto } from './dto/tenant.dto';
import { CategoryTypeDto } from './dto/categoryType.dto';
import { CategoryDto } from './dto/category.dto';

// SQL Text imports
import * as sqlSelects from './sqltxt/select.sql.json';
import * as sqlInserts from './sqltxt/insert.sql.json';
import * as sqlUpdates from './sqltxt/update.sql.json';
import * as sqlDeletes from './sqltxt/delete.sql.json';
import { SubCategoryDto } from './dto/subcategory.dto';
import { TransactionImportDto } from './dto/transactionImport.dto';

@Injectable()
export class DatabaseService {
  constructor(
    private logger: Logger,
    private sqlService: MysqlService,
  ) {}

  /******** Select Alls *******/
  async getAllPayees(): Promise<PayeeDto[]> {
    return <PayeeDto[]>await this.sqlService.findAll(sqlSelects.PAYEES, []);
  }

  async getAllPayeeMappings(): Promise<PayeeMappingDto[]> {
    return <PayeeMappingDto[]>(
      await this.sqlService.findAll(sqlSelects['PAYEE-MAPS'], [])
    );
  }

  async getAllUserRoles(): Promise<UserRoleDto[]> {
    return <UserRoleDto[]>(
      await this.sqlService.findAll(sqlSelects['USER-ROLES'], [])
    );
  }

  async getAllUsers(): Promise<UserDto[]> {
    return <UserDto[]>await this.sqlService.findAll(sqlSelects.USERS, []);
  }

  async getAllAccountTypes(): Promise<AccountTypeDto[]> {
    return <AccountTypeDto[]>(
      await this.sqlService.findAll(sqlSelects['ACCOUNT-TYPES'], [])
    );
  }

  async getAllTransactionTypes(): Promise<TransactionTypeDto[]> {
    return <TransactionTypeDto[]>(
      await this.sqlService.findAll(sqlSelects['TRANSACTION-TYPES'], [])
    );
  }

  async getAllTenants(): Promise<TenantDto[]> {
    return <TenantDto[]>await this.sqlService.findAll(sqlSelects.TENANTS, []);
  }

  async getAllBanks(): Promise<BankDto[]> {
    return <BankDto[]>await this.sqlService.findAll(sqlSelects.BANKS, []);
  }

  async getAllAccounts(): Promise<AccountDto[]> {
    return <AccountDto[]>await this.sqlService.findAll(sqlSelects.ACCOUNTS, []);
  }

  async getAllCategoryTypes(): Promise<CategoryTypeDto[]> {
    return <CategoryTypeDto[]>(
      await this.sqlService.findAll(sqlSelects['CATEGORY-TYPES'], [])
    );
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    return <CategoryDto[]>(
      await this.sqlService.findAll(sqlSelects.CATEGORIES, [])
    );
  }

  async getAllSubcategories(): Promise<SubCategoryDto[]> {
    return <SubCategoryDto[]>(
      await this.sqlService.findAll(sqlSelects.SUBCATEGORIES, [])
    );
  }

  async getAllPayeeMaps(): Promise<PayeeMappingDto[]> {
    return <PayeeMappingDto[]>(
      await this.sqlService.findAll(sqlSelects['PAYEE-MAP'], [])
    );
  }

  /******** Select By ID *******/
  async getPayeeById(id: number): Promise<PayeeDto> {
    return (<PayeeDto[]>(
      await this.sqlService.findOneById(sqlSelects.PAYEE, id)
    ))[0];
  }

  async getUserRoleById(id: number): Promise<UserRoleDto> {
    return (<UserRoleDto[]>(
      await this.sqlService.findOneById(sqlSelects['USER-ROLE'], id)
    ))[0];
  }

  async getUserById(id: number): Promise<UserDto> {
    return (<UserDto[]>(
      await this.sqlService.findOneById(sqlSelects.USER, id)
    ))[0];
  }

  async getAccountTypeById(id: number): Promise<AccountTypeDto> {
    return (<AccountTypeDto[]>(
      await this.sqlService.findOneById(sqlSelects['ACCOUNT-TYPE'], id)
    ))[0];
  }

  async getTransactionTypeById(id: number): Promise<TransactionTypeDto> {
    return (<TransactionTypeDto[]>(
      await this.sqlService.findOneById(sqlSelects['TRANSACTION-TYPE'], id)
    ))[0];
  }

  async getTenantById(id: number): Promise<TenantDto> {
    return (<TenantDto[]>(
      await this.sqlService.findOneById(sqlSelects.TENANT, id)
    ))[0];
  }

  async getBankById(id: number): Promise<BankDto> {
    return (<BankDto[]>(
      await this.sqlService.findOneById(sqlSelects.BANK, id)
    ))[0];
  }

  async getAccountById(id: number): Promise<AccountDto> {
    return (<AccountDto[]>(
      await this.sqlService.findOneById(sqlSelects.ACCOUNT, id)
    ))[0];
  }

  async getCategoryTypeById(id: number): Promise<CategoryTypeDto> {
    return (<CategoryTypeDto[]>(
      await this.sqlService.findOneById(sqlSelects['CATEGORY-TYPE'], id)
    ))[0];
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    return (<CategoryDto[]>(
      await this.sqlService.findOneById(sqlSelects.CATEGORY, id)
    ))[0];
  }

  async getSubCategoryById(id: number): Promise<SubCategoryDto> {
    return (<SubCategoryDto[]>(
      await this.sqlService.findOneById(sqlSelects.SUBCATEGORY, id)
    ))[0];
  }

  async getPayeeMapById(id: number): Promise<PayeeMappingDto> {
    return (<PayeeMappingDto[]>(
      await this.sqlService.findOneById(sqlSelects['PAYEE-MAP'], id)
    ))[0];
  }

  /******** Select all with filter *******/
  async getSubcategoriesByCategory(
    categoryId: number,
  ): Promise<SubCategoryDto[]> {
    return <SubCategoryDto[]>(
      await this.sqlService.findAll(sqlSelects.SUBCATEGORIESBYCAT, [categoryId])
    );
  }

  async getPayeeMapByPayee(payeeId: number): Promise<PayeeMappingDto[]> {
    return <PayeeMappingDto[]>(
      await this.sqlService.findAll(sqlSelects['PAYEE-MAP-BY-PAYEE'], [payeeId])
    );
  }

  async getBankByExternalId(
    externalId: string,
    externalOrg: string,
  ): Promise<BankDto> {
    return (<BankDto[]>(
      await this.sqlService.findAll(sqlSelects.BANKBYEXTERNAL, [
        externalOrg,
        externalId,
      ])
    ))[0];
  }

  async getAccountByBankAndNumber(
    bankId: number,
    accountNum: string,
  ): Promise<AccountDto> {
    return (<AccountDto[]>(
      await this.sqlService.findAll(sqlSelects.ACCOUNTBYBANKANDNUMBER, [
        accountNum,
        bankId,
      ])
    ))[0];
  }

  async getTransactionTypesByAccountType(
    accountTypeId: number,
  ): Promise<TransactionTypeDto[]> {
    return <TransactionTypeDto[]>(
      await this.sqlService.findAll(
        sqlSelects['TRANSACTION-TYPES-BY-ACCOUNT-TYPE'],
        [accountTypeId],
      )
    );
  }

  /******** Insert Ones *******/
  async insertPayee(createPayeeDto: PayeeDto): Promise<PayeeDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.PAYEE, [
        createPayeeDto.payeeName,
        createPayeeDto.defaultSubCategoryId,
        createPayeeDto.createdById,
        createPayeeDto.lastModifiedById,
      ])
    );

    return { ...createPayeeDto, id: result.insertId };
  }

  async insertUserRole(createUserRoleDto: UserRoleDto): Promise<UserRoleDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['USER-ROLE'], [
        createUserRoleDto.roleName,
        createUserRoleDto.description,
        createUserRoleDto.createdById,
        createUserRoleDto.lastModifiedById,
      ])
    );

    return { ...createUserRoleDto, id: result.insertId };
  }

  async insertUser(createUserDto: UserDto): Promise<UserDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.USER, [
        createUserDto.userName,
        createUserDto.password,
        createUserDto.userRoleId,
        createUserDto.createdById,
        createUserDto.lastModifiedById,
      ])
    );

    return { ...createUserDto, id: result.insertId };
  }

  async insertAccountType(
    createAccountTypeDto: AccountTypeDto,
  ): Promise<AccountTypeDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['ACCOUNT-TYPE'], [
        createAccountTypeDto.accountTypeName,
        createAccountTypeDto.description,
        createAccountTypeDto.createdById,
        createAccountTypeDto.lastModifiedById,
      ])
    );

    return { ...createAccountTypeDto, id: result.insertId };
  }

  async insertTransactionType(
    createTransactionType: TransactionTypeDto,
  ): Promise<TransactionTypeDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['TRANSACTION-TYPE'], [
        createTransactionType.displayName,
        createTransactionType.importName,
        createTransactionType.accountTypeId,
        createTransactionType.createdById,
        createTransactionType.lastModifiedById,
      ])
    );

    return { ...createTransactionType, id: result.insertId };
  }

  async insertTenant(createTenantDto: TenantDto): Promise<TenantDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.TENANT, [
        createTenantDto.tenantName,
        createTenantDto.createdById,
        createTenantDto.lastModifiedById,
      ])
    );

    return { ...createTenantDto, id: result.insertId };
  }

  async insertBank(createBankDto: BankDto): Promise<BankDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.BANK, [
        createBankDto.name,
        createBankDto.externalOrg,
        createBankDto.externalId,
        createBankDto.createdById,
        createBankDto.lastModifiedById,
      ])
    );

    return { ...createBankDto, id: result.insertId };
  }

  async insertAccount(createAccountDto: AccountDto): Promise<AccountDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.ACCOUNT, [
        createAccountDto.accountNum,
        createAccountDto.displayName,
        createAccountDto.accountTypeId,
        createAccountDto.tenantId,
        createAccountDto.bankId,
        createAccountDto.createdById,
        createAccountDto.lastModifiedById,
      ])
    );

    return { ...createAccountDto, id: result.insertId };
  }

  async insertCategoryType(
    createCategoryType: CategoryTypeDto,
  ): Promise<CategoryTypeDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['CATEGORY-TYPE'], [
        createCategoryType.categoryTypeName,
        createCategoryType.createdById,
        createCategoryType.lastModifiedById,
      ])
    );

    return { ...createCategoryType, id: result.insertId };
  }

  async insertCategory(createCategory: CategoryDto): Promise<CategoryDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.CATEGORY, [
        createCategory.categoryTypeId,
        createCategory.categoryName,
        createCategory.createdById,
        createCategory.lastModifiedById,
      ])
    );

    return { ...createCategory, id: result.insertId };
  }

  async insertSubCategory(
    createSubCategory: SubCategoryDto,
  ): Promise<SubCategoryDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts.SUBCATEGORY, [
        createSubCategory.subcategoryName,
        createSubCategory.categoryId,
        createSubCategory.createdById,
        createSubCategory.lastModifiedById,
      ])
    );

    return { ...createSubCategory, id: result.insertId };
  }

  async insertPayeeMap(
    createPayeeMapDto: PayeeMappingDto,
  ): Promise<PayeeMappingDto> {
    const result: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['PAYEE-MAP'], [
        createPayeeMapDto.payeeImportName,
        createPayeeMapDto.mappedPayeeId,
      ])
    );

    return { ...createPayeeMapDto, id: result.insertId };
  }

  async insertImportTransaction(
    createTransactionDto: TransactionImportDto,
  ): Promise<boolean> {
    const dbResult: DbModifyResult = <DbModifyResult>(
      await this.sqlService.insertOne(sqlInserts['TRANSACTION-IMPORT'], [
        createTransactionDto.tenantId,
        createTransactionDto.typeId,
        createTransactionDto.transactionAmount,
        formatDateForDB(createTransactionDto.transactionDate),
        createTransactionDto.payeeId,
        createTransactionDto.reconciled,
        createTransactionDto.categoryId,
        createTransactionDto.subCategoryId,
        createTransactionDto.createdById,
        createTransactionDto.lastModifiedById,
      ])
    );

    if (dbResult.insertId > 0) {
      return true;
    }
    return false;
  }

  /******** Update by ID *******/
  async updatePayeeById(updatePayeeDto: PayeeDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.PAYEE, [
      updatePayeeDto.payeeName,
      updatePayeeDto.defaultSubCategoryId,
      updatePayeeDto.lastModifiedById,
      updatePayeeDto.id,
    ]);
  }

  async updateUserRoleById(updateUserRoleDto: UserRoleDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates['USER-ROLE'], [
      updateUserRoleDto.roleName,
      updateUserRoleDto.description,
      updateUserRoleDto.lastModifiedById,
      updateUserRoleDto.id,
    ]);
  }

  async updateUserById(updateUserDto: UserDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.USER, [
      updateUserDto.password,
      updateUserDto.userRoleId,
      updateUserDto.lastModifiedById,
      updateUserDto.id,
    ]);
  }

  async updateAccountTypeById(
    updateAccountTypeDto: AccountTypeDto,
  ): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates['ACCOUNT-TYPE'], [
      updateAccountTypeDto.accountTypeName,
      updateAccountTypeDto.description,
      updateAccountTypeDto.lastModifiedById,
      updateAccountTypeDto.id,
    ]);
  }

  async updateTransactionTypeById(
    updateTransactionTypeDto: TransactionTypeDto,
  ): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates['TRANSACTION-TYPE'], [
      updateTransactionTypeDto.displayName,
      updateTransactionTypeDto.importName,
      updateTransactionTypeDto.accountTypeId,
      updateTransactionTypeDto.lastModifiedById,
      updateTransactionTypeDto.id,
    ]);
  }

  async updateTenantById(updateTenantDto: TenantDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.TENANT, [
      updateTenantDto.tenantName,
      updateTenantDto.lastModifiedById,
      updateTenantDto.id,
    ]);
  }

  async updateBankById(updateBankDto: BankDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.BANK, [
      updateBankDto.name,
      updateBankDto.externalOrg,
      updateBankDto.externalId,
      updateBankDto.lastModifiedById,
      updateBankDto.id || 0,
    ]);
  }

  async updateAccountById(updateAccountDto: AccountDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.ACCOUNT, [
      updateAccountDto.accountNum,
      updateAccountDto.displayName,
      updateAccountDto.lastModifiedById,
      updateAccountDto.id || 0,
    ]);
  }

  async updateCategoryTypeById(
    updateCategoryTypeDto: CategoryTypeDto,
  ): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates['CATEGORY-TYPE'], [
      updateCategoryTypeDto.categoryTypeName,
      updateCategoryTypeDto.lastModifiedById,
      updateCategoryTypeDto.id,
    ]);
  }

  async updateCategoryById(updateCategoryDto: CategoryDto): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.CATEGORY, [
      updateCategoryDto.categoryTypeId,
      updateCategoryDto.categoryName,
      updateCategoryDto.lastModifiedById,
      updateCategoryDto.id,
    ]);
  }

  async updateSubCategoryById(
    updateSubCategory: SubCategoryDto,
  ): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates.SUBCATEGORY, [
      updateSubCategory.subcategoryName,
      updateSubCategory.categoryId,
      updateSubCategory.lastModifiedById,
      updateSubCategory.id,
    ]);
  }

  async updatePayeeMapById(
    updatePayeeMapDto: PayeeMappingDto,
  ): Promise<boolean> {
    return this.sqlService.updateOne(sqlUpdates['PAYEE-MAP'], [
      updatePayeeMapDto.payeeImportName,
      updatePayeeMapDto.mappedPayeeId,
      updatePayeeMapDto.id,
    ]);
  }

  /******** Delete By ID *******/
  async deleteUserRoleById(id: number): Promise<boolean> {
    return this.deleteUserRoleById(id);
  }

  async deletePayeeById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.PAYEE, [id]);
  }

  async deletePayeeMappingById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes['PAYEE-MAPPING'], [id]);
  }

  async deleteUserById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.USER, [id]);
  }

  async deleteAccountTypeById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes['ACCOUNT-TYPE'], [id]);
  }

  async deleteTransactionTypeById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes['TRANSACTION-TYPE'], [id]);
  }

  async deleteTenantById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.TENANT, [id]);
  }

  async deleteBankById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.BANK, [id]);
  }

  async deleteAccountById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.ACCOUNT, [id]);
  }

  async deleteCategoryTypeById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes['CATEGORY-TYPE'], [id]);
  }

  async deleteCategoryById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.CATEGORY, [id]);
  }

  async deleteSubCategoryById(id: number): Promise<boolean> {
    return this.sqlService.deleteOne(sqlDeletes.SUBCATEGORY, [id]);
  }
}
