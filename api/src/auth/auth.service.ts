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

    async register(username: string, email: string, password: string) {
        const existingUser = await this.usersRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new BadRequestException('Username already taken'); // ✅ Now it works!
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = this.usersRepository.create({
            username,
            email,
            password: hashedPassword, // ✅ Store hashed password
        });

        const savedUser = await this.usersRepository.save(newUser);
        const { password: _, ...userWithoutPassword } = savedUser;

        return {
            message: 'User registered successfully',
            user: userWithoutPassword,
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

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
