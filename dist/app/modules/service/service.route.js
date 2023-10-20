"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const fileUploader_1 = require("../../../helpers/fileUploader");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = service_validation_1.serviceValidation.createServices.parse(JSON.parse(req.body.data));
    return service_controller_1.serviceController.createService(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), service_controller_1.serviceController.getAllServices);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), service_controller_1.serviceController.getSingleService);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = service_validation_1.serviceValidation.updateServices.parse(JSON.parse(req.body.data));
    return service_controller_1.serviceController.updateSingleService(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.serviceController.deleteService);
exports.ServiceRoute = router;
