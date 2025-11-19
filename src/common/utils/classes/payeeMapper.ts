import { Logger } from '@nestjs/common';
import { PayeeDto } from '../../../database/dto/payee.dto';
import { PayeeMappingDto } from '../../../database/dto/payeeMapping.dto';
import { getMethodName } from '../utils';
import { DatabaseService } from '../../../database/db.service';

export enum LikePattern {
  DIRECT,
  STARTSWITH,
  ENDSWITH,
  INCLUDES,
  DIRECTMAP,
  NONE,
}

export class PayeeMapper {
  static readonly wildCard = '*/*';
  isClassInit: boolean = false;
  private payeeMap: Map<string, PayeeDto>;
  private startsWithMap: Map<string, PayeeMappingDto>;
  private endsWithMap: Map<string, PayeeMappingDto>;
  private includesMap: Map<string, PayeeMappingDto>;
  private directMap: Map<string, PayeeMappingDto>;

  constructor(
    private logger: Logger,
    private databaseService: DatabaseService,
  ) {}

  async initPayeeMapping(): Promise<boolean> {
    if (this.isClassInit) {
      return true;
    }
    const context = getMethodName(new Error('fake'));
    try {
      const payees: PayeeDto[] = await this.databaseService.getAllPayees();
      this.payeeMap = new Map(
        payees.map((payee) => {
          return [payee.payeeName.toUpperCase(), payee];
        }),
      );

      const payeeMapping: PayeeMappingDto[] =
        await this.databaseService.getAllPayeeMappings();
      this.startsWithMap = new Map();
      this.endsWithMap = new Map();
      this.directMap = new Map();
      this.includesMap = new Map();

      for (const payeeMap of payeeMapping) {
        const pattern: LikePattern = this.getPattern(payeeMap.payeeImportName);
        const scrubbedKey: string = this.scrubKey(payeeMap.payeeImportName);
        this.pickAMap(pattern).set(scrubbedKey, payeeMap);
      }

      this.isClassInit = true;

      return true;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : `Non-error value caught: ${e}`;
      const stack = e instanceof Error ? e.stack : 'Stack unavaiable';
      this.logger.error(message, stack, context);
      return false;
    }
  }

  async get(key: string): Promise<PayeeDto | PayeeMappingDto> {
    const scrubbedKey = this.scrubKey(key);
    if (!this.isClassInit) {
      if (!(await this.initPayeeMapping())) {
        throw new Error('Error initializing PayeeMapper');
      }
    }
    let currentPayee: PayeeDto | PayeeMappingDto = this.searchPayeeMap(scrubbedKey);
    currentPayee = currentPayee ? currentPayee : this.searchDirectMap(scrubbedKey);
    currentPayee = currentPayee ? currentPayee : this.searchStartsWithMap(scrubbedKey);
    currentPayee = currentPayee ? currentPayee : this.searchEndsWithMap(scrubbedKey);
    currentPayee = currentPayee
      ? currentPayee
      : this.searchIncludesWithMap(scrubbedKey);

    return currentPayee;
  }

  async set(
    key: string,
    setObject: PayeeDto | PayeeMappingDto,
    patternType: LikePattern,
  ): Promise<boolean> {
    const context = getMethodName(new Error('fake'));
    const map = this.pickAMap(patternType);

    try {
      if (!this.isClassInit) {
        if (!(await this.initPayeeMapping())) {
          throw new Error('Error initializing PayeeMapper');
        }
      }

      let dbResult: PayeeDto | PayeeMappingDto;

      if ((patternType = LikePattern.DIRECT && setObject instanceof PayeeDto)) {
        dbResult = await this.databaseService.insertPayee(setObject);
      } else if (setObject instanceof PayeeMappingDto) {
        dbResult = await this.databaseService.insertPayeeMap(setObject);
      } else {
        dbResult = <PayeeDto>(<unknown>null);
      }

      if (dbResult) {
        map.set(key, setObject);
        return true;
      }
      return false;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : `Non error value caught: ${e}`;
      const stack = e instanceof Error ? e.stack : 'Stack unavailable';
      this.logger.error(message, stack, context);
      return false;
    }
  }

