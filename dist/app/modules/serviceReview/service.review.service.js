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
exports.reviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createServiceReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceReview.create({ data: payload });
    return result;
});
const getAllServiceReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceReview.findMany();
    return result;
});
const getSingleServiceReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingReview = yield prisma_1.default.serviceReview.findFirst({
        where: { id },
    });
    if (!existingReview) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    const result = yield prisma_1.default.serviceReview.findUnique({
        where: { id: existingReview.id },
    });
    return result;
});
exports.reviewService = {
    createServiceReview,
    getAllServiceReview,
    getSingleServiceReview,
};