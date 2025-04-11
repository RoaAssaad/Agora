// src/votes/vote.controller.ts
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
  
  @UseGuards(JwtAuthGuard)
  @Controller('votes')
  export class VoteController {
    constructor(private readonly voteService: VoteService) {}
  
    @Post()
    async createOrUpdate(@Body() dto: CreateVoteDto, @Request() req) {
      return this.voteService.createOrUpdate(dto, req.user);
    }
  
    @Get()
    async findAll() {
      return this.voteService.findAll();
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
      return this.voteService.remove(id, req.user);
    }
  }
  