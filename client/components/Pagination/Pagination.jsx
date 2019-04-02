import React from 'react';
import PropTypes from 'prop-types';
import style from './Pagination.scss';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.gotoPage = this.gotoPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage(page) {
    const currentPage = Math.max(0, Math.min(page, this.props.totalPages));
    const paginationData = {
      currentPage: currentPage,
      totalPages: this.props.totalPages,
      pageLimit: this.props.pageLimit,
    };
    this.props.onPageChanged(paginationData);
  }

  handleClick(page, e) {
    e.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft(e) {
    e.preventDefault();
    this.gotoPage(this.props.currentPage-1);
  }

  handleMoveRight(e) {
    e.preventDefault();
    this.gotoPage(this.props.currentPage+1);
  }

  render() {
    if (!this.props.currentReviews || this.props.totalPages === 1) return null;
    return (
        <nav className={style.reviewPagination}>
          <div className={style.paginationDescription}>See more reviews:</div>
            <div className={style.paginationNavigation}>
              <button className={`${style.paginationNav} ${style.paginationPrev}`} disabled={this.props.currentPage === 1} onClick={this.handleMoveLeft} >Prev</button>
                {this.props.currentPage} / {this.props.totalPages}
              <button className={`${style.paginationNav} ${style.paginationNext}`} disabled={this.props.currentPage === this.props.totalPages} onClick={this.handleMoveRight} >Next</button>
          </div>
        </nav>
    );
  }
}

Pagination.propTypes = {
  currentReviews: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;