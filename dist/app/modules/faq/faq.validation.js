"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqValidation = void 0;
const zod_1 = require("zod");
const createFaq = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        list: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string({
                required_error: 'title is required',
            }),
            description: zod_1.z.string({
                required_error: 'description is required',
            }),
        })),
    }),
});
const updateFaq = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        list: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
        })),
    }),
});
exports.faqValidation = {
    createFaq,
    updateFaq,
};
