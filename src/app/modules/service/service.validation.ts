import { Availablity } from '@prisma/client';
import { z } from 'zod';

const createServices = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    category: z.string({
      required_error: 'category name is required',
    }),
    availability: z.enum(
      [...Object.values(Availablity)] as [string, ...string[]],
      { required_error: 'availability is required' }
    ),

    features: z.array(
      z.object({
        feature1: z.string({ required_error: 'feature1 is required' }),
        feature2: z.string({ required_error: 'feature2 is required' }),
        feature3: z.string({ required_error: 'feature3 is required' }),
        feature4: z.string({ required_error: 'feature4 is required' }),
        feature5: z.string({ required_error: 'feature5 is required' }),
      })
    ),
  }),
});
const updateServices = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    availability: z
      .enum([...Object.values(Availablity)] as [string, ...string[]])
      .optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    features: z
      .array(
        z.object({
          feature1: z.string().optional(),
          feature2: z.string().optional(),
          feature3: z.string().optional(),
          feature4: z.string().optional(),
          feature5: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const serviceValidation = {
  createServices,
  updateServices,
};
