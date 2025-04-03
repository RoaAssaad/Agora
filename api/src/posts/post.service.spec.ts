import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;
  let postRepo: jest.Mocked<Repository<Post>>;

  const mockUser: User = {
    id: 'user-1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    aura: 0,
    created_at: new Date(),
  };

  const mockCommunity: Community = {
    id: 'community-1',
    name: 'reactjs',
    title: 'ReactJS',
    description: 'All things React',
    created_at: new Date(),
    creator: mockUser,
    creatorId: mockUser.id,
  };

  const mockPost: Post = {
    id: 'post-1',
    title: 'First Post',
    content: 'Hello world!',
    created_at: new Date(),
    creator: mockUser,
    community: mockCommunity,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepo = module.get(getRepositoryToken(Post));
  });

  it('should create a post', async () => {
    const dto: CreatePostDto = {
      title: 'New Post',
      content: 'New content',
      communityId: mockCommunity.id,
    };

    const expectedPost: Post = {
      id: 'generated-id',
      title: dto.title,
      content: dto.content,
      created_at: new Date(),
      creator: mockUser,
      community: mockCommunity,
    };

    postRepo.create.mockReturnValue(expectedPost);
    postRepo.save.mockResolvedValue(expectedPost);

    const result = await service.create(dto, mockUser);

    expect(result).toEqual(expectedPost);
  });

  it('should return all posts', async () => {
    postRepo.find.mockResolvedValue([mockPost]);
    const result = await service.findAll();
    expect(result).toEqual([mockPost]);
  });

  it('should return a post by id', async () => {
    postRepo.findOne.mockResolvedValue(mockPost);
    const result = await service.findOne('post-1');
    expect(result).toEqual(mockPost);
  });

  it('should throw NotFoundException if post not found', async () => {
    postRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a post if creator matches', async () => {
    const updateDto: UpdatePostDto = {
      title: 'Updated',
      content: 'Updated content',
    };

    const updatedPost: Post = {
      ...mockPost,
      ...updateDto,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockPost);
    postRepo.save.mockResolvedValue(updatedPost);

    const result = await service.update('post-1', updateDto, mockUser);

    expect(result).toEqual(updatedPost);
  });

  it('should throw ForbiddenException if updater is not creator', async () => {
    const otherUser: User = { ...mockUser, id: 'other-id' };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockPost);

    await expect(service.update('post-1', { title: 'X', content: 'Y' }, otherUser)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should delete post if creator matches', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockPost);
    postRepo.delete.mockResolvedValue({ affected: 1, raw: [] });

    await expect(service.remove('post-1', mockUser)).resolves.not.toThrow();
  });

  it('should throw ForbiddenException if deleter is not creator', async () => {
    const otherUser: User = { ...mockUser, id: 'not-owner' };
    jest.spyOn(service, 'findOne').mockResolvedValue(mockPost);

    await expect(service.remove('post-1', otherUser)).rejects.toThrow(ForbiddenException);
  });

  it('should throw NotFoundException if deletion affected 0 rows', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockPost);
    postRepo.delete.mockResolvedValue({ affected: 0, raw: [] });

    await expect(service.remove('post-1', mockUser)).rejects.toThrow(NotFoundException);
  });
});
