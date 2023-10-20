"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginResponse = void 0;
const sendLoginResponse = (res, data) => {
    const responseLoginData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        token: data.token || null || undefined,
    };
    res.status(data.statusCode).json(responseLoginData);
};
exports.sendLoginResponse = sendLoginResponse;
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
