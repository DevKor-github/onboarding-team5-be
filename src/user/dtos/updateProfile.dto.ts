import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
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