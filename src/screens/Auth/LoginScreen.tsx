import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../components/InputField';
import { LoginScreenNavigationProp, LoginScreenRouteProp } from '../../types';
import baseStyle from '../../styles';

import { RootState } from '../../redux/rootReducer';
import { postLoginMarket, postLogin } from '../../api/post';
import { getUserMe } from '../../api/get';
import { setAuth, setIsLogged } from '../../redux/authSlice';
import { setUser, setUserError } from '../../redux/userSlice';

type LoginProp = {
  route?: LoginScreenRouteProp
  navigation?: LoginScreenNavigationProp
}

type DataFormType = {
  email: string
  password: string
}
const LoginScreen: React.FC<LoginProp> = (props): JSX.Element => {
    const dispatch = useDispatch();
    const [isSubmiting, setSubmiting] = React.useState<boolean>(false);
    const auth = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.user);
    const { colors, fonts } = Paper.useTheme();

    const { errors, control, handleSubmit, watch } = useForm({
      defaultValues: {
        email: "r.arifin123@gmail.com", password: "arifin123"
      }
    });

    const _onSubmit = async (formData: DataFormType) => {
      setSubmiting(true);
      try {
        if (!_.keys(errors).length) {
          // props.navigation.navigate('Root');
          dispatch(postLoginMarket(formData));
        }
      } catch (error) {
        Toast.show(`Faled to login. ${error}`)
      } finally {
        setSubmiting(false)
      }
    };

    React.useEffect(() => {
      if (auth.access_token && !user.nik)
        dispatch(getUserMe());
    }, [auth.access_token]);


    return (
    <SafeAreaView style={baseStyle.container}>
      <KeyboardAwareScrollView>
        <RN.View>
          <Paper.Headline style={[styles.headline, {...fonts.medium}]}>Masuk</Paper.Headline>
          <Paper.Divider style={{marginTop: 74}} />
          <RN.View style={styles.input_wrapper}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "This is required.",
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    dense
                  />
                  {errors.email && <Paper.HelperText type="error"> {errors.email.message} </Paper.HelperText>}
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

          <Paper.TouchableRipple
            borderless
            style={styles.touchable} onPress={() => console.log('pressed 1')}>
            <Paper.HelperText type="info" style={[styles.text_forgot, { color: colors.link }]}>
              Lupa Password ?
            </Paper.HelperText>
          </Paper.TouchableRipple>

          <Paper.Button
            style={[baseStyle.btn, styles.btn]}
            mode="contained"
            color={colors.link}
            uppercase
            onPress={handleSubmit(_onSubmit)}
            disabled={isSubmiting}
            loading={isSubmiting}>
            Masuk
          </Paper.Button>

          <RN.View style={styles.footer_wrapper}>
            <Paper.Subheading children="Belum Daftar ? " />
            <Paper.TouchableRipple borderless onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Paper.Subheading style={{color: colors.textLink, ...fonts.medium}} children="Daftar Disini" />
            </Paper.TouchableRipple>
          </RN.View>
        </RN.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default React.memo(
  LoginScreen,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
)

const styles = RN.StyleSheet.create({
  btn: {
    marginTop: 38,
    marginBottom: 32
  },
  footer_wrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  headline: {
    marginBottom: 25
  },
  input_wrapper: { marginBottom: 9 },
  input: { marginBottom: 9 },
  text_forgot: {
    fontSize: 14,
  },
  touchable: {
    alignSelf: "baseline",
    marginLeft: "auto",
  }
})
