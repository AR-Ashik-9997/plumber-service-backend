import { z } from 'zod';

const createBlog = z.object({
  username: z.string({
    required_error: 'username is required',
  }),
  image: z.string({
    required_error: 'image is required',
  }),
  title: z.string({
    required_error: 'title is required',
  }),
  blog: z.string({
    required_error: 'blog description is required',
  }),
});
const updateBlog = z.object({
  username: z.string().optional(),
  image: z.string().optional(),
  title: z.string().optional(),
  blog: z.string().optional(),
});

export const blogValidation = {
  createBlog,
  updateBlog,
};
