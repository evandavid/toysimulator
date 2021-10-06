import React from 'react';
import renderer from 'react-test-renderer';
import Output from '../../components/Output';

it('renders correctly', () => {
  const tree = renderer
    .create(<Output data={[{col: 0, row: 0, f: 'EAST'}]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
