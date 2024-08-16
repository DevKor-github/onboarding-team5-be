import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateChatRoomDto {
    @IsString()
    @ApiProperty({ example: "홍길동" })
    name: string;

    @IsArray()
    @ApiProperty({ example: [1, 3] })
    userIds: number[];
  
    @IsString()
    @IsOptional()
    @ApiProperty({ example: "ddddddd.dddd" })
    mainImage?: string;
}
