"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const profile_controller_1 = require("./profile.controller");
const profile_validation_1 = require("./profile.validation");
const fileUploader_1 = require("../../../helpers/fileUploader");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = profile_validation_1.profileValidation.createProfile.parse(JSON.parse(req.body.data));
    return profile_controller_1.ProfileController.createProfile(req, res, next);
});
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), profile_controller_1.ProfileController.getSingleProfile);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.USER), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = profile_validation_1.profileValidation.updateProfile.parse(JSON.parse(req.body.data));
    return profile_controller_1.ProfileController.updateSingleProfile(req, res, next);
});
exports.ProfileRoute = router;
