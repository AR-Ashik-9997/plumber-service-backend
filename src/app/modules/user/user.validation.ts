import { z } from 'zod';

const createUser = z.object({
  name: z.string({
    required_error: 'name is required',
  }),
  email: z.string({
    required_error: 'email is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
  profile: z.object({
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    bio: z.string({
      required_error: 'bio is required',
    }),
  }),
});
const updateUser = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  profile: z.object({
    contactNo: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const UserValidation = { createUser, updateUser };
