// src/votes/dto/create-vote.dto.ts
import { IsNotEmpty, IsUUID, IsInt, Min, Max } from 'class-validator';
/**
 * DTO for casting or updating a vote on a post.
 */
export class CreateVoteDto {
    /** Post ID the vote applies to */
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  /**
   * Vote value:
   * -1 = downvote,
   *  1 = upvote,
   *  0 = remove/neutral
   */
  @IsInt()
  @Min(-1)
  @Max(1)
  value: number; 
}
