import { IsOptional, IsIn } from 'class-validator';
/**
 * DTO for updating a vote's value (limited to -1 or 1).
 */
export class UpdateVoteDto {
    /** Optional updated vote value (must be -1 or 1) */
  @IsOptional()
  @IsIn([1, -1])
  value?: number;
}
