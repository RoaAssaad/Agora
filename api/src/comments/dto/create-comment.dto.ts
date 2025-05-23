import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a comment on a post.
 */
export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment content (text)',
    example: 'This is a great post!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'ID of the post the comment belongs to',
    example: '3b3b0f3a-6d45-4e01-9c5f-ae178e44b6f2',
  })
  @IsNotEmpty()
  @IsString()
  postId: string;
}
