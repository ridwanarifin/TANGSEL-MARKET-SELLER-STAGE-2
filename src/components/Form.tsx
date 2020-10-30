import React, {useRef, useEffect} from 'react';
import {TextInput} from 'react-native';
interface ValidationMap {
  [key: string]: any;
}
interface ErrorMap {
  [key: string]: object | undefined;
}
interface Props {
  children: JSX.Element | JSX.Element[];
  register: ({name}: {name: string}, validation: any) => void;
  errors: ErrorMap;
  validation: ValidationMap;
  setValue: (name: string, value: any, config?: Object) => void;
  clearErrors: (name: string) => void;
}
export default ({
  register,
  errors,
  setValue,
  validation,
  children,
  clearErrors,
}: Props) => {
  const Inputs = useRef<Array<TextInput>>([]);
  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
      if (child.props.name)
        register({name: child.props.name}, validation[child.props.name]);
    });
  }, [register, children, validation]);
  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  ref: (e: TextInput) => {
                    Inputs.current[i] = e;
                  },
                  onChangeText: (v: string) => {
                    setValue(child.props.name, v, { shouldValidate:  true });
                    // clearErrors(child.props.name);
                  },
                  onSubmitEditing: () => {
                    Inputs.current[i + 1]
                      ? Inputs.current[i + 1].focus()
                      : Inputs.current[i].blur();
                  },
                  blurOnSubmit: false,
                  key: child.props.name,
                  errors: errors[child.props.name],
                },
              })
            : child;
        },
      )}
    </>
  );
};