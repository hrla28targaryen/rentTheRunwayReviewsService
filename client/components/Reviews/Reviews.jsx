import React from 'react';
import Summary from '../Summary/Summary.jsx';
import FilterSearch from '../FilterSearch/FilterSearch.jsx';
import ReviewList from '../ReviewList/ReviewList.jsx';
import style from './Reviews.scss';
import axios from 'axios';


class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            averageRatings: 0,
            fit: {
                large: 0,
                trueToSize: 0,
                small: 0
            }
        }
        this.fetchData = this.fetchData.bind(this);
        this.filterByWomenLikeMe = this.sortByWomenLikeMe.bind(this);
        this.sortByFeatured = this.sortByFeatured.bind(this);
        this.sortByNewest = this.sortByNewest.bind(this);
        this.sortByRating = this.sortByRating.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('/api/shop/designers')
        .then( data => {
            let totalRatings = 0;
            let smallCt = 0;
            let trueCt = 0;
            let largeCt = 0;
            data.data.forEach( review => {
                totalRatings += review.comment.rating;
                if (review.purchaseInfo.overAllFit === "SMALL") {
                    smallCt += 1;
                } else if (review.purchaseInfo.overAllFit === "TRUE TO SIZE") {
                    trueCt += 1;
                } else {
                    largeCt += 1;
                }
            });
            this.setState(
                { 
                    reviews: data.data,
                    averageRatings : totalRatings/(data.data.length), 
                    fit : {
                            large: largeCt,
                            trueToSize: trueCt,
                            small: smallCt,
                        } 
                });   
        })
        .catch( err => console.error(err));
    }

    filterByWomenLikeMe = (size, height, bustSize, age) => {
    
    }
    
    //sort by if has images and newest
    sortByFeatured = () => {
        
    }

    sortByRating = () => {
        
    }

    sortByNewest = () => {

    }

    render() {
        return (
            <div className={style.reviewsContainer}>
                <Summary averageRatings={this.state.averageRatings} fit={this.state.fit} numberOfReviews={this.state.reviews.length} />
                <div className={style.filterReviewsWrapper}>
                    <FilterSearch />
                    <ReviewList reviews={this.state.reviews}/>
                </div>
            </div>
        );
    }
}

export default Reviews;