  async delete(key: string, patternType: LikePattern): Promise<boolean> {
    const map = this.pickAMap(patternType);
    let dbDelete = false;
    if ((patternType = LikePattern.DIRECT)) {
      dbDelete = await this.databaseService.deletePayeeById(
        map.get(key)?.id || 0,
      );
    } else {
      dbDelete = await this.databaseService.deletePayeeMappingById(
        map.get(key)?.id || 0,
      );
    }
    if (dbDelete) {
      return this.pickAMap(patternType).delete(key);
    }
    return dbDelete;
  }

  getPattern(key: string): LikePattern {
    const endsWith: boolean = key.startsWith(PayeeMapper.wildCard);
    const startsWith: boolean = key.endsWith(PayeeMapper.wildCard);
    let pattern: LikePattern = LikePattern.NONE;

    pattern = startsWith
      ? endsWith
        ? LikePattern.INCLUDES
        : LikePattern.STARTSWITH
      : endsWith
        ? LikePattern.ENDSWITH
        : LikePattern.DIRECTMAP;

    return pattern;
  }

  private searchPayeeMap(key: string): PayeeDto {
    return this.payeeMap.get(key) || <PayeeDto>(<unknown>null);
  }

  private searchStartsWithMap(key: string): PayeeMappingDto {
    const filteredKeys = [...this.startsWithMap.keys()].filter((mapKey) =>
      key.startsWith(mapKey),
    );
    return (
      this.startsWithMap.get(
        this.processMapFilterResult(
          filteredKeys,
          'PayeeMapper.searchStartsWithMap',
        ),
      ) || <PayeeMappingDto>(<unknown>null)
    );
  }

  private searchEndsWithMap(key: string): PayeeMappingDto {
    const filteredKeys = [...this.endsWithMap.keys()].filter((mapKey) =>
      key.endsWith(mapKey),
    );
    return (
      this.endsWithMap.get(
        this.processMapFilterResult(
          filteredKeys,
          'PayeeMapper.searchEndsWithMap',
        ),
      ) || <PayeeMappingDto>(<unknown>null)
    );
  }

  private searchIncludesWithMap(key: string): PayeeMappingDto {
    const filteredKeys = [...this.includesMap.keys()].filter((mapKey) =>
      mapKey.includes(key),
    );
    return (
      this.includesMap.get(
        this.processMapFilterResult(
          filteredKeys,
          'PayeeMapper.searchIncludesWithMap',
        ),
      ) || <PayeeMappingDto>(<unknown>null)
    );
  }

  private searchDirectMap(key: string): PayeeMappingDto {
    const filteredKeys = [...this.directMap.keys()].filter(
      (mapKey) => mapKey === this.scrubKey(key),
    );
    return (
      this.directMap.get(
        this.processMapFilterResult(
          filteredKeys,
          'PayeeMapper.searchIncludesWithMap',
        ),
      ) || <PayeeMappingDto>(<unknown>null)
    );
  }

  private scrubKey(key: string): string {
    let tempString = key.toUpperCase();
    if (key.startsWith(PayeeMapper.wildCard)) {
      tempString = tempString.slice(PayeeMapper.wildCard.length);
    }
    if (key.endsWith(PayeeMapper.wildCard)) {
      tempString = tempString.slice(
        0,
        key.length - PayeeMapper.wildCard.length,
      );
    }

    return tempString;
  }

  private pickAMap(
    pattern: LikePattern,
  ): Map<string, PayeeMappingDto | PayeeDto> {
    switch (pattern) {
      case LikePattern.STARTSWITH:
        return this.startsWithMap;
      case LikePattern.ENDSWITH:
        return this.endsWithMap;
      case LikePattern.DIRECTMAP:
        return this.directMap;
      case LikePattern.INCLUDES:
        return this.includesMap;
      case LikePattern.DIRECT:
        return this.payeeMap;
      default:
        return this.payeeMap;
    }
  }

  private processMapFilterResult(keyList: string[], context: string): string {
    if (keyList.length === 0) {
      return '';
    } else if (keyList.length > 1) {
      this.logger.warn(`Race condition exists for key ${keyList[0]}`, context);
    }

    return keyList[0];
  }
}
