import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new community.
 * Name must be unique and all fields are required.
 */
export class CreateCommunityDto {
  @ApiProperty({
    description: 'Unique community name (used in URLs)',
    example: 'tech',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Display title for the community',
    example: 'Technology and Innovation',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the community',
    example: 'A place to discuss all things tech.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
