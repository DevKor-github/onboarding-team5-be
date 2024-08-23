import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsEmail } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @Length(1)
  @ApiProperty({ example: '홍길동' })
  name: string;
  
  @IsEmail()
  @ApiProperty({ example: 'abcdefg@ddddddd.com' })
  email: string;

  @IsString()
  @Length(6)
  @ApiProperty({ example: 'root00))' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "안녕하세요" })
  introduction: string;
}