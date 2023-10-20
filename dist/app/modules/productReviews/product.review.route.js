"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const product_review_validation_1 = require("./product.review.validation");
const product_review_controller_1 = require("./product.review.controller");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(product_review_validation_1.productReviewValidation.createProductReview), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), product_review_controller_1.productReviewController.createProductReview);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), product_review_controller_1.productReviewController.getAllProductReview);
exports.ProductReviewRoute = router;
