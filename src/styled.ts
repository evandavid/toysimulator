import {Text, View} from 'react-native';
import styled from 'styled-components';

const Content = styled(View)`
  position: relative;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const Wrapper = styled(View)`
  flex: 1;
`;

const Col = styled(View)`
  flex: 1;
  padding: 6px;
`;

const IOContainer = styled(View)`
  margin-top: 12px;
  width: 100%;
  min-height: 100px;
  background-color: #e6e6e6;
  border-radius: 6px;
  padding: 6px;
`;

const IOScreen = styled(View)`
  margin-top: 6px;
  width: 100%;
  min-height: 60px;
  background-color: #212121;
  border-radius: 6px;
  padding: 6px;
  margin-bottom: 12px;
`;

const AsButton = styled(View)<{disabled?: boolean}>`
  background: ${props => (props.disabled ? '#bbb' : '#a4c936')};
  padding: 6px 12px;
  flex: 1;
  margin: 3px 6px;
  border-radius: 3px;
`;

const ExecuteButton = styled(AsButton)<{disabled?: boolean}>`
  background: ${props => (props.disabled ? '#bbb' : '#61DAFB')};
`;

const ButtonText = styled(Text)`
  color: #fff;
`;

export {
  Content,
  Row,
  Wrapper,
  IOScreen,
  Col,
  AsButton,
  ButtonText,
  IOContainer,
  ExecuteButton,
};
