// src/comments/comment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Post, (post) => post.id, { eager: false })
  @JoinColumn({ name: 'post_id' }) // maps to post_id column
  post: Post;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'creator_id' }) // maps to creator_id column
  user: User;
}
