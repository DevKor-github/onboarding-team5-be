import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

{ ApiProperty }

export class SendMessageDto {
  
  @IsNumber()
  @ApiProperty()
  chatRoomId: number;

  @IsNumber()
  @ApiProperty()
  senderId: number;

  @IsString()
  @ApiProperty()
  content: string;
}
