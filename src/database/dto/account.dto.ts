import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({ default: '' })
  accountNum: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  accountTypeId: number;

  @ApiProperty()
  tenantId: number;

  @ApiProperty()
  bankId: number;

  @ApiProperty()
  createdById: number;

  @ApiProperty()
  lastModifiedById: number;

  toString(): string {
    return `<ACCOUNT> ID: ${this.id}, displayName: ${this.displayName}, tenanaId: ${this.tenantId}, bankId: ${this.bankId}`;
  }
}
