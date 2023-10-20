"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProduct = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        rating: zod_1.z.string({
            required_error: 'rating is required',
        }),
        price: zod_1.z.string({
            required_error: 'price is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        features: zod_1.z.array(zod_1.z.string({
            required_error: 'features array is required',
        })),
        categoryName: zod_1.z.string({
            required_error: 'categoryName is required',
        }),
        quantity: zod_1.z.string({
            required_error: 'quantity is required',
        }),
    }),
});
const updateProduct = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string().optional()).optional(),
        categoryName: zod_1.z.string().optional(),
        quantity: zod_1.z.string().optional(),
    }),
});
exports.productValidation = {
    createProduct,
    updateProduct,
};
