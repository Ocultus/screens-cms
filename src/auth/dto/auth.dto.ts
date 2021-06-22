import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty({ type: String, format: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, format: 'password' })
  password: string;
}

export class ResponseAuthDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: String, format: 'uuid' })
  userId: string;

  @ApiProperty({ type: String, format: 'email' })
  userEmail: string;
}
