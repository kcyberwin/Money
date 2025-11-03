import { ApiProperty } from "@nestjs/swagger";

export class TenantDto {
 @ApiProperty({ required: false, readOnly: true })
 id: number;

 @ApiProperty({ required: true })
 tenantName: string;

 @ApiProperty({ required: true})
 createdById: number;

 @ApiProperty({ required: true})
 lastModifiedById: number;

}