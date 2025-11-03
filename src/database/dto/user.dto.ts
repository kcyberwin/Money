import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ required: false, readOnly: true })
    id: number;

    @ApiProperty({ required: true, readOnly: true })
    userName: string;

    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: true })
    userRoleId: number;

    @ApiProperty({ required: true })
    createdById: number;

    @ApiProperty({ required: true })
    lastModifiedById: number;

}