const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 
mongoose.connect('mongodb://localhost/renttherunway')
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
    productID : { type: String, ref :'productID' }
}, {
    timestamps : { createdAt: "created_at" }
});

const productSchema = new mongoose.Schema({
    productID: { type: String, Unique: true }, //HRLA001 to HRLA100
    productName: { type: String },
    designerName: { type: String },
    facebook: { type: Number },
    // items: [reservationSchema]
    reviews: [reviewSchema]
   });

const ReviewService = mongoose.model('Reviews', reviewSchema);
const ProductService = mongoose.model('Product', productSchema);

module.exports = ReviewService;