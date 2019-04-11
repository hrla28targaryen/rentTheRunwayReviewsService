import React from 'react';
import { shallow } from 'enzyme';
import HOC from '../HOC.jsx';
describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<HOC />);
    });
});