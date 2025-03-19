import { DataSource } from 'typeorm';
import { User } from './users/user.entity'; // Add all entities here!

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'agora',
  entities: [__dirname + '/**/*.entity.{ts,js}'], // Load all entities
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Correct path!
  synchronize: false, //  Don't use in production (only migrations!)
  logging: true, // Logs SQL queries
});
