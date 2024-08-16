import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RefreshTokenDto } from 'src/auth/dtos/refreshToken.dto';
import { SignupDto } from 'src/auth/dtos/signup.dto';

type EndPoints =
  | 'login'
  | 'signup'
  | 'refresh';

export function Docs(endPoint: EndPoints) {
    switch (endPoint) {
        case 'signup': return applyDecorators(
            ApiBody({
                type: SignupDto,
            }));
        case 'login': return applyDecorators(
            ApiBody({
                type: LoginDto
            })
        );
        case 'refresh': return applyDecorators(
            ApiBody({
                type: RefreshTokenDto
            })
        );
    }
}