import { IsString, IsOptional } from "class-validator";

export class CreateChatRoomDto {
    @IsString()
    name: string;
  
    @IsString()
    @IsOptional()
    mainImage?: string;
}
