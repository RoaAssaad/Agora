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
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Public route to fetch all posts.
   * Optional sort query: 'Recent', 'Popular', etc.
   */
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort method: Recent, Popular, etc.' })
  @ApiResponse({ status: 200, description: 'List of posts returned' })
  async findAll(@Query('sort') sort: string, @Request() req) {
    const user = req.user || null;
    return this.postService.findAll(user, sort);
  }

  /**
   * Public route to fetch a single post by ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  /**
   * Protected route to create a new post.
   */
  @UseGuards(JwtAuthGuard)
  @HttpPost()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() dto: CreatePostDto, @Request() req) {
    return this.postService.create(dto, req.user);
  }

  /**
   * Protected route to update an existing post.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the creator' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Request() req) {
    return this.postService.update(id, dto, req.user);
  }

  /**
   * Protected route to delete a post.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the creator' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user);
  }
}
