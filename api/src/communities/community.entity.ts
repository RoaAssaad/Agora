import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  @Entity({ name: 'communities' })
  export class Community {
      /** Unique community ID */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** Unique name used in URL paths and references */
    @Column({ unique: true })
    name: string;
  
     /** Display title of the community */
    @Column()
    title: string;
  
    /** Description of the community */
    @Column({ type: 'text' })
    description: string;
  
      /** Timestamp when the community was created */
    @CreateDateColumn()
    created_at: Date;

    /** The user who created this community */
    @ManyToOne(() => User, { eager: false, nullable: false })
    @JoinColumn({ name: 'creatorId' })
    creator: User;
    
    /** Redundant FK to simplify queries and joins */
    @Column()
    creatorId: string;
  }
  