import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GetMyProfileDto {

  @IsString()
  @ApiProperty({ example: "홍길동" })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'abcdefg@ddddddd.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: "root00))" })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "안녕하세요" })
  introduction: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "장르. 제외 예정" })
  genre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "ddddd.dddd" })
  profileImagePath: string;
}