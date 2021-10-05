import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Actions from './components/Actions';
import Block from './components/Block';
import CommandListView from './components/CommandListView';
import Robot, {
  RobotFacing,
  SCALE,
  IMAGE_PADDING,
  MOVE_DURATION,
} from './components/Robot';
import {
  Content,
  Wrapper,
  Row,
  IOScreen,
  Col,
  ButtonText,
  IOContainer,
  ExecuteButton,
} from './styled';
import {
  ACTION,
  ACTIONS,
  calculateBlockCenterPositions,
  chunk,
  isValidOtherAction,
  isValidToExecute,
} from './util';

const CONTAINER_PADDING = 12;
const screenWidth = Dimensions.get('window').width;

const App = () => {
  const arrayBlock = new Array(5).fill(1);
  const blockWidth = screenWidth / arrayBlock.length;
  const imageSize = blockWidth * SCALE;
  const imageContainerSize = imageSize + CONTAINER_PADDING;

  const [executing, setExecuting] = useState<boolean>(false);
  const [robotFacing, setRobotFacing] = useState<RobotFacing>('EAST');
  const [currentPosition, setCurrentPosition] = useState({row: 0, col: 0});
  const [commands, setCommands] = useState<ACTIONS>([]);

  const onAddPlace = () => {
    setCommands([
      ...commands,
      {
        type: 'PLACE',
        extraData: {
          row: 0,
          col: 0,
          f: 'WEST',
        },
      },
    ]);
  };

  const onBasicAction = (type: ACTION) => {
    setCommands([
      ...commands,
      {
        type,
      },
    ]);
  };

  const onAddMove = () => {
    onBasicAction('MOVE');
  };

  const onAddLeft = () => {
    onBasicAction('LEFT');
  };

  const onAddRight = () => {
    onBasicAction('RIGHT');
  };

  const onAddReport = () => {
    onBasicAction('REPORT');
  };

  const onClear = () => {
    setCommands([]);
  };

  const onExecute = async () => {};

  useEffect(() => {
    setTimeout(() => {
      setCurrentPosition({col: 4, row: 4});
      setTimeout(() => {
        setRobotFacing('WEST');
      }, MOVE_DURATION);
    }, 1000);
  }, []);

  const allPosition = calculateBlockCenterPositions(
    blockWidth,
    imageContainerSize,
  );
  const matrixPosition = chunk(allPosition, 5).reverse();
  const validForOtherAction = isValidOtherAction(commands);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
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
          <Row>
            <Col>
              <IOContainer>
                <Text>Commands</Text>
                <IOScreen>
                  <CommandListView commands={commands} />
                </IOScreen>
                <Actions
                  onAddPlace={onAddPlace}
                  onAddMove={onAddMove}
                  onAddLeft={onAddLeft}
                  onAddRight={onAddRight}
                  onAddReport={onAddReport}
                  onClear={onClear}
                  validForOtherAction={validForOtherAction}
                />
              </IOContainer>
              <View style={{width: 120, marginTop: 12, height: 36}}>
                <TouchableWithoutFeedback
                  onPress={onExecute}
                  disabled={executing || !isValidToExecute(commands)}>
                  <ExecuteButton
                    disabled={executing || !isValidToExecute(commands)}>
                    <ButtonText>EXECUTE</ButtonText>
                  </ExecuteButton>
                </TouchableWithoutFeedback>
              </View>
            </Col>
            <Col>
              <IOContainer>
                <Text>Output</Text>
                <IOScreen></IOScreen>
              </IOContainer>
            </Col>
          </Row>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
