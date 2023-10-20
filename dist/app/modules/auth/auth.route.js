"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/signup', (0, requestValidation_1.default)(auth_validation_1.AuthValidation.createUser), auth_controller_1.AuthController.createUser);
router.post('/signin', (0, requestValidation_1.default)(auth_validation_1.AuthValidation.loginUser), auth_controller_1.AuthController.LoginUser);
exports.AuthRoute = router;
