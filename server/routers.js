const router = require('express').Router();
const controller = require('./controller.js');

router
    .route('/shop/designers/:designer/:product')
    .get(controller.get)
    .post(controller.post);

router
    .route('/shop/designers/:designer/:product')
    .put(controller.put);

router
    .route('/shop/designers/:designer/:product/review-p:page')
    .put(controller.put);

module.exports = router;