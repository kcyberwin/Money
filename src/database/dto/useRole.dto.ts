import { ApiProperty } from "@nestjs/swagger";

export class UserRoleDto {
    @ApiProperty({ required: false, readOnly: true })
    id: number;

    @ApiProperty({ required: true })
    roleName: string;

    @ApiProperty({ required: true })
    description: string;

    @ApiProperty({ required: true })
    createdById: number;

    @ApiProperty({ required: true })
    lastModifiedById: number;
}