import { ApiProperty } from "@nestjs/swagger";

export class DbModifyResult {
    @ApiProperty()
    fieldCount: number;

    @ApiProperty()
    affectedRows: number;

    @ApiProperty()
    insertId: number;
    
    @ApiProperty()
    info: string;

    @ApiProperty()
    serverStatus: number;

    @ApiProperty()
    warningStatus: number;

    @ApiProperty()
    changedRows: number;
}