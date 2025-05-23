import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating a community.
 * Supports partial updates of title and description.
 */
export class UpdateCommunityDto {
  @ApiPropertyOptional({
    description: 'Updated title for the community',
    example: 'Tech Community',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated description for the community',
    example: 'Latest tech trends, startups, and innovation news.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
