import { z } from 'zod';

const createStudent = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    syncId: z.string({
      required_error: 'SyncId is required',
    }),
  }),
});

const updateStudent = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const studentValidation = { createStudent, updateStudent };
