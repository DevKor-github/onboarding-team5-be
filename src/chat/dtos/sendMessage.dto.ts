import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SendMessageDto {
  
  @IsNumber()
  @ApiProperty({ example: 3 })
  chatRoomId: number;

  @IsNumber()
  @ApiProperty({ example: 3 })
  senderId: number;

  @IsString()
  @ApiProperty({ example: "안녕하세요" })
  message: string;
}
