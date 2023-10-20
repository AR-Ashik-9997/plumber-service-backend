"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidation = void 0;
const zod_1 = require("zod");
const createProfile = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'name is required',
    }),
    contactNo: zod_1.z.string({
        required_error: 'contactNo is required',
    }),
    address: zod_1.z.string({
        required_error: 'address is required',
    }),
    bio: zod_1.z.string({
        required_error: 'bio is required',
    }),
});
const updateProfile = zod_1.z.object({
    username: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
});
exports.profileValidation = { createProfile, updateProfile };
