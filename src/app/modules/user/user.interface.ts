import { User } from '@prisma/client';
export type IChangePassword = {
  oldpassword: string;
  newpassword: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;
