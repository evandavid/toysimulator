import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Row, AsButton, ButtonText} from '../styled';

type ActionsProps = {
  onAddPlace: () => void;
  onAddMove: () => void;
  onAddLeft: () => void;
  onAddRight: () => void;
  onAddReport: () => void;
  onClear: () => void;
  validForOtherAction: boolean;
};

const Actions = ({
  onAddPlace,
  onAddMove,
  onAddLeft,
  onAddRight,
  onAddReport,
  onClear,
  validForOtherAction,
}: ActionsProps) => {
  return (
    <View style={{height: 105}}>
      <Row>
        <TouchableWithoutFeedback onPress={onAddPlace}>
          <AsButton>
            <ButtonText>PLACE</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={onAddMove}
          disabled={!validForOtherAction}>
          <AsButton disabled={!validForOtherAction}>
            <ButtonText>MOVE</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
      </Row>
      <Row>
        <TouchableWithoutFeedback
          onPress={onAddLeft}
          disabled={!validForOtherAction}>
          <AsButton disabled={!validForOtherAction}>
            <ButtonText>LEFT</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={onAddRight}
          disabled={!validForOtherAction}>
          <AsButton disabled={!validForOtherAction}>
            <ButtonText>RIGHT</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
      </Row>
      <Row>
        <TouchableWithoutFeedback
          onPress={onAddReport}
          disabled={!validForOtherAction}>
          <AsButton disabled={!validForOtherAction}>
            <ButtonText>REPORT</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onClear}>
          <AsButton style={{backgroundColor: '#3D5866'}}>
            <ButtonText>CLEAR</ButtonText>
          </AsButton>
        </TouchableWithoutFeedback>
      </Row>
    </View>
  );
};

export default Actions;
