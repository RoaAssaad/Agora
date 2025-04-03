// src/posts/post.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  image?: string; //  base64 image string

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Community, (community) => community.id, { eager: true })
  community: Community;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator: User;
}
