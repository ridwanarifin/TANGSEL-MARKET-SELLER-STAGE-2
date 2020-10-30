/// <reference path="../../types.d.ts" />

import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from "react-hook-form";

import baseStyle from '../../styles';
import InputField from '../../components/InputField';
import { BiodataSignUpScreenRouteProp, BiodataSignUpScreenNavigationProp } from '../../types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setShopBiodata } from '../../redux/shopSlice';
import { setProfilNameBiodata } from '../../redux/profileSlice';
import { RootState } from '../../redux/rootReducer';

type BiodataProp = {
  route?: BiodataSignUpScreenRouteProp
  navigation?: BiodataSignUpScreenNavigationProp
};

type DataFormType = {
  fullname?: string
  nik?: string
  shopname?: string
  shoptelepon?: string
  shopemail?: string
}
const BiodataSignUpScreen: React.FC<BiodataProp> =
(props) => {
  const [selectedImage, setSelectedImage] = React.useState<string | any | undefined>(undefined)
  const { colors, fonts } = Paper.useTheme();

  const { fullname, nik }  = props.route.params;
  const [Fullname, setFullname]   = React.useState<string | undefined>(fullname);
  const [Nik, setNik]             = React.useState<string | undefined>(nik);
  const [Shopname, setShopname]   = React.useState<string | undefined>(undefined);
  const [Shopemail, setShopemail] = React.useState<string | undefined>(undefined);
  const [Tlp, setTlp]             = React.useState<string | undefined>(undefined);

  const { errors, control, handleSubmit } = useForm({
    defaultValues: {
      fullname: fullname, nik: nik, shopname: "", shoptelepon: "", shopemail: ""
    }
  });

  const value     = React.useMemo(() => (context) => context, []);
  const onChange  = React.useCallback((text, context) => context(text), []);

  const dispatch = useDispatch();

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult.uri);
  };

  const shop = useSelector(
    (state: RootState) => state.shop, shallowEqual
  );
  const profil = useSelector(
    (state: RootState) => state.profile
  )

  const _onSubmit = (formData: DataFormType) => {
    console.log('formData', formData);
    if (!Object.keys(errors).length && formData) {
      console.log('form ok');
      if (profil.name !== formData.fullname) {
        dispatch(setProfilNameBiodata({name: formData.fullname}));
      };
      dispatch(setShopBiodata({ avatar: selectedImage , name: formData.shopname, phone: formData.shoptelepon, email: formData.shopemail }));
      props.navigation.navigate('Root')
    }
  }
  console.log('errors', errors)

  return (
    <SafeAreaView style={baseStyle.container}>
      <KeyboardAwareScrollView>
        <RN.View style={{ paddingBottom: 52 }}>
          <RN.View style={{justifyContent: "center", alignSelf: "center"}}>
            <Paper.Headline style={{...fonts.medium}}>Isi Biodata</Paper.Headline>

            {!selectedImage ? (
              <Paper.FAB style={[styles.fab, { backgroundColor: colors.textLink }]} color={colors.surface} animated icon="camera" onPress={openImagePickerAsync} />
            ) : (
              <Paper.TouchableRipple borderless onPress={openImagePickerAsync}>
                <Paper.Avatar.Image style={styles.fab} size={90} source={{uri: selectedImage}} />
              </Paper.TouchableRipple>
            )}
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="fullname"
              control={control}
              rules={{ required: "This is required." }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                      style={{ backgroundColor: colors.surface }}
                    label="Nama Pemilik Toko"
                    onChangeText={text => params.onChange(text)}
                  />
                  {errors["fullname"] && <Paper.HelperText type="error"> {errors.fullname.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="nik"
              control={control}
              rules={{ required: "This is required." }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    label="NIK Tangerang Selatan"
                    keyboardType="decimal-pad"
                    editable={false}
                    onChangeText={text => params.onChange(text)}
                  />
                  <Paper.HelperText style={{position: "absolute", fontSize: 10, right: 0}} type="info">[Tidak Dapat Diubah]</Paper.HelperText>
                  {errors["nik"] && <Paper.HelperText type="error"> {errors.nik.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="shopname"
              control={control}
              rules={{ required: "This is required." }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    label="Nama Toko"
                    onChangeText={text => params.onChange(text)}
                  />
                  {errors["shopname"] && <Paper.HelperText type="error"> {errors.shopname.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="shoptelepon"
              control={control}
              rules={{
                required: "This is required.",
                pattern: {
                  value: /^\d/,
                  message: 'This input is number only.',
                },
              }}
              render={(params) => (
                <React.Fragment>
                  <InputField
                    {...params}
                    style={{ backgroundColor: colors.surface }}
                    label="Nomor Telepon Toko"
                    keyboardType="number-pad"
                    onChangeText={text => params.onChange(text)}
                  />
                  {errors["shoptelepon"] && <Paper.HelperText type="error"> {errors.shoptelepon.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <RN.View style={styles.input_wrapper}>
            <Controller
              name="shopemail"
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
                    label="Email Toko"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text => params.onChange(text)}
                  />
                  {errors["shopemail"] && <Paper.HelperText type="error"> {errors.shopemail.message} </Paper.HelperText>}
                </React.Fragment>
              )}
            />
          </RN.View>

          <Paper.Button
            mode="contained"
            uppercase
            style={[baseStyle.btn, { marginTop: 25, backgroundColor: colors.link }]}
            onPress={handleSubmit(_onSubmit)}>
              Simpan
            </Paper.Button>
        </RN.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default React.memo(
  BiodataSignUpScreen,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
);

const styles = RN.StyleSheet.create({
  fab: {
    alignSelf: "center",
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25
  },
  input_wrapper: {
    marginBottom: 8
  }
})
