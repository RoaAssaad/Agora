import {
    Injectable,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Post } from './post.entity';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { User } from '../users/user.entity';
  import { Community } from '../communities/community.entity';
  
  @Injectable()
  export class PostService {
    constructor(
      @InjectRepository(Post)
      private postRepository: Repository<Post>,
  
      @InjectRepository(Community)
      private communityRepository: Repository<Community>,
    ) {}
  
    async create(createDto: CreatePostDto, user: User): Promise<Post> {
      const community = await this.communityRepository.findOne({
        where: { id: createDto.communityId },
      });
  
      if (!community) {
        throw new NotFoundException('Community not found');
      }
  
      const post = this.postRepository.create({
        ...createDto,
        creator: user,
        community,
      });
  
      return this.postRepository.save(post);
    }
  
    async findAll(): Promise<Post[]> {
      return this.postRepository.find({
        relations: ['creator', 'community'],
        order: { created_at: 'DESC' },
      });
    }
  
    async findOne(id: string): Promise<Post> {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['creator', 'community'],
      });
  
      if (!post) {
        throw new NotFoundException('Post not found');
      }
  
      return post;
    }
  
    async update(id: string, updateDto: UpdatePostDto, user: User): Promise<Post> {
      const post = await this.findOne(id);
  
      if (post.creator.id !== user.id) {
        throw new ForbiddenException('You are not the creator of this post');
      }
  
      Object.assign(post, updateDto);
      return this.postRepository.save(post);
    }
  
    async remove(id: string, user: User): Promise<void> {
      const post = await this.findOne(id);
  
      if (post.creator.id !== user.id) {
        throw new ForbiddenException('You are not allowed to delete this post');
      }
  
      await this.postRepository.delete(id);
    }
  }
  