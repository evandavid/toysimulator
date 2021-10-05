import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {ImageContainer, Image, MOVE_DURATION} from './styled';

type _RobotFacing = 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';

type RobotProps = {
  imageSize: number;
  imageContainerSize: number;
  totalImageSizeWithPadding: number;
  facing: _RobotFacing;
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
export {SCALE, IMAGE_PADDING, MOVE_DURATION} from './styled';
export type RobotFacing = _RobotFacing;
