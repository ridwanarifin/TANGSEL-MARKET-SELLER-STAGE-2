import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import NumericInput from 'react-native-numeric-input'
import { TextInputMask } from 'react-native-masked-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';

import { TambahProdukScreenRouteProp, TambahProdukScreenNavigationProp } from '../../../types';
import { wait } from '../../../helper';
import InputField from '../../../components/InputField';
import Colors from '../../../constants/Colors';
import baseStyle from '../../../styles';

type TambahProdukScreenProp = {
  route?: TambahProdukScreenRouteProp
  navigation?: TambahProdukScreenNavigationProp
}

function TambahProdukScreen (props: TambahProdukScreenProp) {
  const [selectedImage, setSelectedImage] = React.useState<string | any | undefined>();
  const [images, setImages]               = React.useState<Array<string> | any>([])
  const [visible, setVisible]             = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { params } = props.route

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => setRefreshing(false));
  }, []);

  let openImagePickerAsync = async (context: "kamera" | "galeri") => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult;
    switch (context) {
      case "kamera":
        pickerResult = await ImagePicker.launchCameraAsync();
        break;

      default:
        pickerResult = await ImagePicker.launchImageLibraryAsync();
        break;
    }

    if (pickerResult.cancelled === true) {
      return;
    }
    let newImage = _.concat(images, {imageUri: pickerResult.uri, showDialogDelete: false })
    setImages(newImage)
    // setSelectedImage(pickerResult.uri);
  };

  const toggleDialogItemDelete = React.useCallback((item) => {
    let data = item && _.find(images, item)
    // @ts-ignore
    data &&  _.merge(data, { ...data, showDialogDelete: !data.showDialogDelete })

    console.log(images);
    console.log(data, 'data merge');
    item && onRefresh();
  }, [images]);

  const _onItemDelete = React.useCallback((item) => {
    item && _.remove(images, item);
    item && onRefresh();
  }, [images]);

  const LinearImage = React.useMemo(() =>
  (item) => {
    return (
      <Paper.TouchableRipple borderless onPress={() => toggleDialogItemDelete(item)}>
        <RN.ImageBackground
        // @ts-ignore
          source={{uri: item.imageUri}}
          style={{width: 80, height: 80, borderRadius: 4}}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={[{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
              // @ts-ignore
            }, !item.showDialogDelete ? { display: "none" } : null]}>
              <Paper.IconButton
                icon="delete-forever-outline"
                // size={20}
                color={Colors.light.danger}
                onPress={() => _onItemDelete(item) }
              />
          </LinearGradient>
        </RN.ImageBackground>
      </Paper.TouchableRipple>
  )}, [refreshing])

  const { colors, fonts } = Paper.useTheme();
  const {
    control,
    handleSubmit,
    errors
  } = useForm()

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <Paper.Surface style={{flex: 1, paddingTop: 23,  paddingBottom: 42, paddingHorizontal: 16}}>
          {/* Foto Produk */}
          <RN.View style={{borderBottomWidth: 1, borderBottomColor: Colors.light.greyLight}}>
            <Paper.HelperText style={{color: Colors.light.greyLight, marginBottom: 6}} type="info">Foto Produk</Paper.HelperText>
            <FlatList
              refreshControl={
                <RN.RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              refreshing
              data={images}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Paper.Divider style={{marginHorizontal: 10}} />}
              contentContainerStyle={{paddingBottom: 10}}
              renderItem={({item}) => LinearImage(item)}
              ListFooterComponent={() => (
                <Paper.TouchableRipple
                  style={{
                    backgroundColor: "#F2F2F2",
                    width: 80,
                    height: 80,
                    marginLeft: 10,
                    justifyContent: "center",
                    borderRadius: 4
                  }}
                  onPress={showDialog}>
                    <Paper.IconButton style={{alignSelf: "center"}} icon="plus-circle-outline" color={colors.primary} />
                </Paper.TouchableRipple>
              )}
            />
          </RN.View>

          {/* Nama Produk */}
          <RN.View>
            <Controller
              name="nama"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Nama"
                  onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                />
              )}
            />
          </RN.View>

          {/* Berat Produk */}
          <RN.View>
            <Controller
              name="berat"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Berat"
                  onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                />
              )}
            />
          </RN.View>

          {/* Tipe Produk */}
          <RN.View>
            <Controller
              name="tipe"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Tipe"
                  onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                />
              )}
            />
          </RN.View>

          {/* Ukuran Produk */}
          <RN.View>
            <Controller
              name="ukuran"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Ukuran"
                  onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                />
              )}
            />
          </RN.View>

          {/* Harga Produk */}
          <RN.View>
            <Controller
              name="harga"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Harga"
                  render={args =>
                    <TextInputMask
                      {...args}
                      type={'money'}
                      options={{
                        precision: 0,
                        delimiter: '.',
                        unit: 'Rp.',
                      }}
                      onChangeText={text => params.onChange(text)}
                    />
                  }
                />
              )}
            />
          </RN.View>

          {/* Kategori Produk */}
          <Paper.TouchableRipple borderless onPress={() => console.log('press')}>
            <Controller
              name="kategori"
              control={control}
              defaultValue={params.kategori_produk}
              render={(params) => (
                <>
                <InputField
                  {...params}
                  label="Kategori"
                  // onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={false}
                  onFocus={() => {
                    props.navigation.navigate('KategoriScreen')
                  }}
                />
                <Paper.IconButton style={{position: "absolute", right: 0, top: 0, bottom: 0, justifyContent: "flex-end", alignItems: "center"}} icon="chevron-right" />
                </>
              )}
            />
          </Paper.TouchableRipple>

          {/* Ukuran Produk */}
          <RN.View>
            {/* <Paper.HelperText type="info">Stok</Paper.HelperText> */}
            <Controller
              name="stok"
              control={control}
              defaultValue={0}
              render={(params) => (
                <>
                <InputField
                  {...params}
                  render={() => (
                    <NumericInput
                    {...params}
                      borderColor="transparent"
                      rightButtonBackgroundColor="transparent"
                      leftButtonBackgroundColor="transparent"
                      containerStyle={{top: 18, bottom: 0, backgroundColor: "transparent"}}
                      minValue={0}
                      initValue={0}
                      valueType='real'
                      textColor="#2F80ED"
                      separatorWidth={0}
                      iconStyle={{
                        color: Colors.light.text
                      }}
                    />
                  )}
                />
                <Paper.HelperText type="info" style={{color: Colors.light.greyLight, position: "absolute", top: 5}}>Stok</Paper.HelperText>
                </>
              )}
            />
          </RN.View>

          {/* Deskripsi Produk */}
          <RN.View>
            <Controller
              name="deskripsi"
              control={control}
              defaultValue=""
              render={(params) => (
                <InputField
                  {...params}
                  label="Deskripsi (max. 500 kata)"
                  onChangeText={text => params.onChange(text)}
                  keyboardType="default"
                  returnKeyType="next"
                  multiline
                />
              )}
            />
          </RN.View>

          <Paper.Button mode="contained" color={colors.link} style={[baseStyle.btn, { marginTop: 34}]}>Unggah</Paper.Button>
        </Paper.Surface>

        <Paper.Portal>
          <Paper.Dialog visible={visible} onDismiss={hideDialog}>
            <Paper.Dialog.Title>Tambah Foto Produk</Paper.Dialog.Title>
            <Paper.Dialog.Content style={{paddingHorizontal: 0, paddingBottom: 0}}>
              <>
                <Paper.List.Item onPress={() => {
                  openImagePickerAsync("kamera");
                  hideDialog();
                }} title="Ambil Foto.." />
                <Paper.List.Item onPress={() => {
                  openImagePickerAsync("galeri");
                  hideDialog();
                }} title="Pilih dari Galeri.." />
              </>
            </Paper.Dialog.Content>
            <Paper.Dialog.Actions onPre style={{justifyContent: "flex-start"}}>
              <Paper.Button onPress={hideDialog}>Cancel</Paper.Button>
            </Paper.Dialog.Actions>
          </Paper.Dialog>
        </Paper.Portal>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const LinearMemoImage = (props) => {
  return (
    // @ts-ignore
    <Paper.TouchableRipple onPress={props.onPress}>
      <RN.ImageBackground
      // @ts-ignore
        source={{uri: props.item.imageUri}}
        style={{width: 80, height: 80, borderRadius: 4}}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={[{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
            // @ts-ignore
          }, !props.item.showDialogDelete ? { display: "none" } : null]}>
            <Paper.IconButton
              icon="delete-forever-outline"
              // size={20}
              color={Colors.light.danger}
              // @ts-ignore
              onPress={() => {alert(`pressed ${props.item}`)}}
            />
        </LinearGradient>
      </RN.ImageBackground>
    </Paper.TouchableRipple>
  )
  // @ts-ignore
};

export default TambahProdukScreen;
