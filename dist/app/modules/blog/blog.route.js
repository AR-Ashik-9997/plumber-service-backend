"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const fileUploader_1 = require("../../../helpers/fileUploader");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = blog_validation_1.blogValidation.createBlog.parse(JSON.parse(req.body.data));
    return blog_controller_1.blogController.createBlog(req, res, next);
});
router.get('/', blog_controller_1.blogController.getAllblog);
router.get('/:id', blog_controller_1.blogController.getSingleBlog);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), fileUploader_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = blog_validation_1.blogValidation.updateBlog.parse(JSON.parse(req.body.data));
    return blog_controller_1.blogController.updateBlog(req, res, next);
});
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogController.deleteBlog);
exports.BlogRoute = router;
