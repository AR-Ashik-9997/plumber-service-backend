"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const feedback_validation_1 = require("./feedback.validation");
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(feedback_validation_1.feedbackValidation.createFeedback), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), feedback_controller_1.feedbackController.createfeedback);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.feedbackController.getAllFeedback);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.feedbackController.getSingleFeedback);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.feedbackController.deleteFeedback);
exports.FeedbackRoute = router;
