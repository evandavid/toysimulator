import React, {useRef, useEffect} from 'react';
import {Image as RNImage, View, Animated} from 'react-native';
import styled from 'styled-components';

export const SCALE = 0.6;
export const IMAGE_PADDING = 24;
export const MOVE_DURATION = 500;
const IMAGE_TOTAL = 4;

const ImageContainer = styled(Animated.View)<{
  size: number;
  parentPosition: {x: number; y: number};
}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: absolute;
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
  const containerRef = useRef<View>(null);
  const left = useRef(new Animated.Value(parentPosition.x)).current;
  const top = useRef(new Animated.Value(parentPosition.y)).current;
  const duration = MOVE_DURATION;

  const position = {
    NORTH: -totalImageSizeWithPadding * 3,
    EAST: -totalImageSizeWithPadding,
    WEST: -totalImageSizeWithPadding * 2,
    SOUTH: 0,
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: parentPosition.x,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(top, {
        toValue: parentPosition.y,
        duration,
        useNativeDriver: false,
      }),
    ]).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPosition]);

  return (
    <ImageContainer
      style={{left, top}}
      ref={containerRef}
      parentPosition={parentPosition}
      size={imageContainerSize}>
      <Image
        marginTop={position[facing]}
        size={imageSize}
        source={require('../../assets/i-robot.png')}
      />
    </ImageContainer>
  );
};

export default Robot;
