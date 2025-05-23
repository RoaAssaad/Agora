import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating a new post.
 */
export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Text content of the post' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID of the community where the post will be added' })
  @IsNotEmpty()
  @IsString()
  communityId: string;

  @ApiPropertyOptional({ description: 'Optional base64-encoded image string' })
  @IsOptional()
  @IsString()
  image?: string;
}
