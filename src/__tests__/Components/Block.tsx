import React from 'react';
import renderer from 'react-test-renderer';
import Block from '../../components/Block';

it('renders correctly', () => {
  const tree = renderer.create(<Block index={1} height={60} />).toJSON();
  expect(tree).toMatchSnapshot();
});
