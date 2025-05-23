import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Votes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a vote on a post' })
  @ApiResponse({ status: 201, description: 'Vote created or updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createOrUpdate(@Body() dto: CreateVoteDto, @Request() req) {
    return this.voteService.createOrUpdate(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all votes (dev/debug)' })
  @ApiResponse({ status: 200, description: 'List of all votes returned' })
  async findAll() {
    return this.voteService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vote by ID' })
  @ApiParam({ name: 'id', description: 'Vote ID' })
  @ApiResponse({ status: 200, description: 'Vote deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden or not the vote owner' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.voteService.remove(id, req.user);
  }
}
