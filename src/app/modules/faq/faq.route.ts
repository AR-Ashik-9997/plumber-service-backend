import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { faqValidation } from './faq.validation';
import { faqController } from './faq.controller';
const router = express.Router();

router.post(
  '/',
  requestValidation(faqValidation.createFaq),
  auth(ENUM_USER_ROLE.ADMIN),
  faqController.createFaq
);
router.get('/', faqController.getFaq);

router.patch(
  '/:id',
  requestValidation(faqValidation.updateFaq),
  auth(ENUM_USER_ROLE.ADMIN),
  faqController.updateFaq
);

export const FaqRoute = router;
