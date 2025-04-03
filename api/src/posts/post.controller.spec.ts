import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';

describe('PostController', () => {
  let controller: PostController;
  let service: jest.Mocked<PostService>;

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

  const mockPost = {
    id: 'post-1',
    title: 'Test Post',
    content: 'Test content',
    created_at: new Date(),
    creator: mockUser,
    community: mockCommunity,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get(PostService);
  });

  it('should create a post', async () => {
    const dto: CreatePostDto = {
      title: 'New Post',
      content: 'Post content',
      communityId: mockCommunity.id,
    };

    service.create.mockResolvedValue(mockPost);
    const result = await controller.create(dto, { user: mockUser });
    expect(result).toEqual(mockPost);
    expect(service.create).toHaveBeenCalledWith(dto, mockUser);
  });

  it('should return all posts', async () => {
    service.findAll.mockResolvedValue([mockPost]);
    const result = await controller.findAll();
    expect(result).toEqual([mockPost]);
  });

  it('should return one post by ID', async () => {
    service.findOne.mockResolvedValue(mockPost);
    const result = await controller.findOne('post-1');
    expect(result).toEqual(mockPost);
  });

  it('should update a post', async () => {
    const updateDto: UpdatePostDto = {
      title: 'Updated Title',
      content: 'Updated content',
    };

    const updatedPost = { ...mockPost, ...updateDto };

    service.update.mockResolvedValue(updatedPost);
    const result = await controller.update('post-1', updateDto, { user: mockUser });
    expect(result).toEqual(updatedPost);
    expect(service.update).toHaveBeenCalledWith('post-1', updateDto, mockUser);
  });

  it('should delete a post', async () => {
    service.remove.mockResolvedValue(undefined);
    const result = await controller.remove('post-1', { user: mockUser });
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('post-1', mockUser);
  });
});
