import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoute } from '../modules/service/service.route';
import { ReviewRoute } from '../modules/review/review.route';
import { BookingRoute } from '../modules/booking/booking.route';

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
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/reviews',
    route: ReviewRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
