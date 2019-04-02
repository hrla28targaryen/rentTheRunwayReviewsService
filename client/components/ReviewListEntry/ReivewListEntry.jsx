import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating.jsx';
import style from './ReviewListEntry.scss';

const ReviewListEntry = (props) => (
    <div className={style.reviewlistentryContainer}>
        <div className={style.reviewerInfo}>
            <div className={style.reviewerName}>
                <span>{props.review.name}</span>
                <div className={`${style.topContributor} ${style.label}`}>Top Contributor</div>
            </div>
            <div className={style.reviewerDetail}>
                <div className={style.reviewerDetailLabel}>Size Worn:</div>
                <div className={style.reviewerDetailValue}>{props.review.purchaseInfo.sizeWorn}</div>
                <div className={style.reviewerDetailLabel}>Rented For:</div>
                <div className={style.reviewerDetailValue}>{props.review.purchaseInfo.rentFor}</div>
            </div>
            <div className="reviewer-stats">
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Usually wears:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.usuallyWear}</span>
                </div>
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Height:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.height}</span>
                </div>
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Age:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.age}</span>
                </div>
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Bust Size:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.bustSize}</span>
                </div>
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Body Type:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.bodyType}</span>
                </div>
                <div className={style.label}>
                    <span className={style.reviewerDetailLabel}>Weight:</span>
                    <span className={style.reviewerDetailValue}>{props.review.userInfo.weight}</span>
                </div>
            </div>
        </div>
        <div className={style.reviewContent}>
            <div className={style.reviewRating}>
                <StarRating rating={props.review.comment.rating/5*100}/>
            </div>
            <div className={`${style.reviewDate} ${style.label}`}>
                {props.review.dateString}
            </div>
            <div className={style.reviewTitle}>
                {props.review.comment.commentTitle}
            </div>
            <p className={style.reviewBody}>
                {props.review.comment.commentBody}
            </p>
        </div>
        <div className={style.reviewPhotos}>
            <img src={props.review.image[0]} />
            <div className={style.reviewPhotosOverlay}>
                <span>View Photos ({props.review.image.length})</span>
            </div>
        </div>
    </div>
); 

ReviewListEntry.propTypes = {
    review: PropTypes.object,
  };

export default ReviewListEntry;