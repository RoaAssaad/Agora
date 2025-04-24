// src/posts/post.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';
import { Vote } from '../votes/vote.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Community)
    private communityRepository: Repository<Community>,

    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

    /**
   * Creates a new post within a community.
   * @param createDto - Data transfer object for post creation.
   * @param user - The user creating the post.
   * @returns The created post.
   * @throws NotFoundException if the community does not exist.
   */

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

    /**
   * Fetches all posts with optional sorting and user vote context.
   * @param currentUser - The currently logged-in user (optional).
   * @param sort - Sort method: 'Recent' | 'Popular' | 'Top' | .
   * @returns An array of posts with optional userVote field.
   */

  async findAll(currentUser?: User, sort: string = 'Recent'): Promise<any[]> {
    let order: any = {};
    let where: any = {};

    switch (sort) {
      case 'Popular':
      case 'Top':
        order = { votes: 'DESC' };
        break;
      case 'Trending':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        where = { created_at: MoreThan(yesterday) };
        order = { votes: 'DESC' };
        break;
      case 'Recent':
      default:
        order = { created_at: 'DESC' };
        break;
    }

    const posts = await this.postRepository.find({
      where,
      order,
      relations: ['creator', 'community'],
    });

    if (!currentUser) return posts;
    // Fetch user's vote history
    const votes = await this.voteRepository.find({
      where: { user: { id: currentUser.id } },
      relations: ['post'],
    });

    const voteMap = new Map(votes.map((v) => [v.post.id, v.value]));

    return posts.map((post) => ({
      ...post,
      userVote: voteMap.get(post.id) || 0,
    }));
  }

    /**
   * Finds a single post by ID with relations.
   * @param id - Post ID.
   * @returns The post object.
   * @throws NotFoundException if the post is not found.
   */

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
    /**
   * Updates a post if the requesting user is the creator.
   * @param id - ID of the post to update.
   * @param updateDto - Updated post content.
   * @param user - The user requesting the update.
   * @returns The updated post.
   * @throws ForbiddenException if the user is not the post creator.
   */
  async update(id: string, updateDto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.findOne(id);

    if (post.creator.id !== user.id) {
      throw new ForbiddenException('You are not the creator of this post');
    }

    Object.assign(post, updateDto);
    return this.postRepository.save(post);
  }
    /**
   * Deletes a post if the requesting user is the creator.
   * @param id - ID of the post to delete.
   * @param user - The user requesting deletion.
   * @throws ForbiddenException if the user is not allowed to delete the post.
   */
  async remove(id: string, user: User): Promise<void> {
    const post = await this.findOne(id);

    if (post.creator.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    await this.postRepository.delete(id);
  }
}
