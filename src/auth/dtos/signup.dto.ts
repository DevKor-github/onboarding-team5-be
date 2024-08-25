import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(1)
  @ApiProperty({ example: '홍길동' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'abcdefg@ddddddd.com' })
  email: string;

  @IsString()
  @Length(8)
  @ApiProperty({ example: 'root00))' })
  password: string;
}