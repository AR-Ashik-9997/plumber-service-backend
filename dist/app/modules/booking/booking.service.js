"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.create({ data: payload });
    return result;
});
const getAllbooking = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    if (role === 'user') {
        const existingBookings = yield prisma_1.default.booking.findFirst({
            where: { userId: userId },
        });
        if (!existingBookings) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'booking service not found');
        }
        const result = yield prisma_1.default.booking.findMany({
            where: { userId: userId },
            include: { Review: true },
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.booking.findMany({ include: { Review: true } });
        return result;
    }
});
const getSingleBooking = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    if (role === 'user') {
        const existingBooking = yield prisma_1.default.booking.findFirst({
            where: { userId: userId, id: id },
        });
        if (!existingBooking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking service not found');
        }
        const result = yield prisma_1.default.booking.findUnique({
            where: { id: existingBooking.id },
            include: { Review: true },
        });
        return result;
    }
    else {
        const existingBooking = yield prisma_1.default.booking.findFirst({
            where: { id: id },
        });
        if (!existingBooking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking service not found');
        }
        const result = yield prisma_1.default.booking.findUnique({
            where: { id: existingBooking.id },
            include: { Review: true },
        });
        return result;
    }
});
const updateBooking = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = user;
    if (role === 'user') {
        const existingBooking = yield prisma_1.default.booking.findFirst({
            where: { userId: userId, id: id },
        });
        if (!existingBooking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking service not found');
        }
        const result = yield prisma_1.default.booking.update({
            where: { id: existingBooking.id },
            data: { status: payload.status },
            include: { Review: true },
        });
        return result;
    }
    else {
        const existingBooking = yield prisma_1.default.booking.findFirst({
            where: { id: id },
        });
        if (!existingBooking) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking service not found');
        }
        const result = yield prisma_1.default.booking.update({
            where: { id: existingBooking.id },
            data: { status: payload.status },
            include: { Review: true },
        });
        return result;
    }
});
exports.bookingService = {
    createBooking,
    getAllbooking,
    getSingleBooking,
    updateBooking,
};
