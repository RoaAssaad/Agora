import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Post } from '../posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Post])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
