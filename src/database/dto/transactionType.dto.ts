import { ApiProperty } from '@nestjs/swagger';

export class TransactionTypeDto {
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ApiProperty({ required: true })
  displayName: string;

  @ApiProperty({ required: true })
  importName: string;

  @ApiProperty({ required: true })
  accountTypeId: number;

  @ApiProperty({ required: true })
  createdById: number;

  @ApiProperty({ required: true })
  lastModifiedById: number;
}
