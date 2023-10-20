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
exports.productService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.create({ data: payload });
    return result;
});
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany();
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield prisma_1.default.product.findFirst({ where: { id: id } });
    if (!existingProduct) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield prisma_1.default.product.findUnique({
        where: { id: existingProduct.id },
        include: { ProductReview: true },
    });
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield prisma_1.default.product.findFirst({ where: { id: id } });
    if (!existingProduct) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield prisma_1.default.product.update({
        where: { id: existingProduct.id },
        data: payload,
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield prisma_1.default.product.findFirst({ where: { id: id } });
    if (!existingProduct) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield prisma_1.default.product.delete({
        where: { id: existingProduct.id },
    });
    return result;
});
exports.productService = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
