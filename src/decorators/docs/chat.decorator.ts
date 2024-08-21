import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatRoomDto } from 'src/chat/dtos/createChatRoom.dto';
import { LeaveChatRoomDto } from 'src/chat/dtos/leaveChatRoom.dto';
import { SendMessageDto } from 'src/chat/dtos/sendMessage.dto';

type EndPoints =
  | 'list'
  | 'createChatRoom'
  | 'leaveChatRoom'
  | 'reconnectChatRoom'
  | 'sendMessage'
  | 'getChatRoomUserInfo';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'list': return applyDecorators(
      ApiOperation({
        description: "유저가 참여한 채팅방 목록 조회. return {채팅방 아이디, 채팅방 이름, 업데이트된 시간}",
      })
    );
    case 'createChatRoom': return applyDecorators(
      ApiBody({
        type: CreateChatRoomDto
      })
    );
    case 'leaveChatRoom': return applyDecorators(
      ApiBody({
        type: LeaveChatRoomDto
      })
    );
    case 'reconnectChatRoom': return applyDecorators(
      ApiBody({
        
      })
    )
    case 'sendMessage': return applyDecorators(
      ApiBody({
        type: SendMessageDto
      })
    );
    case 'getChatRoomUserInfo': return applyDecorators(
      ApiOperation({
        description: "채팅방 아이디를 query를 통해 보내면 채팅방 참여 중인 유저 정보 return"
      })
    );
  }
}