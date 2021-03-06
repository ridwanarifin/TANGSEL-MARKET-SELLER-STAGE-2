import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import baseStyle from '../../styles';
import { SignUpScreenRouteProp, SignUpScreenNavigationProp } from '../../types';
import InputField from '../../components/InputField';
import { setProfilSignUp } from '../../redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from '../../redux/authSlice';
import { getAsyncAuth } from '../../api/get';
import { deleteUserLogout } from '../../api/delete';
import { useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/rootReducer';

type SignUpProp = {
  route?: SignUpScreenRouteProp
  navigation?: SignUpScreenNavigationProp
}

type DataFormType = {
  email?: string
  nik?: string
  fullname?: string
  password?: string
  rePassword?: string
}
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpScreen: React.FC<SignUpProp> =
(props): JSX.Element => {
  const [tcChecked, setTcChecked] = React.useState(false);
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  const {
      handleSubmit,
      control,
      errors,
      watch
    } = useForm({
      defaultValues: {
        email: "", nik: "", fullname: "", password: "", rePassword: ""
      }
    });

  const _onSubmit = (formData: DataFormType) => {
    console.log('formData', formData);
    const { fullname, nik } = formData;
    if (!Object.keys(errors).length && formData && tcChecked) {
      dispatch(setProfilSignUp({ email: formData.email, nik: formData.nik, name: formData.fullname, password: formData.password }))
      props.navigation.navigate('BiodataSignUpScreen', { fullname, nik })
    }
  }
  console.log('errors', errors)
  const { colors, fonts } = Paper.useTheme();

  return (
    <SafeAreaView style={baseStyle.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboard__wrapper}>
        <RN.View>
          <Paper.Headline style={[styles.headline, {...fonts.medium}]}>Daftar</Paper.Headline>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "This is required.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email address."
                }
              }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    onChangeText={text => params.onChange(text)}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    clearTextOnFocus
                    dense
                  />
                  {errors.email && <Paper.HelperText type="error"> {errors.email.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="nik"
              control={control}
              rules={{
                required: "This is required.",
                maxLength: {
                  value: 16,
                  message: "NIK contain max 16 digit number."
                },
                pattern: {
                  value: /^\d/,
                  message: 'This input is number only.',
                }
              }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    onChangeText={text => params.onChange(text)}
                    label="NIK Tangerang Selatan"
                    keyboardType="decimal-pad"
                    right={() => <MaterialCommunityIcons name="check" />}
                    dense
                  />
                  {errors.nik && <Paper.HelperText type="error"> {errors.nik.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="fullname"
              control={control}
              rules={{required: "This is required."}}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    onChangeText={text => params.onChange(text)}
                    label="Nama Lengkap Sesuai KTP"
                    dense
                  />
                  {errors.fullname && <Paper.HelperText type="error"> {errors.fullname.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="password"
              control={control}
              rules={{required: "This is required."}}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    onChangeText={text => params.onChange(text)}
                    label="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    dense
                  />
                  {errors.password && <Paper.HelperText type="error"> {errors.password.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="rePassword"
              control={control}
              rules={{
                required: "This is required.",
                validate: (val) => val === watch('password') || "Password mismatch"
              }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    onChangeText={text => params.onChange(text)}
                    label="Ketik Ulang Password"
                    autoCapitalize="none"
                    secureTextEntry
                    dense
                  />
                  {errors.rePassword && <Paper.HelperText type="error"> {errors.rePassword.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.terms_conditions_container}>
            <Paper.Checkbox
              status={tcChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setTcChecked(!tcChecked);
              }}
            />
            <Paper.Text style={styles.terms_conditions}>
              Dengan mendaftarkan akun ini berarti anda telah
              <Paper.Text
                style={{color: colors.link }}
                children=" menyetujui syarat"
                /> dan
              <Paper.Text
                style={{color: colors.link }}
                children=" ketentuan"
              /> yang berlaku.
            </Paper.Text>
          </RN.View>

          <Paper.Button
            // disabled={disabledBtn}
            color={colors.link}
            mode="contained"
            style={styles.btn__daftar}
            labelStyle={{...fonts.medium}}
            uppercase
            onPress={handleSubmit(_onSubmit)}>
            Daftar
          </Paper.Button>

          <RN.View style={styles.footer__wrapper}>
            <Paper.Subheading>
              Sudah Punya Akun?
            </Paper.Subheading>
            <Paper.TouchableRipple borderless onPress={() => props.navigation.navigate('LoginScreen')}>
              <Paper.Subheading style={{color: colors.textLink, ...fonts.medium }}  children=" Masuk Disini" />
            </Paper.TouchableRipple>
          </RN.View>

          <Paper.Button onPress={async () => {
            await getAsyncAuth()
            .then(res => {
              console.log(res, '===== async storage auth ======')
            })
            .catch(err => { console.log(err) })
            await AsyncStorage.getItem('@user')
            .then(res => {
              console.log(res, '===== async storage user ====');
              console.log(auth);
              console.log(user);
            })
          }}>
            get
          </Paper.Button>
          <Paper.Button onPress={() => {
            AsyncStorage.clear();
          }}>Clear asyncstorage</Paper.Button>
          <Paper.Button onPress={() => {
            deleteUserLogout(dispatch)
          }}>Clear</Paper.Button>
        </RN.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default
//  React.memo(
  SignUpScreen
//   (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
// );

const styles = RN.StyleSheet.create({
  btn__daftar: {
    borderRadius: 25,
    marginVertical: 25,
    height: 40,
  },
  footer__wrapper: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  headline: { marginBottom: 25 },
  keyboard__wrapper: {
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  input_wrapper: { marginBottom: 9 },
  terms_conditions_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  terms_conditions: {
    paddingRight: 30,
    fontSize: 13
  }
})


{/* <Controller
  control={control}
  render={({ onChange, onBlur, value }) => (
    <InputField
      label="Email"
      value={value}
      onChangeText={(text) => onChange(text)}
      onBlur={onBlur}
      error={errors.email}
    />
  )}
  name="email"
  rules={{ required: "Email tidak boleh kosong.", validate: value => pattern.email.test(value) }}
  defaultValue=""
/>
{errors.email
&&
<ErrorMessage
  errors={errors}
  name="email"
  render={() =>
    <Paper.HelperText
      type="error"
      visible={errors.email}>
        Mohon masukan email yang valid.
  </Paper.HelperText>}
/>
} */}

{/* <InputField
  label="Email"
  value={value(email)}
  onChangeText={(text) => onChange(text, setEmail)}
/>

<InputField
  label="NIK Tangerang Selatan"
  value={value(nik)}
  onChangeText={text => onChange(text, setNik)}
/>

<InputField
  label="Nama Lengkap Sesuai KTP"
  value={value(fullname)}
  onChangeText={text => onChange(text, setFullname)}
/>

<InputField
  label="Password"
  value={value(password)}
  onChangeText={text => onChange(text, setPassword)}
/>

<InputField
  label="Ketik Ulang Password"
  value={value(rePassword)}
  onChangeText={text => onChange(text, setRePassword)}
/> */}
