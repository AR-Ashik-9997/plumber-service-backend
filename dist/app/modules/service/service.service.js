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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const service_constant_1 = require("./service.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const fileUploader_1 = require("../../../helpers/fileUploader");
const createService = (serviceDetails, serviceData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
    if (!image) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
    }
    serviceData.image = image === null || image === void 0 ? void 0 : image.secure_url;
    const newService = yield prisma_1.default.service.create({ data: serviceData });
    if (!newService) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service creation failed');
    }
    serviceDetails.serviceId = newService.id;
    yield prisma_1.default.serviceDetails.create({
        data: serviceDetails,
    });
    return newService;
});
const getAllServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = filters, filtersData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: service_constant_1.ServiceSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => {
                if (key === 'maxPrice') {
                    return {
                        price: {
                            gte: filtersData[key],
                        },
                    };
                }
                else if (key === 'minPrice') {
                    return {
                        price: {
                            lte: filtersData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filtersData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        include: { ServiceReview: true, ServiceDetails: true },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions.sortBy]: paginationOptions.sortOrder,
            }
            : {
                price: 'asc',
            },
    });
    const total = yield prisma_1.default.service.count();
    const totalPages = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPages,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield prisma_1.default.service.findFirst({ where: { id: id } });
    if (!existingService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const result = yield prisma_1.default.service.findUnique({
        where: { id: existingService.id },
        include: { ServiceDetails: true },
    });
    return result;
});
const updateSingleService = (id, serviceData, serviceDetails, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield prisma_1.default.service.findFirst({ where: { id: id } });
    if (!existingService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (file != undefined) {
            const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
            if (!image) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
            }
            serviceData.image = image.secure_url;
            const newService = yield tx.service.update({
                where: { id: existingService.id },
                data: serviceData,
                include: { ServiceDetails: true },
            });
            yield tx.serviceDetails.updateMany({
                where: { serviceId: newService.id },
                data: serviceDetails,
            });
            return newService;
        }
        const newService = yield tx.service.update({
            where: { id: existingService.id },
            data: serviceData,
        });
        yield tx.serviceDetails.updateMany({
            where: { serviceId: newService.id },
            data: serviceDetails,
        });
        return newService;
    }));
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield prisma_1.default.service.findFirst({ where: { id: id } });
    if (!existingService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.booking.deleteMany({ where: { serviceId: existingService.id } });
        yield tx.serviceReview.deleteMany({
            where: { serviceId: existingService.id },
        });
        yield tx.serviceDetails.deleteMany({
            where: { serviceId: existingService.id },
        });
        const result = tx.service.delete({ where: { id: existingService.id } });
        return result;
    }));
});
exports.Services = {
    createService,
    getAllServices,
    getSingleService,
    updateSingleService,
    deleteService,
};
