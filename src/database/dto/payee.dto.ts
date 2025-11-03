import { ApiProperty } from "@nestjs/swagger";

export class PayeeDto {
 @ApiProperty({ required: false, readOnly: true })
 id: number;

 @ApiProperty({ required: true })
 payeeName: string;

 @ApiProperty({ required: true})
 defaultSubCategoryId: number;

 @ApiProperty({ required: true})
 createdById: number;

 @ApiProperty({ required: true})
 lastModifiedById: number;

}