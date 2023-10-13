import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import requestValidation from '../../middlewares/requestValidation';
import { reviewValidation } from './service.review.validation';
import { ServiceReviewController } from './service.review.controll';

const router = express.Router();

router.post(
  '/',
  requestValidation(reviewValidation.createReview),
  auth(ENUM_USER_ROLE.USER),
  ServiceReviewController.createServiceReview
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ServiceReviewController.getAllServiceReview
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ServiceReviewController.getSingleServiceReview
);

export const ServiceReviewRoute = router;
