import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Allow other modules to use UsersService
})
export class UsersModule {}
