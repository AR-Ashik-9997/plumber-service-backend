"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(booking_validation_1.bookingValidation.createBooking), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.createBooking);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.getAllbooking);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.getSingleBooking);
router.patch('/:id', (0, requestValidation_1.default)(booking_validation_1.bookingValidation.updateBooking), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.bookingController.updateBooking);
exports.BookingRoute = router;
