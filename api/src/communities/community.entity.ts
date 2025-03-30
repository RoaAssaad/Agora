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
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    name: string;
  
    @Column()
    title: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @ManyToOne(() => User, { eager: false, nullable: false })
    @JoinColumn({ name: 'creatorId' })
    creator: User;
  
    @Column()
    creatorId: string;
  }
  