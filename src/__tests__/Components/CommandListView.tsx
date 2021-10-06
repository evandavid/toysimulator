import React from 'react';
import renderer from 'react-test-renderer';
import CommandListView from '../../components/CommandListView';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <CommandListView
        commands={[{type: 'PLACE', extraData: {col: 0, row: 0, f: 'EAST'}}]}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
