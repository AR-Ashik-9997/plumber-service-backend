import { Role } from '@prisma/client';

import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum([...Object.values(Role)] as [string, ...string[]], {
      required_error: 'role is required',
    }),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

export const AuthValidation = { createUser, loginUser };
