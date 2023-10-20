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
exports.blogService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const createBlog = (payload, user, file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
    if (!image) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
    }
    payload.image = image === null || image === void 0 ? void 0 : image.secure_url;
    payload.userId = user === null || user === void 0 ? void 0 : user.userId;
    const result = yield prisma_1.default.blog.create({ data: payload });
    return result;
});
const getAllblog = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findMany();
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield prisma_1.default.blog.findFirst({ where: { id: id } });
    if (!existingBlog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'blog not found');
    }
    const result = yield prisma_1.default.blog.findUnique({
        where: { id: existingBlog.id },
    });
    return result;
});
const updateBlog = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield prisma_1.default.blog.findFirst({ where: { id: id } });
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'blog not found');
    }
    if (file !== undefined) {
        const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
        if (!image) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
        }
        payload.image = image === null || image === void 0 ? void 0 : image.secure_url;
        const result = yield prisma_1.default.blog.update({
            where: { id: existingblog.id },
            data: payload,
        });
        return result;
    }
    const result = yield prisma_1.default.blog.update({
        where: { id: existingblog.id },
        data: payload,
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield prisma_1.default.blog.findFirst({ where: { id: id } });
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'blog not found');
    }
    const result = yield prisma_1.default.blog.delete({
        where: { id: existingblog.id },
    });
    return result;
});
exports.blogService = {
    createBlog,
    getAllblog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
