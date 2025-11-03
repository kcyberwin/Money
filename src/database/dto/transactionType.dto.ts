import { ApiProperty } from "@nestjs/swagger";

export class TransactionTypeDto {
 @ApiProperty({ required: false, readOnly: true })
 id: number;

 @ApiProperty({ required: true })
 displayName: string;

 @ApiProperty({ required: true})
 createdById: number;

 @ApiProperty({ required: true})
 lastModifiedById: number;

}