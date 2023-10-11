import express from 'express';

import { studentRoute } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/student',
    route: studentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
