import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UpdateProfileDto } from 'src/user/dtos/updateProfile.dto';

type EndPoints =
  | 'user-info'
  | 'update-profile'
  | 'get-all'
  | 'delete';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'user-info': return applyDecorators(
      ApiOperation({
        description: "선택된 유저 정보 조회",
      })
    );
    case 'update-profile': return applyDecorators(
      ApiBody({
        type: UpdateProfileDto
      })
    );
    case 'get-all': return applyDecorators(
      ApiOperation({
        description: "모든 유저 정보 조회"
      })
    );
    case 'delete': return applyDecorators(
      ApiOperation({
        description: "현재 유저 삭제"
      })
    );
  }
}