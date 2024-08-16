import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
    @ApiProperty({ example: "user-refresh-token" })
    refreshToken: string;
  }
  