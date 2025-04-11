// src/comments/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async create(dto: CreateCommentDto, user: User): Promise<Comment> {
    const post = await this.postRepo.findOne({ where: { id: dto.postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      post,
      user,
    });

    return this.commentRepo.save(comment);
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { created_at: 'ASC' },
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['post', 'user'] });
  }
}
