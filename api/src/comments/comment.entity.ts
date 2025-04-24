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
    /** Unique comment ID */
  @PrimaryGeneratedColumn('uuid')
  id: string;

    /** Comment text content */
  @Column('text')
  content: string;

    /** Timestamp when the comment was created */
  @CreateDateColumn()
  created_at: Date;

  /** The post this comment belongs to */
  @ManyToOne(() => Post, (post) => post.id, { eager: false })
  @JoinColumn({ name: 'post_id' }) // maps to post_id column
  post: Post;

    /** The user who wrote the comment */
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'creator_id' }) // maps to creator_id column
  user: User;
}
