"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const profile_route_1 = require("../modules/profile/profile.route");
const user_route_1 = require("../modules/user/user.route");
const service_route_1 = require("../modules/service/service.route");
const service_review_route_1 = require("../modules/serviceReview/service.review.route");
const booking_route_1 = require("../modules/booking/booking.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const blog_route_1 = require("../modules/blog/blog.route");
const faq_route_1 = require("../modules/faq/faq.route");
const products_route_1 = require("../modules/products/products.route");
const product_review_route_1 = require("../modules/productReviews/product.review.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoute,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
    {
        path: '/service/reviews',
        route: service_review_route_1.ServiceReviewRoute,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoute,
    },
    {
        path: '/products',
        route: products_route_1.ProductRoute,
    },
    {
        path: '/products/reviews',
        route: product_review_route_1.ProductReviewRoute,
    },
    {
        path: '/feedback',
        route: feedback_route_1.FeedbackRoute,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoute,
    },
    {
        path: '/faq',
        route: faq_route_1.FaqRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
