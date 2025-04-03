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
  
    // Protected: Create a post
    @UseGuards(JwtAuthGuard)
    @HttpPost()
    async create(@Body() dto: CreatePostDto, @Request() req) {
      return this.postService.create(dto, req.user);
    }
  
    // Public: Get all posts
    @Get()
    async findAll() {
      return this.postService.findAll();
    }
  
    // Public: Get single post
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.postService.findOne(id);
    }
  
    // Protected: Update post (only if user is creator)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() dto: UpdatePostDto,
      @Request() req,
    ) {
      return this.postService.update(id, dto, req.user);
    }
  
    // Protected: Delete post (only if user is creator)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
      return this.postService.remove(id, req.user);
    }
  }
  