const Reviews = require('../database/index.js');

const getAll = (req, res) => {
    Reviews.find().sort({date: -1})
    .then( data => res.status(200).send(data))
    .catch( err => console.error('Error'));
};

const getProductReviews = (req, res) => {
    var { productID } = req.params;
    Reviews.find(req.params)
    .then( data => res.status(200).send(data))
    .catch( err => console.error('Error'));
};

const post = (req, res) => {
    console.log(req.params);
    res.status(201).send('Added a new review!');
};

const update = (req, res) => {
    console.log(req.params);
    res.status(200).send('Update a review!');
};

module.exports = {
    getAll,
    getProductReviews,
    post,
    update
}