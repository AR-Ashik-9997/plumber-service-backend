"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requestValidation_1 = __importDefault(require("../../middlewares/requestValidation"));
const products_validation_1 = require("./products.validation");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', (0, requestValidation_1.default)(products_validation_1.productValidation.createProduct), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), products_controller_1.productController.createProduct);
router.get('/', products_controller_1.productController.getAllProduct);
router.get('/:id', products_controller_1.productController.getSingleProduct);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), products_controller_1.productController.deleteProduct);
exports.ProductRoute = router;
