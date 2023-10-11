import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/profile',
    route: ProfileRoute,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
