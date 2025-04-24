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


    /**
   * Creates a comment on a specific post.
   * @param dto - The comment content and post ID.
   * @param user - The user making the comment.
   * @returns The created comment.
   * @throws NotFoundException if the post doesn't exist.
   */

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
    /**
   * Retrieves all comments for a given post.
   * @param postId - The ID of the post.
   * @returns A list of comments with user info.
   */

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { created_at: 'ASC' },
    });
  }
    /**
   * Retrieves all comments in the database.
   * @returns All comments including their associated post and user.
   */
  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({ relations: ['post', 'user'] });
  }
}
