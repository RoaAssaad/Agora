// src/posts/post.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { Community } from '../communities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Community])], // ✅ Add Community here
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
