const restaurantsController = require('../controllers/restaurants.controller');
const restaurantsMiddlewares = require('../middlewares/restaurant.middlewares');
const authMiddlewares = require('../middlewares/auth.middlewares');
const validMiddlewares = require('../middlewares/validations.middlewares');
const reviewsMiddlewares = require('../middlewares/reviews.middlewraes');
const reviewsController = require('../controllers/reviews.controller');
const express = require('express');

const router = express.Router();

router.get('/', restaurantsController.findAllRes);
router.get(
  '/:id',
  restaurantsMiddlewares.validExistRestau,
  restaurantsController.findOneUsers
);

router.use(authMiddlewares.protect);

router.post(
  '/',
  authMiddlewares.restrictTo('admin'),
  validMiddlewares.createRestaurantValidation,
 
  restaurantsController.createRes
);

router
  .route('/:id')
  .patch(
    authMiddlewares.restrictTo('admin'),
    restaurantsMiddlewares.validExistRestau,
    
    restaurantsController.updateRestaurant
  )
  .delete(
    authMiddlewares.restrictTo('admin'),
    restaurantsMiddlewares.validExistRestau,
    
    restaurantsController.deleteRestaurant
  );

router.post(
  '/reviews/:id',
  restaurantsMiddlewares.validExistRestau,
  reviewsController.createReviews
);

router
  .use(
    '/reviews/restaurantId/:id',
    reviewsMiddlewares.existReviews,
    restaurantsMiddlewares.validExistRestau
  )
  .route('/reviews/restaurantId/:id')
  .patch(
    authMiddlewares.protectAccountOwner,
    reviewsController.updateReviews
  )
  .delete(
    authMiddlewares.protectAccountOwner,
    reviewsController.deleteReviews
  );

module.exports = router;
