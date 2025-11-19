import { ApiProperty } from '@nestjs/swagger';

export class CategoryTypeDto {
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ApiProperty({ required: true })
  categoryTypeName: string;

  @ApiProperty({ required: true })
  createdById: number;

  @ApiProperty({ required: true })
  lastModifiedById: number;
}
