import React from 'react';
import StarRating from '../StarRating/StarRating.jsx';
import style from './Summary.scss';

class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var largeSizeBar = this.props.fit.large/this.props.numberOfReviews*100;
        var trueSizeBar = this.props.fit.trueToSize/this.props.numberOfReviews*100;
        var smallSizeBar = this.props.fit.small/this.props.numberOfReviews*100;
        
        return(
            <div className={style.summaryContainer}>
                <div className={style.totalContainer}>
                    <div className={style.totalReviews}>
                        <h2 className={style.totalReviewsTitle}> {this.props.numberOfReviews} reviews</h2>
                        <StarRating rating={this.props.averageRatings/5*100}/>
                    </div>
                    <div className={style.totalFits}>
                        <p className={style.totalFitsTitle}>Fit</p>
                        <table className={style.totalFitsCounter}>
                            <tbody>
                                <tr className={style.fitRow}>
                                    <td className={style.fitLabel}>Large</td>
                                    <td className={style.fitBar}>
                                        <div className={style.fitBarBackground}>
                                            <div className={style.fitBarHighlight} style={{width:`${largeSizeBar}px`}}></div>
                                        </div>
                                    </td>
                                    <td className={style.fitCount}>({this.props.fit.large})</td>
                                </tr>
                                <tr className={style.fitRow}>
                                    <td className={style.fitLabel}>True To Size</td>
                                    <td className={style.fitBar}>
                                        <div className={style.fitBarBackground}>
                                            <div className={style.fitBarHighlight} style={{width:`${trueSizeBar}px`}}></div>
                                        </div>
                                    </td>
                                    <td className={style.fitCount}>({this.props.fit.trueToSize})</td>
                                </tr>
                                <tr className={style.fitRow}>
                                    <td className={style.fitLabel}>Small</td>
                                    <td className={style.fitBar}>
                                        <div className={style.fitBarBackground}>
                                            <div className={style.fitBarHighlight} style={{width:`${smallSizeBar}px`}} ></div>
                                        </div>
                                    </td>
                                    <td className={style.fitCount}>({this.props.fit.small})</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.totalPhotos}>
                        <div className={style.totalPhotosTitle}>Photos</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;