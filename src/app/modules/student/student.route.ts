import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router.post(
  '/', 
  
  studentController.createTest
);

export const studentRoute = router;
