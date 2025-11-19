import { ApiProperty } from '@nestjs/swagger';

export class TransactionCreateDto {
  @ApiProperty({ required: true })
  transactionTypeName: string;

  @ApiProperty({ required: true })
  payeeName: string;

  @ApiProperty({ required: true })
  transactionDate: string;

  @ApiProperty({ required: true })
  transactionAmount: number;

  @ApiProperty({ required: true })
  reconciled: string;

  @ApiProperty({ required: true })
  categoryName: string;

  @ApiProperty({ required: true })
  subCategoryName: string;

  @ApiProperty({ required: true })
  tenantId: number;

  @ApiProperty({ required: true })
  createdByUserName: string;
}
