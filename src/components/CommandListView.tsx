import React from 'react';
import {View} from 'react-native';
import {ACTIONS} from '../util';
import {CommandText} from './styled';

const CommandListView = ({commands}: {commands: ACTIONS}) => {
  return (
    <View>
      {commands.map((command, index) => (
        <View key={'command' + index}>
          <CommandText>
            {'>>'} {command.type}{' '}
            {command.extraData
              ? `${command.extraData.row}, ${command.extraData.col}, ${command.extraData.f}`
              : ''}
          </CommandText>
        </View>
      ))}
    </View>
  );
};

export default CommandListView;
