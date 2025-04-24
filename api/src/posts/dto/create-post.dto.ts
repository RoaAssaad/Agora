// src/posts/dto/create-post.dto.ts

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
/**
 * DTO for creating a new post.
 * Requires title, content, and a valid community ID.
 */
export class CreatePostDto {
    /** Title of the post */
  @IsNotEmpty()
  @IsString()
  title: string;
  
 /** Text content of the post */
  @IsNotEmpty()
  @IsString()
  content: string;

/** ID of the community where the post will be added */
  @IsNotEmpty()
  @IsString()
  communityId: string;

  /** Optional base64-encoded image */
  @IsOptional()
  @IsString()
  image?: string; //  optional base64 string
}
