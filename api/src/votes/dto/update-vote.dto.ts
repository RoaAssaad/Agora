import { IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating a vote's value (limited to -1 or 1).
 */
export class UpdateVoteDto {
  @ApiPropertyOptional({
    description: 'Updated vote value (must be -1 or 1)',
    enum: [-1, 1],
    example: 1,
  })
  @IsOptional()
  @IsIn([1, -1])
  value?: number;
}
