"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedback = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        comment: zod_1.z.string({
            required_error: 'comment is required',
        }),
    }),
});
exports.feedbackValidation = {
    createFeedback,
};
