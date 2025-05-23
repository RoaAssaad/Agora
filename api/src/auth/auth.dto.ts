import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: 'Username (must be unique)' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Plain-text password' })
  @IsString()
  password: string;
}
