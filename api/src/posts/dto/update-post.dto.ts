import { IsOptional, IsString } from 'class-validator';
/**
 * DTO for updating a post.
 * Allows partial updates of title or content.
 */
export class UpdatePostDto {
    /** Optional updated title */
  @IsOptional()
  @IsString()
  title?: string;
 /** Optional updated content */
  @IsOptional()
  @IsString()
  content?: string;
}
