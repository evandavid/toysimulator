import React from 'react';
import renderer from 'react-test-renderer';
import Radio from '../../components/Radio';

it('renders correctly', () => {
  const tree = renderer.create(<Radio selected />).toJSON();
  expect(tree).toMatchSnapshot();

  const tree1 = renderer.create(<Radio selected={false} />).toJSON();
  expect(tree1).toMatchSnapshot();
});
