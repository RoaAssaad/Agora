import { Test, TestingModule } from '@nestjs/testing';
import { VoteService } from './vote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';

describe('VoteService', () => {
  let service: VoteService;
  let voteRepo: jest.Mocked<Repository<Vote>>;
  let postRepo: jest.Mocked<Repository<Post>>;

  const mockUser: User = {
    id: 'user-1',
    username: 'john',
    email: 'john@example.com',
    password: 'hashedpw',
    aura: 0,
    created_at: new Date(),
  };

  const mockPost: Post = {
    id: 'post-1',
    title: 'Sample Post',
    content: 'Hello World',
    created_at: new Date(),
    creator: mockUser,
    community: {
      id: 'community-1',
      name: 'react',
      title: 'ReactJS',
      description: '',
      created_at: new Date(),
      creator: mockUser,
      creatorId: mockUser.id,
    },
  };

  const mockVote: Vote = {
    id: 'vote-1',
    value: 1,
    created_at: new Date(),
    user: mockUser,
    post: mockPost,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        {
          provide: getRepositoryToken(Vote),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Post),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VoteService>(VoteService);
    voteRepo = module.get(getRepositoryToken(Vote));
    postRepo = module.get(getRepositoryToken(Post));
  });

  it('should create a new vote if none exists', async () => {
    const dto: CreateVoteDto = { postId: mockPost.id, value: 1 };
    postRepo.findOne.mockResolvedValue(mockPost);
    voteRepo.findOne.mockResolvedValue(null);
    voteRepo.create.mockReturnValue(mockVote);
    voteRepo.save.mockResolvedValue(mockVote);

    const result = await service.createOrUpdate(dto, mockUser);
    expect(result).toEqual(mockVote);
    expect(voteRepo.create).toHaveBeenCalledWith({ post: mockPost, user: mockUser, value: 1 });
  });

  it('should update existing vote', async () => {
    const dto: CreateVoteDto = { postId: mockPost.id, value: -1 };
    postRepo.findOne.mockResolvedValue(mockPost);
    voteRepo.findOne.mockResolvedValue(mockVote);
    voteRepo.save.mockResolvedValue({ ...mockVote, value: -1 });

    const result = await service.createOrUpdate(dto, mockUser);
    expect(result.value).toBe(-1);
  });

  it('should throw if post not found', async () => {
    const dto: CreateVoteDto = { postId: 'bad-id', value: 1 };
    postRepo.findOne.mockResolvedValue(null);

    await expect(service.createOrUpdate(dto, mockUser)).rejects.toThrow(NotFoundException);
  });

  it('should return all votes', async () => {
    voteRepo.find.mockResolvedValue([mockVote]);
    const result = await service.findAll();
    expect(result).toEqual([mockVote]);
  });

  it('should delete a vote if it exists and belongs to user', async () => {
    voteRepo.findOne.mockResolvedValue(mockVote);
    await expect(service.remove('vote-1', mockUser)).resolves.not.toThrow();
    expect(voteRepo.remove).toHaveBeenCalledWith(mockVote);
  });

  it('should throw if vote not found for user', async () => {
    voteRepo.findOne.mockResolvedValue(null);
    await expect(service.remove('vote-1', mockUser)).rejects.toThrow(NotFoundException);
  });
});
