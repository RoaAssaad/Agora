/**
 * Data Transfer Object for user registration.
 * Used in AuthService and UsersService.
 */
export class CreateUserDto {
    /** Unique username for registration/login */
    username: string;
      /** User email address */
    email: string;
      /** Plain-text password (will be hashed before saving) */
    password: string;
  }
  