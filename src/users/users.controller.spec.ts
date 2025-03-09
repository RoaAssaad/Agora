import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

const createUserDto: CreateUserDto = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'securepassword',
};

const oneUser = {
  id: '5cf36a79-4cc0-411f-a3ef-3062442e0169',
  username: 'testuser',
  email: 'test@example.com',
  password: 'securepassword',
  aura: 0,
  created_at: new Date(),
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser), // ✅ Fix mock create
            findAll: jest.fn().mockResolvedValue([oneUser]),
            findOne: jest.fn().mockResolvedValue(oneUser), // ✅ Fix findOne
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', async () => {
      expect(await usersController.create(createUserDto)).toEqual(oneUser);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      expect(await usersController.findAll()).toEqual([oneUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a user', async () => {
      expect(await usersController.findOne('5cf36a79-4cc0-411f-a3ef-3062442e0169')).toEqual(oneUser);
      expect(usersService.findOne).toHaveBeenCalledWith('5cf36a79-4cc0-411f-a3ef-3062442e0169');
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      await usersController.remove('5cf36a79-4cc0-411f-a3ef-3062442e0169');
      expect(usersService.remove).toHaveBeenCalledWith('5cf36a79-4cc0-411f-a3ef-3062442e0169');
    });
  });
});
