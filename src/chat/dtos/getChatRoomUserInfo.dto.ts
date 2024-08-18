import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetChatRoomUserInfoDto {
    @IsNumber()
    @ApiProperty({ example: 3 })
    chatRoomId: number;
}
