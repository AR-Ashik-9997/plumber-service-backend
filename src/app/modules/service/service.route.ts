import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { serviceValidation } from './service.validation';
import { serviceController } from './service.controller';
import { FileUploadHelper } from '../../../helpers/fileUploader';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = serviceValidation.createServices.parse(
      JSON.parse(req.body.data)
    );
    return serviceController.createService(req, res, next);
  }
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.getAllServices
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.getSingleService
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = serviceValidation.updateServices.parse(
      JSON.parse(req.body.data)
    );
    return serviceController.updateSingleService(req, res, next);
  }
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.deleteService
);

export const ServiceRoute = router;
