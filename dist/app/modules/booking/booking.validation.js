"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'userId is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId is required',
        }),
        date: zod_1.z.string({
            required_error: 'date is required',
        }),
        time: zod_1.z.string({
            required_error: 'time is required',
        }),
    }),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...Object.values(client_1.Status)], {
            required_error: 'status is required',
        }),
    }),
});
exports.bookingValidation = {
    createBooking,
    updateBooking,
};
