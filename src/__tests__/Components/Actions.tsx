import React from 'react';
import renderer from 'react-test-renderer';
import Actions from '../../components/Actions';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Actions
        onAddMove={jest.fn}
        onAddLeft={jest.fn}
        onAddRight={jest.fn}
        onAddReport={jest.fn}
        onAddPlace={jest.fn}
        onClear={jest.fn}
        validForOtherAction={false}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();

  const tree2 = renderer
    .create(
      <Actions
        onAddMove={jest.fn}
        onAddLeft={jest.fn}
        onAddRight={jest.fn}
        onAddReport={jest.fn}
        onAddPlace={jest.fn}
        onClear={jest.fn}
        validForOtherAction={true}
      />,
    )
    .toJSON();
  expect(tree2).toMatchSnapshot();
});
