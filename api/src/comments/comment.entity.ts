// src/comments/comment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Post } from '../posts/post.entity';
  import { User } from '../users/user.entity';
  
  @Entity({ name: 'comments' })
  export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text' })
    content: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @ManyToOne(() => Post, (post) => post.id, { eager: true })
    post: Post;
  
    @ManyToOne(() => User, (user) => user.id, { eager: true })
    user: User;
  }
  