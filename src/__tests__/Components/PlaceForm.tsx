import React from 'react';
import renderer from 'react-test-renderer';
import PlaceForm from '../../components/PlaceForm';
import {render, fireEvent} from '@testing-library/react-native';

beforeEach(() => {
  jest.useFakeTimers();
});

it('renders correctly', () => {
  const tree = renderer
    .create(
      <PlaceForm visible={false} onRequestClose={jest.fn} onSubmit={jest.fn} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();

  const tree1 = renderer
    .create(
      <PlaceForm visible={true} onRequestClose={jest.fn} onSubmit={jest.fn} />,
    )
    .toJSON();
  expect(tree1).toMatchSnapshot();
});

it('handle onSubmit correctly', () => {
  const onPressSubmitMock = jest.fn();
  const {getByText} = render(
    <PlaceForm
      visible={false}
      onRequestClose={jest.fn}
      onSubmit={onPressSubmitMock}
    />,
  );

  fireEvent.press(getByText('SAVE'));
  expect(onPressSubmitMock).toHaveBeenCalled();

  // return default value
  expect(onPressSubmitMock).toHaveBeenCalledWith({col: 0, row: 0, f: 'SOUTH'});
});

it('handle X input change correctly', () => {
  const onPressSubmitMock = jest.fn();
  const {getByText, getByPlaceholderText} = render(
    <PlaceForm
      visible={false}
      onRequestClose={jest.fn}
      onSubmit={onPressSubmitMock}
    />,
  );
  fireEvent.changeText(getByPlaceholderText('X value'), 1);
  fireEvent.press(getByText('SAVE'));
  expect(onPressSubmitMock).toHaveBeenCalled();
  expect(onPressSubmitMock).toHaveBeenCalledWith({col: 1, row: 0, f: 'SOUTH'});
});

it('handle Y input change correctly', () => {
  const onPressSubmitMock = jest.fn();
  const {getByText, getByPlaceholderText} = render(
    <PlaceForm
      visible={false}
      onRequestClose={jest.fn}
      onSubmit={onPressSubmitMock}
    />,
  );
  fireEvent.changeText(getByPlaceholderText('Y value'), 1);
  fireEvent.press(getByText('SAVE'));
  expect(onPressSubmitMock).toHaveBeenCalled();
  expect(onPressSubmitMock).toHaveBeenCalledWith({col: 0, row: 1, f: 'SOUTH'});
});

it('handle F  change correctly', () => {
  const onPressSubmitMock = jest.fn();
  const {getByText} = render(
    <PlaceForm
      visible={false}
      onRequestClose={jest.fn}
      onSubmit={onPressSubmitMock}
    />,
  );
  fireEvent.press(getByText('EAST'));
  fireEvent.press(getByText('SAVE'));
  expect(onPressSubmitMock).toHaveBeenCalled();
  expect(onPressSubmitMock).toHaveBeenCalledWith({col: 0, row: 0, f: 'EAST'});
});
