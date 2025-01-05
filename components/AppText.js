import React from 'react';
import { Text } from 'react-native';

export const AppText = (props) => {
  return <Text {...props} style={[props.style, { fontFamily: 'Solitreo-Regular' }]} />;
};
