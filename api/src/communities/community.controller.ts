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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Communities')
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new community' })
  @ApiResponse({ status: 201, description: 'Community created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreateCommunityDto, @Req() req: Request) {
    const user = req.user as User;
    return this.communityService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all communities' })
  @ApiResponse({ status: 200, description: 'List of communities returned' })
  async findAll() {
    return this.communityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single community by ID' })
  @ApiParam({ name: 'id', description: 'Community ID' })
  @ApiResponse({ status: 200, description: 'Community found' })
  @ApiResponse({ status: 404, description: 'Community not found' })
  async findOne(@Param('id') id: string) {
    return this.communityService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a community by name' })
  @ApiParam({ name: 'name', description: 'Community name (URL-friendly)' })
  @ApiResponse({ status: 200, description: 'Community found by name' })
  @ApiResponse({ status: 404, description: 'Community not found' })
  async findByName(@Param('name') name: string) {
    return this.communityService.findByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a community (creator only)' })
  @ApiParam({ name: 'id', description: 'Community ID' })
  @ApiResponse({ status: 200, description: 'Community updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the creator' })
  update(@Param('id') id: string, @Body() dto: UpdateCommunityDto, @Req() req: Request) {
    const user = req.user as User;
    return this.communityService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a community (creator only)' })
  @ApiParam({ name: 'id', description: 'Community ID' })
  @ApiResponse({ status: 200, description: 'Community deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the creator' })
  async remove(@Param('id') id: string, @Req() req) {
    return this.communityService.remove(id, req.user);
  }
}
