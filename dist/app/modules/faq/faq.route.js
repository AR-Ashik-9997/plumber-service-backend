"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const faq_validation_1 = require("./faq.validation");
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(faq_validation_1.faqValidation.createFaq), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.createFaq);
router.get('/', faq_controller_1.faqController.getFaq);
router.patch('/:id', (0, requestValidation_1.default)(faq_validation_1.faqValidation.updateFaq), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.updateFaq);
exports.FaqRoute = router;
