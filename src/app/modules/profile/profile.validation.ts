import { z } from 'zod';

const createProfile = z.object({
  username: z.string({
    required_error: 'name is required',
  }),
  contactNo: z.string({
    required_error: 'contactNo is required',
  }),
  address: z.string({
    required_error: 'address is required',
  }),
  bio: z.string({
    required_error: 'bio is required',
  }),
});
const updateProfile = z.object({
  username: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

export const profileValidation = { createProfile, updateProfile };
