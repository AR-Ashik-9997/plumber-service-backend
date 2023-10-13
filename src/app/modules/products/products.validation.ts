import { z } from 'zod';
const createProduct = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    rating: z.string({
      required_error: 'rating is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    features: z.array(
      z.string({
        required_error: 'features array is required',
      })
    ),
    categoryName: z.string({
      required_error: 'categoryName is required',
    }),
    quantity: z.string({
      required_error: 'quantity is required',
    }),
  }),
});
const updateProduct = z.object({
  body: z.object({
    title: z.string().optional(),
    rating: z.string().optional(),
    price: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string().optional()).optional(),
    categoryName: z.string().optional(),
    quantity: z.string().optional(),
  }),
});

export const productValidation = {
  createProduct,
  updateProduct,
};
