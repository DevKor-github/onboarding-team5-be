import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatRoomDto } from 'src/chat/dtos/createChatRoom.dto';

type EndPoints =
  | 'list'
  | 'create-chat-room';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'list': return applyDecorators(
      ApiOperation({
        description: "유저가 참여한 채팅방 목록 조회. return {채팅방 아이디, 채팅방 이름, 업데이트된 시간}",
      })
    );
    case 'create-chat-room': return applyDecorators(
      ApiBody({
        type: CreateChatRoomDto
      })
    );
  }
}