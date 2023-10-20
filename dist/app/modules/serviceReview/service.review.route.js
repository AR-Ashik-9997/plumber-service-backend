"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const service_review_validation_1 = require("./service.review.validation");
const service_review_controll_1 = require("./service.review.controll");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(service_review_validation_1.reviewValidation.createReview), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), service_review_controll_1.ServiceReviewController.createServiceReview);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), service_review_controll_1.ServiceReviewController.getAllServiceReview);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), service_review_controll_1.ServiceReviewController.getSingleServiceReview);
exports.ServiceReviewRoute = router;
