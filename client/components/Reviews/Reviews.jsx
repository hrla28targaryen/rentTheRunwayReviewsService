import React from 'react';
import Summary from '../Summary/Summary.jsx';
import FilterSearch from '../FilterSearch/FilterSearch.jsx';
import ReviewList from '../ReviewList/ReviewList.jsx';
import style from './Reviews.scss';
import axios from 'axios';
import Pagination from '../Pagination/Pagination.jsx';


class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            imagesGallery: [],
            averageRatings: 0,
            fit: {
                large: 0,
                trueToSize: 0,
                small: 0
            },
            currentReviews: [],
            pageLimit: 5, 
            currentPage: 1, 
            totalPages: 1
        }
        this.fetchData = this.fetchData.bind(this);
        this.fetchDataByID = this.fetchDataByID.bind(this);
        this.filterByWomenLikeMe = this.filterByWomenLikeMe.bind(this);
        this.sortByFeatured = this.sortByFeatured.bind(this);
        this.sortByNewest = this.sortByNewest.bind(this);
        this.sortByRating = this.sortByRating.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount() {
        this.fetchDataByID();
    }

    fetchData() {
        axios.get('/api/reviews')
        .then( data => {
            let totalRatings = 0;
            let smallCt = 0;
            let trueCt = 0;
            let largeCt = 0;
            data.data.forEach( review => {
                totalRatings += review.comment.rating;
                if (review.purchaseInfo.overAllFit === "SMALL") {
                    smallCt++;
                } else if (review.purchaseInfo.overAllFit === "TRUE TO SIZE") {
                    trueCt++;
                } else {
                    largeCt++;
                }
            });
            this.setState(
                { 
                    reviews: data.data.reviews,
                    averageRatings : totalRatings/(data.data.reviews.length), 
                    fit : {
                            large: largeCt,
                            trueToSize: trueCt,
                            small: smallCt,
                        },
                    currentReviews:  data.data.reviews
                });   
        })
        .catch( err => console.error(err));
    }

    fetchDataByID() {
        let rand = `HRLA`;
        var i = Math.floor(Math.random() * 100);
        if (i.toString().length === 1) {
        rand += '00' + i.toString();
        } else if (i.toString().length === 2) {
        rand += '0' + i.toString();
        } else if (i.toString().length === 3) {
        rand += i.toString();
        }
        axios.get(`/api/reviews/${rand}`)
        .then( data => {
            let totalRatings = 0;
            let smallCt = 0;
            let trueCt = 0;
            let largeCt = 0;
            let imgArr = [];
            data.data[0].reviews.forEach( review => {
                totalRatings += review.comment.rating;
                if (review.purchaseInfo.overAllFit === "SMALL") {
                    smallCt++;
                } else if (review.purchaseInfo.overAllFit === "TRUE TO SIZE") {
                    trueCt++;
                } else {
                    largeCt++;
                }

                if(review.image.length > 0){
                    imgArr = imgArr.concat(review.image);
                }
            });
            var totalPages = Math.ceil(data.data[0].reviews.length / this.state.pageLimit);
            this.setState(
                { 
                    reviews: data.data[0].reviews,
                    imagesGallery: imgArr,
                    averageRatings : totalRatings/(data.data[0].reviews.length), 
                    fit : {
                            large: largeCt,
                            trueToSize: trueCt,
                            small: smallCt,
                        },
                    currentReviews:  data.data[0].reviews.slice(0, this.state.pageLimit),
                    totalPages: totalPages
                });   
        })
        .catch( err => console.error(err));
    }

    filterByWomenLikeMe(size, height, bustSize, age) {
        var matchfilterArr = [];
        var nomatchfilterArr = [];
        this.state.reviews.map( review => {
            if(review.purchaseInfo.sizeWorn.includes(size.toString()) ||
                review.userInfo.height === height || 
                review.userInfo.bustSize === bustSize ||
                review.userInfo.age === age.toString() ){
                matchfilterArr.push(review);
            } else {
                nomatchfilterArr.push(review);
            }   
        });
        matchfilterArr.sort( (a,b) => {
            if( b.date > a.date ) {
                return 1;
            } else if ( b.date < a.date ) {
                return -1;
            } else  {
                return 0;
            }
        });
        
        nomatchfilterArr.sort( (a,b) => {
            if( b.date > a.date ) {
                return 1;
            } else if ( b.date < a.date ) {
                return -1;
            } else  {
                return 0;
            }
        });

        this.setState({ reviews: matchfilterArr.concat(nomatchfilterArr) }, () => {
            this.setState({ 
                currentReviews:  this.state.reviews.slice(0, this.state.pageLimit),
                currentPage: 1 
            });
        });
    }
    
    //sort by if has images and newest
    sortByFeatured() {
        var matchfilterArr = [];
        var nomatchfilterArr = [];
        this.state.reviews.map( review => {
            if(review.image.length) {
                matchfilterArr.push(review);
            } else {
                nomatchfilterArr.push(review);
            }   
        });
        matchfilterArr.sort( (a,b) => {
            if( b.date > a.date ) {
                return 1;
            } else if ( b.date < a.date ) {
                return -1;
            } else  {
                return 0;
            }
        });
        
        nomatchfilterArr.sort( (a,b) => {
            if( b.date > a.date ) {
                return 1;
            } else if ( b.date < a.date ) {
                return -1;
            } else  {
                return 0;
            }
        });

        this.setState({ reviews: matchfilterArr.concat(nomatchfilterArr) }, () => {
            this.setState({ 
                currentReviews:  this.state.reviews.slice(0, this.state.pageLimit),
                currentPage: 1 
            });
        });
    }

    sortByRating() {
        let reviewsArr = this.state.reviews;
        reviewsArr.sort( (a,b) => {
            return b.comment.rating - a.comment.rating;
        });
        this.setState({ reviews : reviewsArr }, () => {
            this.setState({ 
                currentReviews:  this.state.reviews.slice(0, this.state.pageLimit),
                currentPage: 1 
             });
        });
    }

    sortByNewest() {
        let reviewsArr = this.state.reviews;
        reviewsArr.sort( (a,b) => {
            if( b.date > a.date ) {
                return 1;
            } else if ( b.date < a.date ) {
                return -1;
            } else  {
                return 0;
            }
        });
        this.setState({ reviews : reviewsArr }, () => {
            this.setState({ 
                currentReviews:  this.state.reviews.slice(0, this.state.pageLimit),
                currentPage: 1 
             });
        });
    }

    onPageChanged( data ) {
        const { reviews } = this.state;
        const { currentPage, totalPages, pageLimit } = data;    
        const offset = (currentPage - 1) * pageLimit;
        const currentReviews = reviews.slice(offset, offset + pageLimit);   
        this.setState({ currentPage, currentReviews, totalPages });
    }

    render() {
        return (
            <div className={style.reviewsContainer}>
                <Summary 
                    key={this.state.imagesGallery.length}
                    averageRatings={this.state.averageRatings} 
                    fit={this.state.fit} 
                    numberOfReviews={this.state.reviews.length} 
                    imagesGallery={this.state.imagesGallery} />
                <div className={style.filterReviewsWrapper}>
                    <FilterSearch 
                        filterByWomenLikeMe={this.filterByWomenLikeMe}
                        sortByFeatured={this.sortByFeatured}
                        sortByRating={this.sortByRating} 
                        sortByNewest={this.sortByNewest} />
                    <ReviewList 
                        reviews={this.state.currentReviews} />
                    <Pagination 
                        totalPages={this.state.totalPages}
                        currentReviews={this.state.currentReviews.length} 
                        currentPage={this.state.currentPage} 
                        pageLimit={this.state.pageLimit} 
                        onPageChanged={this.onPageChanged} />
                </div>
            </div>
        );
    }
}

export default Reviews;