import {View, Image as RNImage, Animated} from 'react-native';
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

export {ImageContainer, Image, BlockWrapper};
