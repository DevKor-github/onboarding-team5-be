import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetUserInfoDto {
  
  @IsNumber()
  @ApiProperty({ example: 5 })
  id: number;

  @IsString()
  @ApiProperty({ example: "홍길동" })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "안녕하세요" })
  introduction: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "ddddd.dddd" })
  profileImagePath: string;
}