import { z } from 'zod';

const createServices = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    image: z.string({
      required_error: 'card image is required',
    }),
    serviceDetails: z.array(
      z.object({
        banner: z.string({
          required_error: 'banner image is required',
        }),
        title: z.string({
          required_error: 'title is required',
        }),
        description: z.string({
          required_error: 'description is required',
        }),
        images: z.array(
          z.string({
            required_error: 'card image is required',
          })
        ),
        servicePoint: z.array(
          z.string({
            required_error: 'card image is required',
          })
        ),
      })
    ),
  }),
});
const updateServices = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    serviceDetails: z
      .array(
        z
          .object({
            banner: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
            images: z.array(z.string().optional()).optional(),
            servicePoint: z.array(z.string().optional()).optional(),
          })
          .optional()
      )
      .optional(),
  }),
});

export const serviceValidation = {
  createServices,
  updateServices,
};
