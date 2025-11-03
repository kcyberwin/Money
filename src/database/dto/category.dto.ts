import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
 @ApiProperty({ required: false, readOnly: true })
 id: number;

 @ApiProperty({ required: true })
 categoryTypeId: number;

 @ApiProperty({ required: true })
 categoryName: string;

 @ApiProperty({ required: true})
 createdById: number;

 @ApiProperty({ required: true})
 lastModifiedById: number;

}