import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { User } from '../users/user.entity';

const mockUser: User = {
  id: 'user-uuid',
  username: 'testuser',
  email: 'test@example.com',
  password: 'hashed',
  aura: 0,
  created_at: new Date(),
};

const mockCommunity = {
  id: '1',
  name: 'test',
  title: 'Test',
  description: 'Test desc',
  created_at: new Date(),
  creator: mockUser,
};

describe('CommunityController', () => {
  let controller: CommunityController;
  let service: CommunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [
        {
          provide: CommunityService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCommunity),
            findAll: jest.fn().mockResolvedValue([mockCommunity]),
            findOne: jest.fn().mockResolvedValue(mockCommunity),
            update: jest.fn().mockResolvedValue(mockCommunity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CommunityController>(CommunityController);
    service = module.get<CommunityService>(CommunityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a community', async () => {
    const dto: CreateCommunityDto = { name: 'test', title: 'Test', description: 'desc' };
    expect(await controller.create(dto, { user: mockUser } as any)).toEqual(mockCommunity);
  });

  it('should return all communities', async () => {
    expect(await controller.findAll()).toEqual([mockCommunity]);
  });

  it('should return one community', async () => {
    expect(await controller.findOne('1')).toEqual(mockCommunity);
  });

  it('should update a community', async () => {
    const dto: UpdateCommunityDto = { title: 'Updated' };
    expect(await controller.update('1', dto, { user: mockUser } as any)).toEqual(mockCommunity);
  });

  it('should delete a community', async () => {
    expect(await controller.remove('1', { user: mockUser } as any)).toBeUndefined();
  });
});
