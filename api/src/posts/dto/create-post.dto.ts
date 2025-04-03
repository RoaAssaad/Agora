// src/posts/dto/create-post.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  communityId: string;

  @IsOptional()
  @IsString()
  image?: string; //  optional base64 string
}
