import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { productReviewValidation } from './product.review.validation';
import { productReviewController } from './product.review.controller';
const router = express.Router();

router.post(
  '/',
  requestValidation(productReviewValidation.createProductReview),
  auth(ENUM_USER_ROLE.USER),
  productReviewController.createProductReview
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  productReviewController.getAllProductReview
);

export const ProductReviewRoute = router;
