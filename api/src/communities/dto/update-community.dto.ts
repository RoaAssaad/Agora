import { IsOptional, IsString } from 'class-validator';

export class UpdateCommunityDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
