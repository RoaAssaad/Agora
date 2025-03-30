import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Patch,
    Delete,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { CommunityService } from './community.service';
  import { CreateCommunityDto } from './dto/create-community.dto';
  import { UpdateCommunityDto } from './dto/update-community.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { User } from '../users/user.entity';
  
  @Controller('communities')
  export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCommunityDto, @Req() req: Request) {
      const user = req.user as User; // this comes from JWT
      return this.communityService.create(dto, user);
    }
  
    @Get()
    async findAll() {
      return this.communityService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.communityService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCommunityDto, @Req() req: Request) {
      const user = req.user as User;
      return this.communityService.update(id, dto, user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req) {
      return this.communityService.remove(id, req.user);
    }
    
  }    
  