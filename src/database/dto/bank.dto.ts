import { ApiProperty } from '@nestjs/swagger';

export class BankDto {
  @ApiProperty({ required: false, readOnly: true })
  id?: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true, default: '' })
  externalOrg: string;

  @ApiProperty({ required: true, default: '' })
  externalId: string;

  @ApiProperty({ required: true })
  createdById: number;

  @ApiProperty({ required: true })
  lastModifiedById: number;

  toString(): string {
    return `<BANK> id: ${this.id}, name: ${this.name}, externalOrg: ${this.externalOrg}, externalId: ${this.externalId}`;
  }
}
