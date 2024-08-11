import { IsString, IsOptional } from 'class-validator';

export class GetUserProfileDto {
  @IsOptional()
  @IsString()
  introduction: string;

  @IsOptional()
  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  profileImagePath: string;
}