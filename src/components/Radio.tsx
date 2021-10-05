import * as React from 'react';
import {RadioOuter, RadioInner} from './styled';

const Radio = ({selected}: {selected: boolean}) => {
  return <RadioOuter>{selected && <RadioInner />}</RadioOuter>;
};

export default Radio;
