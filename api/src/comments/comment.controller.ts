import {
  Controller,
  Post as HttpPost,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment under a post' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() dto: CreateCommentDto, @Request() req) {
    return this.commentService.create(dto, req.user);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all comments under a specific post' })
  @ApiParam({ name: 'postId', description: 'Post ID to filter comments' })
  @ApiResponse({ status: 200, description: 'List of comments for the post' })
  async findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(postId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments (admin/dev)' })
  @ApiResponse({ status: 200, description: 'List of all comments returned' })
  async findAll() {
    return this.commentService.findAll();
  }
}
