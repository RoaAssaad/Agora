import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const userArray = [
  {
    id: '5cf36a79-4cc0-411f-a3ef-3062442e0169', // ✅ Use UUID
    username: 'testuser1',
    email: 'test1@example.com',
    password: 'securepassword',
    aura: 0,
    created_at: new Date(),
  },
  {
    id: '7de4d858-7f7b-46b2-a58d-4a94b7655f47', // ✅ Use UUID
    username: 'testuser2',
    email: 'test2@example.com',
    password: 'securepassword',
    aura: 0,
    created_at: new Date(),
  },
];

const oneUser = {
  id: '5cf36a79-4cc0-411f-a3ef-3062442e0169',
  username: 'testuser1',
  email: 'test1@example.com',
  password: 'securepassword',
  aura: 0,
  created_at: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser), // ✅ Fix findOne
            create: jest.fn().mockImplementation((dto) => dto), // ✅ Mock create
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create a user', async () => {
      const createUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'securepassword',
      };

      expect(await service.create(createUserDto)).toEqual(oneUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a single user', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      expect(await service.findOne('5cf36a79-4cc0-411f-a3ef-3062442e0169')).toEqual(oneUser);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: '5cf36a79-4cc0-411f-a3ef-3062442e0169' } });
    });
  });

  describe('remove()', () => {
    it('should delete a user by ID', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      await service.remove('5cf36a79-4cc0-411f-a3ef-3062442e0169');
      expect(removeSpy).toHaveBeenCalledWith('5cf36a79-4cc0-411f-a3ef-3062442e0169');
    });
  });
});
