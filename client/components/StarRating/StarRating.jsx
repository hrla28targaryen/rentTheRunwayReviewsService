import React from 'react';
import style from './StarRating.scss';

const StarRating = (props) => (
    <div className={style.starRatingsSprite}>
        <span 
            style={{width:`${props.rating}%`}}
            className={style.starRatingsSpriteRating}>
        </span>
    </div>
);

export default StarRating;