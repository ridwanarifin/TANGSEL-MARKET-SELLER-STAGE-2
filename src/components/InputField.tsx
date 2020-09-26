import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';

export default React.memo(
  Paper.withTheme(function InputField (props: TextInputProps) {
  return (
    <Paper.TextInput
      {...props}
      mode="flat"
      clearButtonMode="while-editing"
    />
  )
}), (prevProps, nextProps) => _.isEqual(prevProps, nextProps));
