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
  }),
});

const createAdmin = z.object({
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
  }),
});
const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z
      .enum([...Object.values(Role)] as [string, ...string[]], {})
      .optional(),
    profile: z.object({
      contactNo: z.string().optional(),
      address: z.string().optional(),
      bio: z.string().optional(),
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldpassword: z.string({
      required_error: 'oldpassword is required',
    }),
    newpassword: z.string({
      required_error: 'newpassword is required',
    }),
  }),
});
export const UserValidation = {
  createUser,
  updateUser,
  createAdmin,
  changePassword,
};
