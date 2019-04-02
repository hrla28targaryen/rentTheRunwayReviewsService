import React from 'react';
import PropTypes from 'prop-types';
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
                        return <ReviewListEntry key={review._id} review={review} />
                    })
                }
                </div>
            </div>
        );
    }
}
ReviewList.propTypes = {
    reivews: PropTypes.array
  };

export default ReviewList;