import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityService } from './community.service';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from '../users/user.entity';

describe('CommunityService', () => {
  let service: CommunityService;
  let repo: Repository<Community>;

  const mockUser: User = {
    id: 'user-123',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    aura: 0,
    created_at: new Date(),
  };

  const testCommunity = {
    id: 'community-123',
    name: 'testcommunity',
    title: 'Test Community',
    description: 'Test description',
    created_at: new Date(),
    creator: mockUser,
    creatorId: mockUser.id,
  } as Community;

  const communityArray = [testCommunity];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useValue: {
            create: jest.fn().mockImplementation(dto => ({ ...dto })),
            save: jest.fn().mockResolvedValue(testCommunity),
            find: jest.fn().mockResolvedValue(communityArray),
            findOne: jest.fn().mockResolvedValue(testCommunity),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    repo = module.get<Repository<Community>>(getRepositoryToken(Community));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a community', async () => {
      const createDto: CreateCommunityDto = {
        name: 'testcommunity',
        title: 'Test Community',
        description: 'Test description',
      };

      const result = await service.create(createDto, mockUser);
      expect(repo.create).toHaveBeenCalledWith({
        ...createDto,
        creator: mockUser,
      });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(testCommunity);
    });
  });

  describe('findAll()', () => {
    it('should return all communities', async () => {
      const result = await service.findAll();
      expect(repo.find).toHaveBeenCalledWith({ relations: ['creator'] });
      expect(result).toEqual(communityArray);
    });
  });

  describe('findOne()', () => {
    it('should return a community by id', async () => {
      const result = await service.findOne('community-123');
      expect(result).toEqual(testCommunity);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update a community if user is creator', async () => {
      const updateDto: UpdateCommunityDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const result = await service.update('community-123', updateDto, mockUser);
      expect(result).toEqual(testCommunity);
    });

    it('should throw ForbiddenException if user is not creator', async () => {
      const otherUser = { ...mockUser, id: 'different-id' };
      await expect(
        service.update('community-123', { title: 'nope' }, otherUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove()', () => {
    it('should remove a community if user is creator', async () => {
      const result = await service.remove('community-123', mockUser);
      expect(repo.delete).toHaveBeenCalledWith('community-123');
      expect(result).toBeUndefined();
    });

    it('should throw ForbiddenException if user is not creator', async () => {
      const otherUser = { ...mockUser, id: 'different-id' };
      await expect(service.remove('community-123', otherUser)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if delete fails', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 0 } as DeleteResult);
      await expect(service.remove('bad-id', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
