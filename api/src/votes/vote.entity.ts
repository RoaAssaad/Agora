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
      /** Unique vote ID */
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
      /** Vote value: 1 = upvote, -1 = downvote */
    @Column()
    value: number; 
  
      /** Timestamp when the vote was cast */
    @CreateDateColumn()
    created_at: Date;

    /** The user who cast the vote */
    @ManyToOne(() => User, (user) => user.id, { eager: true })
    user: User;
    
  /** The post the vote was cast on */
    @ManyToOne(() => Post, (post) => post.id, { eager: true })
    post: Post;
  }
  