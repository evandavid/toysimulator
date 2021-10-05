import React from 'react';
import {Image as RNImage, View} from 'react-native';
import styled from 'styled-components';

export const SCALE = 0.6;
export const IMAGE_PADDING = 24;
const IMAGE_TOTAL = 4;

const ImageContainer = styled(View)<{
  size: number;
  parentPosition: {x: number; y: number};
}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;

  left: ${props => props.parentPosition.x}px;
  top: ${props => props.parentPosition.y}px;
`;

const Image = styled(RNImage)<{size: number; marginTop: number}>`
  width: ${props => props.size}px;
  height: ${props => (props.size + IMAGE_PADDING * SCALE) * IMAGE_TOTAL}px;
  margin-top: ${props => props.marginTop}px;
`;

export type RobotFacing = 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';

type RobotProps = {
  imageSize: number;
  imageContainerSize: number;
  totalImageSizeWithPadding: number;
  facing: RobotFacing;
  parentPosition: {
    x: number;
    y: number;
  };
};

const Robot = ({
  facing,
  imageSize,
  imageContainerSize,
  totalImageSizeWithPadding,
  parentPosition,
}: RobotProps) => {
  const position = {
    NORTH: -totalImageSizeWithPadding * 3,
    EAST: -totalImageSizeWithPadding,
    WEST: -totalImageSizeWithPadding * 2,
    SOUTH: 0,
  };

  return (
    <ImageContainer parentPosition={parentPosition} size={imageContainerSize}>
      <Image
        marginTop={position[facing]}
        size={imageSize}
        source={require('../../assets/i-robot.png')}
      />
    </ImageContainer>
  );
};

export default Robot;
