/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import {Modal, TouchableWithoutFeedback, View, Text} from 'react-native';
import {ExecuteButton, ButtonText, Row} from '../styled';
import {ROBOT_POSITION} from '../util';
import Radio from './Radio';
import {
  PlaceFormContainer,
  PlaceFormOuterContainer,
  Overlay,
  Input,
  Label,
} from './styled';

type PlaceFormProps = {
  visible: boolean;
  onRequestClose: () => void;
  onSubmit: (data: ROBOT_POSITION) => void;
};

const PlaceForm = ({visible, onRequestClose, onSubmit}: PlaceFormProps) => {
  const [form, setForm] = useState<ROBOT_POSITION>({
    col: 0,
    row: 0,
    f: 'SOUTH',
  });

  const onExecute = () => {
    onSubmit(form);
  };

  useEffect(() => {
    if (!visible) {
      /** reset form */
      setForm({
        col: 0,
        row: 0,
        f: 'SOUTH',
      });
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
      <PlaceFormOuterContainer>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <Overlay />
        </TouchableWithoutFeedback>

        <PlaceFormContainer>
          <View>
            <Label>X (Col)</Label>
            <Input
              placeholder="X value"
              keyboardType="number-pad"
              value={String(form.col)}
              onChangeText={value => {
                const numberValue = parseInt(value);
                if (isNaN(numberValue)) {
                  setForm({...form, col: 0});
                  return;
                }
                if (numberValue < 5) {
                  setForm({...form, col: numberValue});
                }
              }}
            />
          </View>
          <View>
            <Label>Y (Row)</Label>
            <Input
              placeholder="Y value"
              keyboardType="number-pad"
              value={String(form.row)}
              onChangeText={value => {
                const numberValue = parseInt(value);
                if (isNaN(numberValue)) {
                  setForm({...form, row: 0});
                  return;
                }
                if (numberValue < 5) {
                  setForm({...form, row: numberValue});
                }
              }}
            />
          </View>
          <View style={{margin: 12, marginBottom: 0}}>
            <Row>
              <TouchableWithoutFeedback
                onPress={() => {
                  setForm({...form, f: 'NORTH'});
                }}>
                <Row style={{flex: 1, marginTop: 6}}>
                  <Radio selected={form.f === 'NORTH'} />
                  <Text style={{color: '#212121'}}>NORTH</Text>
                </Row>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setForm({...form, f: 'EAST'});
                }}>
                <Row style={{flex: 1, marginTop: 6}}>
                  <Radio selected={form.f === 'EAST'} />
                  <Text style={{color: '#212121'}}>EAST</Text>
                </Row>
              </TouchableWithoutFeedback>
            </Row>
            <Row>
              <TouchableWithoutFeedback
                onPress={() => {
                  setForm({...form, f: 'WEST'});
                }}>
                <Row style={{flex: 1, marginTop: 6}}>
                  <Radio selected={form.f === 'WEST'} />
                  <Text style={{color: '#212121'}}>WEST</Text>
                </Row>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setForm({...form, f: 'SOUTH'});
                }}>
                <Row style={{flex: 1, marginTop: 6}}>
                  <Radio selected={form.f === 'SOUTH'} />
                  <Text style={{color: '#212121'}}>SOUTH</Text>
                </Row>
              </TouchableWithoutFeedback>
            </Row>
          </View>
          <View
            style={{
              height: 36,
              marginTop: 12,
              marginLeft: 6,
              marginRight: 6,
            }}>
            <TouchableWithoutFeedback onPress={onExecute}>
              <ExecuteButton>
                <ButtonText>SAVE</ButtonText>
              </ExecuteButton>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              height: 36,
              marginLeft: 6,
              marginRight: 6,
            }}>
            <TouchableWithoutFeedback onPress={onRequestClose}>
              <ExecuteButton style={{backgroundColor: '#3D5866'}}>
                <ButtonText>CANCEL</ButtonText>
              </ExecuteButton>
            </TouchableWithoutFeedback>
          </View>
        </PlaceFormContainer>
      </PlaceFormOuterContainer>
    </Modal>
  );
};

export default PlaceForm;
