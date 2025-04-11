import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //  Public: Get all posts (with optional user context for votes)
  @Get()
  async findAll(@Request() req) {
    const user = req.user || null;
    return this.postService.findAll(user);
  }

  //  Public: Get single post by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  //  Protected: Create new post
  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() dto: CreatePostDto, @Request() req) {
    return this.postService.create(dto, req.user);
  }

  //  Protected: Update post (only by creator)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Request() req) {
    return this.postService.update(id, dto, req.user);
  }

  //  Protected: Delete post (only by creator)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user);
  }
}
