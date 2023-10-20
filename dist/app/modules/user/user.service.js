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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const createUser = (profile, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User email already exists');
        }
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
        payload.role = 'user';
        const newUser = yield tx.user.create({ data: payload });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user creation failed');
        }
        const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
        if (!image) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
        }
        profile.image = image.secure_url;
        profile.userId = newUser.id;
        profile.username = newUser.name;
        const newProfile = yield tx.profile.create({ data: profile });
        if (!newProfile) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'profile creation failed');
        }
        return newUser;
    }));
    return result;
});
const createAdmin = (profile, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user email already exists');
        }
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bycrypt_salt_rounds));
        const newUser = yield tx.user.create({ data: payload });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'admin creation failed');
        }
        const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
        if (!image) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
        }
        profile.image = image.secure_url;
        profile.userId = newUser.id;
        profile.username = newUser.name;
        const newProfile = yield tx.profile.create({ data: profile });
        if (!newProfile) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'profile creation failed');
        }
        return newUser;
    }));
    return result;
});
const getAllUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        const result = yield prisma_1.default.user.findMany({ where: { role: 'user' } });
        const usersWithoutPassword = result.map(user => {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }
    const result = yield prisma_1.default.user.findMany();
    const usersWithoutPassword = result.map(user => {
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        return userWithoutPassword;
    });
    return usersWithoutPassword;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        include: { Profile: true },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const { password } = result, userWithoutPassword = __rest(result, ["password"]);
    return userWithoutPassword;
});
const updateSingleUser = (id, profile, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield tx.user.update({
            where: { id: id },
            data: payload,
            include: { Profile: true },
        });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user update failed');
        }
        if (file !== undefined) {
            const image = yield fileUploader_1.FileUploadHelper.uploadToCloudinary(file);
            if (!image) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid profile');
            }
            profile.username = newUser.name;
            profile.image = image === null || image === void 0 ? void 0 : image.secure_url;
            const newProfile = yield tx.profile.updateMany({
                where: { userId: newUser.id },
                data: profile,
            });
            if (!newProfile) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'profile update failed');
            }
        }
        const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return userWithoutPassword;
    }));
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findUnique({ where: { id } });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.profile.deleteMany({ where: { userId: id } });
        const result = yield tx.user.delete({
            where: { id },
        });
        return result;
    }));
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    createUser,
    createAdmin,
};
