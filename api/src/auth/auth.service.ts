import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

      /**
   * Registers a new user with hashed password and returns basic info.
   * @param username - Unique username for the user.
   * @param email - Email address of the user.
   * @param password - Plain-text password.
   * @returns A message and the saved user object (without password).
   * @throws BadRequestException if username is already taken.
   */

    async register(username: string, email: string, password: string) {
        const existingUser = await this.usersRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new BadRequestException('Username already taken'); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = this.usersRepository.create({
            username,
            email,
            password: hashedPassword, //  Store hashed password
        });

        const savedUser = await this.usersRepository.save(newUser);
        const { password: _, ...userWithoutPassword } = savedUser;

        return {
            message: 'User registered successfully',
            user: userWithoutPassword,
        };
    }

      /**
   * Validates user credentials.
   * @param username - Username entered by user.
   * @param pass - Plain-text password entered.
   * @returns The user object without password if valid, else null.
   */

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

      /**
   * Authenticates user and returns JWT token and user info.
   * @param username - Username entered.
   * @param password - Password entered.
   * @returns Access token and user object.
   * @throws UnauthorizedException if credentials are invalid.
   */

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
