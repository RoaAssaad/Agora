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

  /**
   * Creates a new user with hashed password.
   * @param createUserDto - The user details from registration.
   * @returns The created user (with hashed password).
   */

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  /**
   * Returns all users with passwords excluded.
   */

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...user }) => user);
  }

    /**
   * Finds a user by ID.
   * @param id - User ID.
   * @returns The user without password field.
   * @throws NotFoundException if user does not exist.
   */

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const { password, ...result } = user;
    return result;
  }

    /**
   * Returns limited details about the current logged-in user.
   * @param userId - ID of the authenticated user.
   * @returns User details excluding password.
   */

  async getMe(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email', 'created_at', 'profileImage'],
    });
    if (!user) throw new NotFoundException('User not found');

    const { password, ...rest } = user;
    return rest;
  }

    /**
   * Deletes a user by ID.
   * @param id - ID of the user to delete.
   * @throws NotFoundException if the user does not exist.
   */

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    await this.usersRepository.delete(id);
  }

    /**
   * Updates the profile image of a user.
   * @param userId - ID of the user.
   * @param base64 - Base64 string of the image.
   * @returns Updated user object without password.
   */

  async updateProfileImage(userId: string, base64: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    user.profileImage = base64;
    const saved = await this.usersRepository.save(user);
    const { password, ...result } = saved;
    return result;
  }
}
