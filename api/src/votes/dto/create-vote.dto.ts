// src/votes/dto/create-vote.dto.ts
import { IsNotEmpty, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsInt()
  @Min(-1)
  @Max(1)
  value: number; // -1 = downvote, 1 = upvote, 0 = neutral/remove
}
