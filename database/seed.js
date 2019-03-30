const mongoose = require('mongoose');
const ReviewService = require('./index.js');
const listObjects = require('./s3.js');

var NAMES = [
    'Jodie', 'Lisa', 'RTR Customer', 'Holly',
    'Kelly', 'Natalia', 'Erin', 'YiChen', 'Jenny',
    'Caroline', 'Jessica', 'Paige', 'Brianna', 'Tracy',
    'Leah', 'Sommer', 'Stephanie', 'Kimberly', 'Anne',
    'Danya', 'Margaret', 'Rosemary', 'April', 'Vanessa',
    'Delise', 'Brie', 
];

var SIZEWORN = [
    'NONE','XS','S', 'M', 'L', 'XL',
    '0','0R','2','2R','4','4R','6','6R',
    '8','8R','10','10R','12','12R','14','14R',
    '16','16R','18','18R','20','20R','22','22R',
];

var BRASIZE = [
    'A', 'AA', 'B', 'BB', 
    'C','CC', 'D', 'DD',
    'E', 'EE', 'F', 'FF'
];

var OVERALLFIT = [
    'SMALL', 'TRUE TO SIZE', 'LARGE'
];

var RENTFOR = [
    'OTHER', 'EVERYDAY', 'FORMAL AFFAIR', 'WORK',
    'PARTY',
];

var BODYTYPE = [
    'STRAIGHT & NARROW', 'HOURGLASS', 
    'ATHLETIC', 'PEAR', 'PETITE', 'FULL BUST'
];

var COMMENTTITLE = [
    'True to size, little sheer', 'Great for petite!', 'Comfy and cute',
    'Unique', 'Perfect for office to nice dinner/night out', 'Runs small with no give',
    'So comfortable', 'Absolutely love!', 'Not As Fun As I Thought They Would Be', 
    'The picture does not do them justice!', 'Runs small with no give', 'Good fit and style'
];

var COMMENTBODY = [
    'Cute, great fit, and the lace made the leggings pop!', 'These were fun to have. Just wish I had sized up. The front is a pretty lace and the back is a smooth stretchy satin.',
    'The moment I put these on, I don\'t want to put it off. Super comfortable. Love the details!', 'Very comfortable. Great for petites', 'super cute, but definitely unreasonably short on me',
    'Great fit!!!', 'Material in the back is soft', 'These are amazing! Fit perfectly, slimming, and look great with anything. If you\'re in between sizes or high waisted, I\'d size up.',
    'I rented a size 0 but they were so loose through the thighs and butt that there was no way I could actually wear them in public.', 'Fit is comfortable, fabric is not too hot, I was able to wear in Texas mid May for work.',
    'Fit is comfortable, fabric is not too hot, I was able to wear in Texas mid May for work.'
];

var s3url = 'https://s3-us-east-1.amazonaws.com/hrla28renttherunway/';

listObjects()
    .then( data => {
        var imageKeyArr = [];
        for (let i = 0; i < data.Contents.length; i++) {
            imageKeyArr.push(s3url + data.Contents[i].Key);
        }
        return imageKeyArr;
    })
    .then( imgUrlArr => {
        var reviewsArr = [];
        
        var productIDString = 'HRLA00' + Math.floor(Math.random() * 10);

        for(let j = 0; j < 10; j++){
            var obj = {
                name : NAMES[Math.floor(Math.random()*NAMES.length)],
                purchaseInfo : {
                    sizeWorn : SIZEWORN[Math.floor(Math.random()*SIZEWORN.length)],
                    rentFor : RENTFOR[Math.floor(Math.random()*RENTFOR.length)],
                    overAllFit : OVERALLFIT[Math.floor(Math.random()*OVERALLFIT.length)]
                },
                userInfo : {
                    usuallyWear : SIZEWORN[Math.floor(Math.random()*SIZEWORN.length)],
                    height : Math.floor( Math.random() * 3 + 4 ) + '\' ' + Math.floor( Math.random() * 3 + 4 ) + '"',
                    age : Math.floor( Math.random() * 55 + 16 ).toString(),
                    bustSize : Math.floor( Math.random() * 10 + 30 ) + BRASIZE[Math.floor(Math.random()*BRASIZE.length)],
                    bodyType : BODYTYPE[Math.floor(Math.random()*BODYTYPE.length)],
                    weight : Math.floor( Math.random() * 155 + 85 ) + 'LBS'
                },
                comment : {
                    rating : Math.floor( Math.random() * 6),
                    commentTitle : COMMENTTITLE[Math.floor(Math.random()*COMMENTTITLE.length)],
                    commentBody : COMMENTBODY[Math.floor(Math.random()*COMMENTBODY.length)]
                },
                productID : productIDString
            }; 

            var imagesArr = [];
            // Randomly grab zero to one images from imageArrURL
            var numOfImages = Math.floor( Math.random() * 3 );

            // Randomly choose images from image array
            for(let k = 0; k < numOfImages; k++){
                var index = Math.floor( Math.random() * imgUrlArr.length );
                imagesArr.push(imgUrlArr[index]);
            }

            obj.images = imagesArr;

            reviewsArr.push(obj);
        }
        return reviewsArr;
    })
    .then( result => {
        const seedFunction = (res) => {
            ReviewService.create(res)
            .then( () => {
                console.log('Database seeded!');
                mongoose.connection.close();
            })
            .catch( err => console.error(err));
        }

        console.log(result);
        seedFunction(result);
    })
    .catch( err => console.log('Could not access s3 bucket & no data was added to database', err));
