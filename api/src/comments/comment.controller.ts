// src/comments/comment.controller.ts
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
  
  @Controller('comments')
  export class CommentController {
    constructor(private readonly commentService: CommentService) {}
  
    //  Protected: Create a comment
    @UseGuards(JwtAuthGuard)
    @HttpPost()
    async create(@Body() dto: CreateCommentDto, @Request() req) {
      return this.commentService.create(dto, req.user);
    }
  
    //  Public: Get all comments for a post
    @Get('post/:postId')
    async findByPost(@Param('postId') postId: string) {
      return this.commentService.findByPost(postId);
    }
  
    //  Public: Get all comments (mainly for admin/dev purposes)
    @Get()
    async findAll() {
      return this.commentService.findAll();
    }
  }
  