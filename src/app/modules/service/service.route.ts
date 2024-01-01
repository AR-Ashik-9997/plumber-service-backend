import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { serviceValidation } from './service.validation';
import { serviceController } from './service.controller';
import requestValidation from '../../middlewares/requestValidation';
const router = express.Router();

router.post(
  '/',
  requestValidation(serviceValidation.createServices),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.createService
);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getSingleService);

router.patch(
  '/:id',
  requestValidation(serviceValidation.updateServices),
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.updateSingleService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.deleteService
);

export const ServiceRoute = router;
