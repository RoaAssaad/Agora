import { IsNotEmpty, IsUUID, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for casting or updating a vote on a post.
 */
export class CreateVoteDto {
  @ApiProperty({
    description: 'Post ID the vote applies to',
    example: 'f8a4e4a2-4e6d-437e-b9d5-46f39f7a6d33',
  })
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    description: 'Vote value (-1 = downvote, 1 = upvote, 0 = remove/neutral)',
    minimum: -1,
    maximum: 1,
    example: 1,
  })
  @IsInt()
  @Min(-1)
  @Max(1)
  value: number;
}
