import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateChatRoomDto {
    @IsString()
    name: string;

    @IsArray()
    userIds: number[];
  
    @IsString()
    @IsOptional()
    mainImage?: string;
}
