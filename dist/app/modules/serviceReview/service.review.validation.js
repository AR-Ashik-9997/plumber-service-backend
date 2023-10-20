"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
        bookingId: zod_1.z.string({
            required_error: 'bookingId is required',
        }),
        review: zod_1.z.string({
            required_error: 'review is required',
        }),
        rating: zod_1.z.string({
            required_error: 'rating is required',
        }),
    }),
});
const updateReview = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        bookingId: zod_1.z.string().optional(),
        review: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
    }),
});
exports.reviewValidation = {
    createReview,
    updateReview,
};
