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
    /** Unique post ID */
  @PrimaryGeneratedColumn('uuid')
  id: string;

   /** Title of the post */
  @Column()
  title: string;

  /** Post content (text) */
  @Column({ type: 'text' })
  content: string;

  /** Optional base64-encoded image */
  @Column({ type: 'text', nullable: true })
  image?: string; // optional base64 image

  /** Total vote count (calculated via upvotes and downvotes) */
  @Column({ default: 0 })
  votes: number; //  total vote count

   /** Timestamp of post creation */
  @CreateDateColumn()
  created_at: Date;

    /** The community to which this post belongs */
  @ManyToOne(() => Community, (community) => community.id, { eager: true })
  community: Community;

    /** The user who created this post */
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator: User;
}
