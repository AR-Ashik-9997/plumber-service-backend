"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'name is required',
    }),
    email: zod_1.z.string({
        required_error: 'email is required',
    }),
    password: zod_1.z.string({
        required_error: 'password is required',
    }),
    profile: zod_1.z.object({
        contactNo: zod_1.z.string({
            required_error: 'contactNo is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        bio: zod_1.z.string({
            required_error: 'bio is required',
        }),
    }),
});
const createAdmin = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'name is required',
    }),
    email: zod_1.z.string({
        required_error: 'email is required',
    }),
    password: zod_1.z.string({
        required_error: 'password is required',
    }),
    role: zod_1.z.enum([...Object.values(client_1.Role)], {
        required_error: 'role is required',
    }),
    profile: zod_1.z.object({
        contactNo: zod_1.z.string({
            required_error: 'contactNo is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        bio: zod_1.z.string({
            required_error: 'bio is required',
        }),
    }),
});
const updateAllUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    role: zod_1.z
        .enum([...Object.values(client_1.Role)], {})
        .optional(),
    profile: zod_1.z.object({
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
const updateUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    profile: zod_1.z.object({
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUser,
    updateUser,
    createAdmin,
    updateAllUser,
};
