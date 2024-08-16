import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: '3' })
  chatRoomId: number;

  @ApiProperty({ example: '안뇽?' })
  message: string;
}
