// src/posts/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { Community } from '../communities/community.entity';
import { Vote } from '../votes/vote.entity'; //  Import Vote

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Community, Vote]), //  Register Vote in TypeORM
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
