import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import spy from 'sinon';

import Reviews from '../Reviews/Reviews.jsx';
import Summary from '../Summary/Summary.jsx';
import FilterSearch from '../FilterSearch/FilterSearch.jsx';
import ReviewsList from '../ReviewList/ReviewList.jsx';
import Pagination from '../Pagination/Pagination.jsx';

describe('Reviews test', () => {

  it('renders <Summary /> components', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find(Summary)).to.have.lengthOf(1);
  });

  it('renders <FilterSearch /> components', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find(FilterSearch)).to.have.lengthOf(1);
  });

  it('renders <ReviewsList /> components', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find(ReviewsList)).to.have.lengthOf(1);
  });

  it('renders <Pagination /> components', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find(Pagination)).to.have.lengthOf(1);
  });
});