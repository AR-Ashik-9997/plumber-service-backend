import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoute } from '../modules/service/service.route';
import { ReviewRoute } from '../modules/review/review.route';
import { BookingRoute } from '../modules/booking/booking.route';
import { FeedbackRoute } from '../modules/feedback/feedback.route';
import { BlogRoute } from '../modules/blog/blog.route';
import { FaqRoute } from '../modules/faq/faq.route';

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
  {
    path: '/feedback',
    route: FeedbackRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
  {
    path: '/faq',
    route: FaqRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
