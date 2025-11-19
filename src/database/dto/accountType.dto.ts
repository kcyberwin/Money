import { ApiProperty } from '@nestjs/swagger';

export class AccountTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  accountTypeName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdById: number;

  @ApiProperty()
  lastModifiedById: number;
}
