import React from 'react';
import {View} from 'react-native';
import {ROBOT_POSITION} from '../util';
import {CommandText} from './styled';

const OutputView = ({data}: {data: ROBOT_POSITION[]}) => {
  return (
    <View>
      {data.map((datum, index) => (
        <View key={'command' + index}>
          <CommandText>
            {'>>'} {`Y:${datum.row}, X:${datum.col}, ${datum.f}`}
          </CommandText>
        </View>
      ))}
    </View>
  );
};

export default OutputView;
