import React from 'react';
import style from './ImageCarousel.scss';

class ImageCarousel extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            imagesGallery: this.props.imagesGallery,
            currentImages: [],
            imagesLimit: 5,
            currentImageSet: 1,
            totalImageSet: 1
        }

        this.gotoImageSet = this.gotoImageSet.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentDidMount() {
        var totalSets = Math.ceil(this.state.imagesGallery.length / this.state.imagesLimit);
        this.setState({ totalImageSet : totalSets }, () => {
            this.gotoImageSet(1);
        })
    }

    gotoImageSet(id) {
      const currentIndex = Math.max(0, Math.min(id, this.state.totalImageSet));
      this.setState({ currentImageSet : currentIndex }, () => {
        this.onImageChanged();
      })
    }
    
    handleMoveLeft(e) {
      e.preventDefault();
      this.gotoImageSet(this.state.currentImageSet-1);
    }

    handleMoveRight(e) {
      e.preventDefault();
      this.gotoImageSet(this.state.currentImageSet+1);
    }
    
    onImageChanged( ) {   
        const offset = (this.state.currentImageSet - 1) * this.state.imagesLimit;
        const currentImages = this.state.imagesGallery.slice(offset, offset + this.state.imagesLimit);   
        this.setState({ currentImages });
    }

    render() {
        return (
            <div className={style.carouselWrapper}>
                { (this.state.currentImageSet !== 1) && <div className={style.carouselArrowLeft}></div> }
                <div className={style.carouselReviews}>
                    <div className={style.carouselInner}>
                        <div className={style.currentImages}>
                            {
                                this.state.currentImages.map( image => {
                                    return (
                                        <div className={style.carouseImageWrapper}>
                                            <img className={style.carouselImage} src={image} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                { (this.state.currentImageSet !== this.state.totalImageSet) && <div className={style.carouselArrowRight}></div> }
            </div>
        );
    }
}

export default ImageCarousel;