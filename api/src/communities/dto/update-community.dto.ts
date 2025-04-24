import { IsOptional, IsString } from 'class-validator';
/**
 * DTO for updating a community.
 * Supports partial updates of title and description.
 */
export class UpdateCommunityDto {
    /** Optional updated title */
  @IsOptional()
  @IsString()
  title?: string;
  
  /** Optional updated description */
  @IsOptional()
  @IsString()
  description?: string;
}
