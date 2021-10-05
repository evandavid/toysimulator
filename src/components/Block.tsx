import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

const BlockWrapper = styled(View)<{color?: string; height: number}>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
`;

type BlockProps = {
  index: number;
  height: number;
};

const Block = ({index, height}: BlockProps) => {
  const colors = [
    '#FFB6E8',
    '#FF9CEE',
    '#FFCCF9',
    '#FCC2FF',
    '#F6A6FF',
    '#B28DFF',
    '#C5A3FF',
    '#D5AAFF',
    '#ECD4FF',
    '#FBE4FF',
    '#DCD3FF',
    '#A79AFF',
    '#B5B9FF',
    '#97A2FF',
    '#AFCBFF',
    '#AFF8D8',
    '#C4FAF8',
    '#85E3FF',
    '#ACE7FF',
    '#6EB5FF',
    '#FFC9DE',
    '#DBFFD6',
    '#F3FFE3',
    '#E7FFAC',
    '#FFFFD1',
  ];

  return <BlockWrapper height={height} color={colors[index]} />;
};

export default Block;
