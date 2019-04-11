var chai = require('chai');
var mongoose = require('mongoose');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server/server.js');
var Product = require('../database/index.js');

mongoose.Promise = global.Promise;

chai.use(require('chai-things'));

var dbURI = 'mongodb://localhost/renttherunway';

var getBody = function (res) {
  return JSON.parse(res.text);
};

var clearDB = function (done) {
  mongoose.connection.collections['products'].drop(done);
};

var startProduct = [
    {
        "productID": "HRLA078",
        "designerName": "Riccardo Tisci",
        "facebook": 869,
        "reviews": [
            {
                "purchaseInfo": {
                    "sizeWorn": "20R",
                    "rentFor": "EVERYDAY",
                    "overAllFit": "SMALL"
                },
                "userInfo": {
                    "usuallyWear": "6",
                    "height": "4' 5\"",
                    "age": "27",
                    "bustSize": "31A",
                    "bodyType": "FULL BUST",
                    "weight": "100LBS"
                },
                "comment": {
                    "rating": 5,
                    "commentTitle": "Absolutely love!",
                    "commentBody": "Material in the back is soft"
                },
                "image": [],
                "_id": "5ca2ad2fbd6334ef2df5fb07",
                "name": "Lisa",
                "dateString": "October 28 2018",
                "date": "2018-10-28T23:45:15.340Z",
                "created_at": "2019-04-02T00:30:39.626Z",
                "updatedAt": "2019-04-02T00:30:39.626Z"
            },
            {
                "purchaseInfo": {
                    "sizeWorn": "12R",
                    "rentFor": "FORMAL AFFAIR",
                    "overAllFit": "LARGE"
                },
                "userInfo": {
                    "usuallyWear": "6R",
                    "height": "5' 4\"",
                    "age": "30",
                    "bustSize": "36E",
                    "bodyType": "PETITE",
                    "weight": "175LBS"
                },
                "comment": {
                    "rating": 2,
                    "commentTitle": "Runs small with no give",
                    "commentBody": "These are amazing! Fit perfectly, slimming, and look great with anything. If you're in between sizes or high waisted, I'd size up."
                },
                "image": [
                    "https://s3.amazonaws.com/hrla28renttherunway/Pants/SequinTrack_Pants3.jpg"
                ],
                "_id": "5ca2ad2fbd6334ef2df5fb06",
                "name": "Jenny",
                "dateString": "September 25 2018",
                "date": "2018-09-25T12:53:35.842Z",
                "created_at": "2019-04-02T00:30:39.626Z",
                "updatedAt": "2019-04-02T00:30:39.626Z"
            },
            {
                "purchaseInfo": {
                    "sizeWorn": "0R",
                    "rentFor": "FORMAL AFFAIR",
                    "overAllFit": "LARGE"
                },
                "userInfo": {
                    "usuallyWear": "14",
                    "height": "4' 6\"",
                    "age": "37",
                    "bustSize": "32AA",
                    "bodyType": "PEAR",
                    "weight": "125LBS"
                },
                "comment": {
                    "rating": 2,
                    "commentTitle": "Absolutely love!",
                    "commentBody": "Fit is comfortable, fabric is not too hot, I was able to wear in Texas mid May for work."
                },
                "image": [
                    "https://s3.amazonaws.com/hrla28renttherunway/Pants/SequinTrack_Pants2.jpg",
                    "https://s3.amazonaws.com/hrla28renttherunway/Pants/SequinTrack_Pants.jpg"
                ],
                "_id": "5ca2ad2fbd6334ef2df5fb05",
                "name": "Jodie",
                "dateString": "September 17 2018",
                "date": "2018-09-17T08:32:15.310Z",
                "created_at": "2019-04-02T00:30:39.626Z",
                "updatedAt": "2019-04-02T00:30:39.626Z"
            },
        ],
    }
];

describe('Reviews API', function() {
    var server;

  before(function (done) {
    if (mongoose.connection.db) {
      done();
    }
    mongoose.connect(dbURI, done);
  });

  beforeEach(function (done) {
    server = app.listen(3000, function() {
      clearDB(function () {
        Product.create(startProduct, done);
      });
    });
  });

  afterEach(function () {
    server.close();
  });

  describe('GET /specific product id', function() {
    it('should fetch a created user', async function(done) {
        const response = await request(app).get(`/api/shop/designers/HRLA078`)
        expect(response.body[0].reviews.length).to.equal(3);
        expect(response.statusCode).toBe(200);
    })
  });
});