import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from '../users/user.entity';

const mockUser: User = {
  id: 'user-uuid',
  username: 'creator',
  email: 'creator@example.com',
  password: 'hashed',
  aura: 0,
  created_at: new Date(),
};

const communityArray: Community[] = [
  {
    id: '1',
    name: 'test',
    title: 'Test Community',
    description: 'Test description',
    created_at: new Date(),
    creator: mockUser,
  },
];

describe('CommunityService', () => {
  let service: CommunityService;
  let repo: Repository<Community>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Community),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue(communityArray[0]),
            find: jest.fn().mockResolvedValue(communityArray),
            findOne: jest.fn().mockResolvedValue(communityArray[0]),
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

  it('should create a community', async () => {
    const dto = { name: 'test', title: 'Test', description: 'desc' };
    expect(await service.create(dto, mockUser)).toEqual(communityArray[0]);
  });

  it('should return all communities', async () => {
    const result = await service.findAll();
    expect(result).toEqual(communityArray);
  });

  it('should return one community', async () => {
    expect(await service.findOne('1')).toEqual(communityArray[0]);
  });

  it('should update a community if user is creator', async () => {
    const update = await service.update('1', { title: 'New' }, mockUser);
    expect(update).toEqual(communityArray[0]);
  });

  it('should throw ForbiddenException if updater is not creator', async () => {
    await expect(
      service.update('1', { title: 'New' }, { ...mockUser, id: 'someone-else' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should delete community if user is creator', async () => {
    await expect(service.remove('1', mockUser)).resolves.toBeUndefined();
  });

  it('should throw ForbiddenException if deleter is not creator', async () => {
    await expect(
      service.remove('1', { ...mockUser, id: 'bad-id' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw NotFoundException if community not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    await expect(service.findOne('missing-id')).rejects.toThrow(NotFoundException);
  });
});
