import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetUserProfileDto {
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