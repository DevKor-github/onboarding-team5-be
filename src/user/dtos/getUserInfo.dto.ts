import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetUserProfileDto {
  
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
  @ApiProperty({ example: "장르. 제외 예정" })
  genre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "ddddd.dddd" })
  profileImagePath: string;
}