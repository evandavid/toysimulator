import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Row, AsButton, ButtonText} from '../styled';

type ActionsProps = {
  onAddPlace: () => void;
  onAddMove: () => void;
  onAddLeft: () => void;
  onAddRight: () => void;
  onAddReport: () => void;
  validForOtherAction: boolean;
};

const Actions = ({
  onAddPlace,
  onAddMove,
  onAddLeft,
  onAddRight,
  onAddReport,
  validForOtherAction,
}: ActionsProps) => {
  return (
    <View>
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
      <TouchableWithoutFeedback
        onPress={onAddReport}
        disabled={!validForOtherAction}>
        <AsButton disabled={!validForOtherAction}>
          <ButtonText>REPORT</ButtonText>
        </AsButton>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Actions;
