import { ApiProperty } from '@nestjs/swagger';

export class PayeeMappingDto {
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ApiProperty({ required: true })
  payeeImportName: string;

  @ApiProperty({ required: true })
  mappedPayeeId: number;
}
