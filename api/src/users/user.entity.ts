import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' }) 
export class User {
  /** Primary UUID identifier for the user */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Unique username used for login and profile */
  @Column({ unique: true })
  username: string;

   /** Unique email address */
  @Column({ unique: true })
  email: string;

  /** Hashed password */
  @Column()
  password: string;

  /** Aura points (popularity) */
  @Column({ default: 0 })
  aura: number;

  /** Account creation timestamp */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  /** Optional profile image (stored as base64 string) */
@Column({ type: 'text', nullable: true })
profileImage: string;

}
