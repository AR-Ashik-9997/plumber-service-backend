"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReviewValidation = void 0;
const zod_1 = require("zod");
const createProductReview = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string({
            required_error: 'productId is required',
        }),
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        userName: zod_1.z.string({
            required_error: 'userName is required',
        }),
        review: zod_1.z.string({
            required_error: 'review is required',
        }),
        rating: zod_1.z.string({
            required_error: 'rating is required',
        }),
    }),
});
const updateProductReview = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        userName: zod_1.z.string().optional(),
        review: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
    }),
});
exports.productReviewValidation = {
    createProductReview,
    updateProductReview,
};
