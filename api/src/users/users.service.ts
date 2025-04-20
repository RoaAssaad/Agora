import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const { password, ...result } = user;
    return result;
  }

  async getMe(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email', 'created_at', 'profileImage'],
    });
    if (!user) throw new NotFoundException('User not found');

    const { password, ...rest } = user;
    return rest;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    await this.usersRepository.delete(id);
  }

  async updateProfileImage(userId: string, base64: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    user.profileImage = base64;
    const saved = await this.usersRepository.save(user);
    const { password, ...result } = saved;
    return result;
  }
}
