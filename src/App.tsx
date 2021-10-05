/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import OutputView from './components/Output';
import PlaceForm from './components/PlaceForm';
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
  ROBOT_POSITION,
  calculateBlockCenterPositions,
  chunk,
  isEqual,
  isValidAction,
  isValidOtherAction,
  isValidToExecute,
  getNextMovePosition,
} from './util';

const CONTAINER_PADDING = 12;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const App = () => {
  const arrayBlock = new Array(5).fill(1);
  const blockWidth = screenWidth / arrayBlock.length;
  const imageSize = blockWidth * SCALE;
  const imageContainerSize = imageSize + CONTAINER_PADDING;

  const [executing, setExecuting] = useState<boolean>(false);
  const [showPlaceForm, setPlaceForm] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<ROBOT_POSITION>({
    row: 0,
    col: 0,
    f: 'SOUTH',
  });
  const [output, setOutput] = useState<ROBOT_POSITION[]>([]);
  const [commands, setCommands] = useState<ACTIONS>([]);

  const onAddPlace = () => {
    setPlaceForm(true);
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

  const onExecute = async () => {
    if (executing) {
      return;
    }
    setOutput([]);
    setExecuting(true);

    let holder: ROBOT_POSITION = currentPosition;

    for (let command of commands) {
      const validAction = isValidAction(
        command.type,
        holder,
        command?.extraData,
      );
      if (validAction) {
        switch (command.type) {
          case 'PLACE':
            if (
              command.extraData &&
              !isEqual(command.extraData, currentPosition)
            ) {
              holder = command.extraData;
              setCurrentPosition(holder);
              await new Promise(resolve => {
                setTimeout(() => {
                  resolve(true);
                }, MOVE_DURATION);
              });
            }
            break;
          case 'MOVE':
            holder = getNextMovePosition(holder);
            setCurrentPosition(holder);
            await new Promise(resolve => {
              setTimeout(() => {
                resolve(true);
              }, MOVE_DURATION);
            });

            break;
          case 'LEFT':
          case 'RIGHT':
            let changeFacing: {[key: string]: RobotFacing} = {
              NORTH: 'WEST',
              WEST: 'SOUTH',
              SOUTH: 'EAST',
              EAST: 'NORTH',
            };

            if (command.type === 'RIGHT') {
              changeFacing = {
                NORTH: 'EAST',
                EAST: 'SOUTH',
                SOUTH: 'WEST',
                WEST: 'NORTH',
              };
            }

            holder = {
              ...holder,
              f: changeFacing[holder.f],
            };

            setCurrentPosition(holder);
            break;
          case 'REPORT':
            setOutput(o => [...o, holder]);
            break;
        }
      }
    }

    onClear();
    setExecuting(false);
  };

  const allPosition = calculateBlockCenterPositions(
    blockWidth,
    imageContainerSize,
  );
  const matrixPosition = chunk(allPosition, 5).reverse();
  const validForOtherAction = isValidOtherAction(commands);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{backgroundColor: '#fff', minHeight: screenHeight}}>
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
              facing={currentPosition.f}
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
                <Text style={{color: ' #212121'}}>Commands</Text>
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
                <Text style={{color: ' #212121'}}>Output</Text>
                <IOScreen>
                  <OutputView data={output} />
                </IOScreen>
              </IOContainer>
            </Col>
          </Row>
        </View>
      </ScrollView>
      <PlaceForm
        visible={showPlaceForm}
        onRequestClose={() => {
          setPlaceForm(false);
        }}
        onSubmit={extraData => {
          setCommands(o => [...o, {type: 'PLACE', extraData}]);
          setPlaceForm(false);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
