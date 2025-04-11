import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVoteDto } from './dto/create-vote.dto';

describe('VoteController', () => {
  let controller: VoteController;
  let service: VoteService;

  const mockVoteService = {
    createOrUpdate: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser = {
    id: 'user-1',
    username: 'testuser',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteController],
      providers: [
        {
          provide: VoteService,
          useValue: mockVoteService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<VoteController>(VoteController);
    service = module.get<VoteService>(VoteService);
  });

  it('should call createOrUpdate on voteService with dto and user', async () => {
    const dto: CreateVoteDto = { postId: 'post-1', value: 1 };
    const expected = { id: 'vote-1', ...dto, user: mockUser };

    mockVoteService.createOrUpdate.mockResolvedValue(expected);
    const result = await controller.createOrUpdate(dto, { user: mockUser });

    expect(service.createOrUpdate).toHaveBeenCalledWith(dto, mockUser);
    expect(result).toEqual(expected);
  });

  it('should return all votes', async () => {
    const expected = [{ id: 'vote-1', value: 1 }];
    mockVoteService.findAll.mockResolvedValue(expected);

    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should call remove with vote id and user', async () => {
    mockVoteService.remove.mockResolvedValue({ success: true });

    const result = await controller.remove('vote-1', { user: mockUser });

    expect(service.remove).toHaveBeenCalledWith('vote-1', mockUser);
    expect(result).toEqual({ success: true });
  });
});
