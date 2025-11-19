import { ApiProperty } from '@nestjs/swagger';

export class TransactionImportDto {
  @ApiProperty({ required: false, readOnly: true })
  id?: number;

  @ApiProperty({ required: true })
  tenantId: number;

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  transactionAmount: number;

  @ApiProperty()
  transactionDate: Date;

  @ApiProperty()
  payeeId: number;

  @ApiProperty()
  reconciled: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  subCategoryId: number;

  @ApiProperty({ required: true })
  createdById: number;

  @ApiProperty({ required: true })
  lastModifiedById: number;
}
