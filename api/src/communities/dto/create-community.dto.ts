import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO for creating a new community.
 * Name must be unique and all fields are required.
 */
export class CreateCommunityDto {
    /** Unique community name (used in URLs) */
  @IsNotEmpty()
  @IsString()
  name: string;

  /** Display title for the community */
  @IsNotEmpty()
  @IsString()
  title: string;
  
  /** Description of the community */
  @IsNotEmpty()
  @IsString()
  description: string;
}
