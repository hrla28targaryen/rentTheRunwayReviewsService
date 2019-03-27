const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 
mongoose.connect('mongodb://localhost/reviewsService')
    .then( () => console.log('Connect to MYSQL Database'))
    .catch( err => console.error('Cannot connect to database'));

const reviewSchema = mongoose.Schema({
    name : { type : String },
    purchaseInfo : {
        sizeWorn : { type : String },
        rentFor : { type : String },
        overAllFit : { type : String },
    },
    userInfo : {
        usuallyWear : { type : String },
        height : { type : String },
        age : { type : String },
        bustSize : { type : String },
        bodyType : { type : String },
        weight : { type : String },
    },
    comment : {
        rating: { type : Number },
        commentTitle : { type : String },
        commentBody : { type : String },
    },
    image : [String],
}, {
    timestamps : { createdAt: "created_at" }
});

const ReviewService = mongoose.model('Reviews', reviewSchema);

module.exports = ReviewService;