"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlog = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'username is required',
    }),
    title: zod_1.z.string({
        required_error: 'title is required',
    }),
    blog: zod_1.z.string({
        required_error: 'blog description is required',
    }),
});
const updateBlog = zod_1.z.object({
    username: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    blog: zod_1.z.string().optional(),
});
exports.blogValidation = {
    createBlog,
    updateBlog,
};
