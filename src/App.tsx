import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import styled from 'styled-components';
import Block from './components/Block';
import Robot, {
  RobotFacing,
  SCALE,
  IMAGE_PADDING,
  MOVE_DURATION,
} from './components/Robot';
import {calculateBlockCenterPositions, chunk} from './util';

const CONTAINER_PADDING = 12;

const Content = styled(View)`
  position: relative;
`;

const Row = styled(View)`
  flex-direction: row;
  padding: 0 1px;
`;

const Wrapper = styled(View)`
  flex: 1;
`;

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const arrayBlock = new Array(5).fill(1);
  const blockWidth = screenWidth / arrayBlock.length;
  const imageSize = blockWidth * SCALE;
  const imageContainerSize = imageSize + CONTAINER_PADDING;

  const [robotFacing, setRobotFacing] = useState<RobotFacing>('EAST');
  const [currentPosition, setCurrentPosition] = useState({row: 0, col: 0});

  const allPosition = calculateBlockCenterPositions(
    blockWidth,
    imageContainerSize,
  );

  const matrixPosition = chunk(allPosition, 5).reverse();

  useEffect(() => {
    setTimeout(() => {
      setCurrentPosition({col: 4, row: 4});
      setTimeout(() => {
        setRobotFacing('WEST');
      }, MOVE_DURATION);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Content>
          {arrayBlock.map((_, rowIndex) => (
            <Row key={rowIndex}>
              {arrayBlock.map((__, colIndex) => (
                <Wrapper key={`${rowIndex}-${colIndex}`}>
                  <Block
                    height={blockWidth}
                    index={rowIndex * arrayBlock.length + colIndex}
                  />
                </Wrapper>
              ))}
            </Row>
          ))}

          <Robot
            facing={robotFacing}
            imageSize={imageSize}
            imageContainerSize={imageContainerSize}
            totalImageSizeWithPadding={imageSize + IMAGE_PADDING * SCALE}
            parentPosition={
              matrixPosition[currentPosition.row][currentPosition.col]
            }
          />
        </Content>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
