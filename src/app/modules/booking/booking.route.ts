import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

import requestValidation from '../../middlewares/requestValidation';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  requestValidation(bookingValidation.createBooking),
  auth(ENUM_USER_ROLE.USER),
  bookingController.createBooking
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  bookingController.getAllbooking
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  bookingController.getSingleBooking
);

router.patch(
  '/:id',
  requestValidation(bookingValidation.updateBooking),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  bookingController.updateBooking
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  bookingController.deleteBooking
);

export const BookingRoute = router;
