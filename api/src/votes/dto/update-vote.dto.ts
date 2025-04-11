import { IsOptional, IsIn } from 'class-validator';

export class UpdateVoteDto {
  @IsOptional()
  @IsIn([1, -1])
  value?: number;
}
