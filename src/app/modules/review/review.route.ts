import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import requestValidation from '../../middlewares/requestValidation';
import { reviewValidation } from './review.validation';
import { reviewController } from './review.controll';

const router = express.Router();

router.post(
  '/',
  requestValidation(reviewValidation.createReview),
  auth(ENUM_USER_ROLE.USER),
  reviewController.createReview
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  reviewController.getAllReview
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  reviewController.getSingleReview
);

export const ReviewRoute = router;
