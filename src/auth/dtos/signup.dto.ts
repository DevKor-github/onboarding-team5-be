import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(1)
  name: string;

  @IsString()
  @Length(1)
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}