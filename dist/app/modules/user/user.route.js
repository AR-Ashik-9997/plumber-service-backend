"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const fileUploader_1 = require("../../../helpers/fileUploader");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.createUser.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createUser(req, res, next);
});
router.post('/create/admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createAdmin(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.UserController.getAllUsers);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.updateUser.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.updateSingleUser(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), user_controller_1.UserController.deleteSingleUser);
exports.UserRoutes = router;
