import { ApiProperty } from "@nestjs/swagger";

export class TenantUserMappingDto {
    @ApiProperty()
    tenantId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    createdById: number;

    @ApiProperty()
    lastModifiedById: number;

}