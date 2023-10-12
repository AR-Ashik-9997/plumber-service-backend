import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { feedbackValidation } from './feedback.validation';
import { feedbackController } from './feedback.controller';

const router = express.Router();

router.post(
  '/',
  requestValidation(feedbackValidation.createFeedback),
  auth(ENUM_USER_ROLE.USER),
  feedbackController.createfeedback
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), feedbackController.getAllFeedback);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  feedbackController.getSingleFeedback
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  feedbackController.deleteFeedback
);

export const FeedbackRoute = router;
