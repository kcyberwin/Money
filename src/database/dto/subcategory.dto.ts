import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDto {
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ApiProperty({ required: true })
  subcategoryName: string;

  @ApiProperty({ required: true })
  categoryId: number;

  @ApiProperty({ required: true })
  createdById: number;

  @ApiProperty({ required: true })
  lastModifiedById: number;
}
