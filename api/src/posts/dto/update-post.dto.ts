import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating a post.
 */
export class UpdatePostDto {
  @ApiPropertyOptional({ description: 'Optional updated title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Optional updated content' })
  @IsOptional()
  @IsString()
  content?: string;
}
