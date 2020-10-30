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
      style={{ backgroundColor: props.theme.colors.surface }}
      clearButtonMode="always"
    />
  )
}), (prevProps, nextProps) => _.isEqual(prevProps, nextProps));


interface InputProps extends TextInputProps {
  label?: string;
  errors?: Record<string, Object>;
  name?: string;
}
export const InputForrward = React.forwardRef<any, InputProps>(
  (props, ref): React.ReactElement => {
    const {label, errors, name, ...inputProps} = props;

    return (
      <RN.View>
        {/* {label && <Text>{label}</Text>} */}
        <Paper.TextInput
          key={name}
          autoCapitalize="none"
          ref={ref}
          onChangeText={(value) => inputProps.onChangeText(value)}
          {...inputProps}
        />
        {errors?.message && <Paper.HelperText type="error">{errors?.message}</Paper.HelperText>}
      </RN.View>
    );
  },
);