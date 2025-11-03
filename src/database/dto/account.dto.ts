import { ApiProperty } from "@nestjs/swagger";

export class AccountDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    displayName: string;

    @ApiProperty()
    accountTypeId: number;

    @ApiProperty()
    tenantId: number;

    @ApiProperty()
    bankId: number;

    @ApiProperty()
    createdById: number;

    @ApiProperty()
    lastModifiedById: number;

}