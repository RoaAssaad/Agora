import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepo: Repository<Vote>,

    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async createOrUpdate(dto: CreateVoteDto, user: User): Promise<Vote> {
    const { postId, value } = dto;

    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    let vote = await this.voteRepo.findOne({
      where: { post: { id: postId }, user: { id: user.id } },
    });

    let voteDifference = value;

    if (vote) {
      voteDifference = value - vote.value;
      vote.value = value;
    } else {
      vote = this.voteRepo.create({ post, user, value });
    }

    post.votes = (post.votes ?? 0) + voteDifference;
    await this.postRepo.save(post);

    return this.voteRepo.save(vote);
  }

  async findAll(): Promise<Vote[]> {
    return this.voteRepo.find({ relations: ['user', 'post'] });
  }

  async remove(voteId: string, user: User): Promise<void> {
    const vote = await this.voteRepo.findOne({
      where: { id: voteId, user: { id: user.id } },
    });

    if (!vote) throw new NotFoundException('Vote not found');

    const post = await this.postRepo.findOne({ where: { id: vote.post.id } });
    if (post) {
      post.votes = (post.votes ?? 0) - vote.value;
      await this.postRepo.save(post);
    }

    await this.voteRepo.remove(vote);
  }
}
