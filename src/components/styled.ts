import {View, Image as RNImage, Animated, Text, TextInput} from 'react-native';
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

const BlockWrapper = styled(View)<{color?: string; height: number}>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
`;

const CommandText = styled(Text)`
  color: #fff;
  font-size: 12px;
`;

const PlaceFormOuterContainer = styled(View)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

const PlaceFormContainer = styled(View)`
  width: 300px;
  height: 300px;
  background: #fff;
  border-radius: 6px;
`;

const Overlay = styled(View)`
  background: rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Input = styled(TextInput)`
  height: 40px;
  margin: 0 12px;
  border-width: 1px;
  padding: 10px;
  border-color: #888;
  border-radius: 3px;
  color: #212121;
`;

const Label = styled(Text)`
  margin-left: 12px;
  margin-top: 12px;
  color: #212121;
`;

const RadioOuter = styled(View)`
  width: 16px;
  height: 16px;
  border: 1px solid #212121;
  border-radius: 8px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #212121;
`;

export {
  ImageContainer,
  Image,
  BlockWrapper,
  CommandText,
  PlaceFormContainer,
  PlaceFormOuterContainer,
  Overlay,
  Input,
  Label,
  RadioOuter,
  RadioInner,
};
