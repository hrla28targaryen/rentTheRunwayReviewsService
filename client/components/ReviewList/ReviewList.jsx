import React from 'react';
import style from './ReviewList.scss';
import ReviewListEntry from '../ReviewListEntry/ReivewListEntry.jsx';

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={style.reviewList}>
                <div className={style.reviewListWrapper}>
                {
                    this.props.reviews.map( review => {
                        return <ReviewListEntry review={review} />
                    })
                }
                </div>
            </div>
        );
    }
}

export default ReviewList;