import React from 'react';
import PropTypes from 'prop-types';
import style from './StarRating.scss';

const StarRating = (props) => (
    <div className={style.starRatingsSprite}>
        <span 
            style={{width:`${props.rating}%`}}
            className={style.starRatingsSpriteRating}>
        </span>
    </div>
);

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
  };

export default StarRating;