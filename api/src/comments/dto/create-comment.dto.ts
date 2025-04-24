// src/comments/dto/create-comment.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO for creating a comment on a post.
 */
export class CreateCommentDto {
    /** Comment content */
  @IsNotEmpty()
  @IsString()
  content: string;
  
  /** ID of the post being commented on */
  @IsNotEmpty()
  @IsString()
  postId: string;
}
