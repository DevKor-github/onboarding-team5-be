import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: "abcdefg@ddddddd.com" })
  email: string;

  @IsString()
  @ApiProperty({ example: "root00))" })
  password: string;
}
