"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const createServices = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'title is required',
    }),
    description: zod_1.z.string({
        required_error: 'description is required',
    }),
    price: zod_1.z.string({
        required_error: 'price is required',
    }),
    category: zod_1.z.string({
        required_error: 'category name is required',
    }),
    serviceDetails: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        feature1: zod_1.z.string({
            required_error: 'feature1 is required',
        }),
        feature2: zod_1.z.string({
            required_error: 'feature2 is required',
        }),
        feature3: zod_1.z.string({
            required_error: 'feature3 is required',
        }),
        feature4: zod_1.z.string({
            required_error: 'feature4 is required',
        }),
        feature5: zod_1.z.string({
            required_error: 'feature5 is required',
        }),
    }),
});
const updateServices = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    serviceDetails: zod_1.z
        .object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        feature1: zod_1.z.string().optional(),
        feature2: zod_1.z.string().optional(),
        feature3: zod_1.z.string().optional(),
        feature4: zod_1.z.string().optional(),
        feature5: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.serviceValidation = {
    createServices,
    updateServices,
};
