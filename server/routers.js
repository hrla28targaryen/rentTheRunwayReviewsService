const router = require('express').Router();
const controller = require('./controller.js');

router
    .route('/')
    .get(controller.getAll);

router
    .route('/:productID')
    .get(controller.getProductReviews);

// router
//     .route('/:designer/:product')
//     .get(controller.get)
//     .post(controller.post)
//     .put(controller.update);

// router
//     .route('/:designer/:product/review-p:page')
//     .get(controller.get);

module.exports = router;