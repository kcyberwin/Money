import { ApiProperty } from "@nestjs/swagger";

export class BankDto {
 @ApiProperty({ required: false, readOnly: true })
 id: number;

 @ApiProperty({ required: true })
 name: string;

 @ApiProperty({ required: true})
 externalId: string

 @ApiProperty({ required: true})
 createdById: number;

 @ApiProperty({ required: true})
 lastModifiedById: number;

}