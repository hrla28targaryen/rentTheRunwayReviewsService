const router = require('express').Router();
const controller = require('./controller.js');

router
    .route('/:designer/:product')
    .get(controller.get)
    .post(controller.post)
    .put(controller.update);

router
    .route('/:designer/:product/review-p:page')
    .put(controller.update);

module.exports = router;