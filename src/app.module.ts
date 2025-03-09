import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // Explicitly load .env globally
    TypeOrmModule.forRoot({
      type: 'postgres', // ✅ Change MySQL to PostgreSQL
      host: process.env.DATABASE_HOST, // Load from .env
      port: Number(process.env.DATABASE_PORT), // Convert to number
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // ✅ Automatically sync schema (for dev only!)
      logging: true, // ✅ See SQL queries in logs
    }),
    UsersModule,
    // AuthModule, // 🔴 Comment this out for now
  ],
})
export class AppModule {}
