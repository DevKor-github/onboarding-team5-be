import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LeaveChatRoomDto {
    @IsNumber()
    @ApiProperty({ example: 3 })
    userId: number;

    @IsNumber()
    @ApiProperty({ example: 3 })
    chatRoomId: number;
  
}
