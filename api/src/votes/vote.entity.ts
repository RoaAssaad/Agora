import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Post } from '../posts/post.entity';
  
  @Entity({ name: 'votes' })
  @Unique(['user', 'post']) // ensures one vote per user per post
  export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    value: number; // 1 = upvote, -1 = downvote
  
    @CreateDateColumn()
    created_at: Date;
  
    @ManyToOne(() => User, (user) => user.id, { eager: true })
    user: User;
  
    @ManyToOne(() => Post, (post) => post.id, { eager: true })
    post: Post;
  }
  