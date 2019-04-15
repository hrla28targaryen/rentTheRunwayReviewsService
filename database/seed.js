const mongoose = require('mongoose');
const moment = require('moment');
const async = require('async');
const Product = require('./index.js');
const listObjects = require('./s3.js');

const NAMES = [
    'Jodie', 'Lisa', 'RTR Customer', 'Holly',
    'Kelly', 'Natalia', 'Erin', 'YiChen', 'Jenny',
    'Caroline', 'Jessica', 'Paige', 'Brianna', 'Tracy',
    'Leah', 'Sommer', 'Stephanie', 'Kimberly', 'Anne',
    'Danya', 'Margaret', 'Rosemary', 'April', 'Vanessa',
    'Delise', 'Brie', 
];

const SIZEWORN = [
    'NONE','XS','S', 'M', 'L', 'XL',
    '0','0R','2','2R','4','4R','6','6R',
    '8','8R','10','10R','12','12R','14','14R',
    '16','16R','18','18R','20','20R','22','22R',
];

const BRASIZE = [
    'A', 'AA', 'B', 'BB', 
    'C','CC', 'D', 'DD',
    'E', 'EE', 'F', 'FF'
];

const OVERALLFIT = [
    'SMALL', 'TRUE TO SIZE', 'LARGE'
];

const RENTFOR = [
    'OTHER', 'EVERYDAY', 'FORMAL AFFAIR', 'WORK',
    'PARTY',
];

const BODYTYPE = [
    'STRAIGHT & NARROW', 'HOURGLASS', 
    'ATHLETIC', 'PEAR', 'PETITE', 'FULL BUST'
];

const COMMENTTITLE = [
    'True to size, little sheer', 'Great for petite!', 'Comfy and cute',
    'Unique', 'Perfect for office to nice dinner/night out', 'Runs small with no give',
    'So comfortable', 'Absolutely love!', 'Not As Fun As I Thought They Would Be', 
    'The picture does not do them justice!', 'Runs small with no give', 'Good fit and style'
];

const COMMENTBODY = [
    'Cute, great fit, and the lace made the leggings pop!', 'These were fun to have. Just wish I had sized up. The front is a pretty lace and the back is a smooth stretchy satin.',
    'The moment I put these on, I don\'t want to put it off. Super comfortable. Love the details!', 'Very comfortable. Great for petites', 'super cute, but definitely unreasonably short on me',
    'Great fit!!!', 'Material in the back is soft', 'These are amazing! Fit perfectly, slimming, and look great with anything. If you\'re in between sizes or high waisted, I\'d size up.',
    'I rented a size 0 but they were so loose through the thighs and butt that there was no way I could actually wear them in public.', 'Fit is comfortable, fabric is not too hot, I was able to wear in Texas mid May for work.',
    'Fit is comfortable, fabric is not too hot, I was able to wear in Texas mid May for work.'
];

const s3url = 'https://s3.amazonaws.com/renttherunwayhrla28/';

const designerPool = [
    'Alexander McQueen', 'Betsey Johnson', 'Emilio Pucci', 'Miuccia Prada', 'Riccardo Tisci', 'Le Corbusier', 'Coco Chanel'
];
   
const itemNamePool= [
    'Chill', 'Lit', 'n', 'Mara', 'Delicate', '1004', 'Payton', 'Chiffon', 'Cropped', 'Column', 'Wrap', 'Isabella', 'Lia',
    'Metallic', 'Deconstructed', 'Hetty', 'Track', 'Nell', 'Ella', 'Tank', 'Tie', 'Wild', 'WildFlower', 'Tiger', 'Ellii',
    'Sha', 'Ira', 'Miya', 'dark', 'light'
];
   
const cataPool = [
    'Dress', 'Bag', 'Earrings', 'Top', 'Pants'
];

const asyncProcess = (i) => {
    let productID = 'HRLA';
    if (i.toString().length === 1) {
        productID += '00' + i.toString();
    } else if (i.toString().length === 2) {
        productID += '0' + i.toString();
    } else if (i.toString().length === 3) {
        productID += i.toString();
    }
    let productName = `${itemNamePool[Math.floor(Math.random() * itemNamePool.length)]} ${cataPool[Math.floor(Math.random() * cataPool.length)]}`;
    let designerName = `${designerPool[Math.floor(Math.random() * designerPool.length)]}`;
    let facebook = Math.floor(Math.random() * 1000);

    listObjects(productName.split(' ')[1])
        .then( data => {
            let imageKeyArr = [];
            for (let k = 0; k < data.Contents.length; k++) {
                if(data.Contents[k].Key.includes('jpg')){
                    imageKeyArr.push(s3url + data.Contents[k].Key);
                }  
            }
            return imageKeyArr;
        })
        .then( imgUrlArr => {
            let reviewsArr = [];
            let totalReviews =  Math.random()*10;

            for(let j = 0; j < totalReviews; j++){
                var date = Date.now()-(Math.floor(Math.random()*31536000000));
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
                    dateString : moment(date).format("MMMM DD YYYY"),
                    date : date
                }; 

                let imagesArr = [];
                // Randomly grab zero to one images from imageArrURL
                let numOfImages = Math.floor( Math.random() * 3 );

                // Randomly choose images from image array
                for(let k = 0; k < numOfImages; k++){
                    let index = Math.floor( Math.random() * imgUrlArr.length );
                    imagesArr.push(imgUrlArr[index]);
                }

                obj.image = imagesArr;

                reviewsArr.push(obj);
            }
            reviewsArr.sort(function(a,b){
                    return b.date - a.date;
                });
            return reviewsArr;
        })
        .then( result => {
            let prod = new Product({
                productID: productID, //through for loop
                itemName: productName, //random generator
                designerName: designerName, //random gen
                facebook: facebook, // random gen
                reviews: result
            });

            prod.save()
                .then(() => {
                    Product.findOne({ productID }) // just to see if the prod above is saved
                    .then(productWithReviews => {
                        console.log('Exists in database!');
                        console.log(productWithReviews);
                    });
                })
                .catch( err => console.log('Didnt create anything', err));
        })
        .catch( err => console.log('Could not access s3 bucket & no data was added to database', err))
};

function seedFunction() {

    for(let i = 0; i < 100; i++) {
        setTimeout(() => {
            asyncProcess(i);
          }, 2000);
        
    };
};

seedFunction();

