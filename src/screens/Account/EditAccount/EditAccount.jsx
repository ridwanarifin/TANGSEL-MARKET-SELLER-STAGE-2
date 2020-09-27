import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';

export default function EditAccount() {
  const [selectedImage, setSelectedImage] = React.useState(undefined)
  const [store, setStore] = React.useState('');
  const [storeBirthDay, setStoreBirthDay] = React.useState('');
  const [gender, setGender] = React.useState('male');
  const [phone, setPhone] = React.useState('');

  // Image Upload
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

  // datepicker state
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // Show Datepicker
  const showDatepicker = () => {
    showMode('date');
  };

  const callbackDate = React.useCallback((params, params2) => {
    const d = new Date(Date(params2))
    setStoreBirthDay(d.toLocaleDateString('ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    setShow(false)
  }, [])

  const DatePick = React.useMemo(() => (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={callbackDate}
    />
  ), [show])

  return (
    <RN.View>
      <RN.View style={styles.imageContainer}>
        <Paper.TouchableRipple borderless onPress={openImagePickerAsync}>
          <Paper.Avatar.Image style={styles.fab} size={90} source={{ uri: selectedImage ? selectedImage : Asset.fromModule(require('../../../assets/images/account/user.png')).uri }} />
        </Paper.TouchableRipple>
      </RN.View>
      <RN.View>
        <RN.View style={styles.container}>
          <Paper.TextInput
            style={styles.inputColor}
            label="Shop Name"
            value={store}
            placeholder='ex: My Shop Name'
            placeholderTextColor='#363636'
            onChangeText={store => setStore(store)}
            theme={{ colors: { primary: '#363636', underlineColor: 'transparent', } }}
          />
          <Paper.List.Item
            onPress={() => showMode('date')}
            title="Date of Birth"
            style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 8, paddingBottom: 2, borderBottomWidth:1, borderBottomColor:'#dbdbdb' }}
            titleStyle={styles.titleStyle}
            description={storeBirthDay}
            descriptionStyle={styles.descriptionStyle}
            right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
          />
          {show && DatePick}
          <RN.View style={{marginTop:4, marginBottom:4, paddingTop:4, paddingBottom:4, borderBottomColor:'#dbdbdb', borderBottomWidth:1}}>
            <Picker
              selectedValue={gender}
              style={{ width: '100%' }}
              onValueChange={ text => setGender(text) }>
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
            </Picker>
          </RN.View>
          <Paper.TextInput
            style={styles.inputColor}
            label="Phone Number"
            value={phone}
            placeholder='ex: 0812 3345 1234'
            placeholderTextColor='#363636'
            onChangeText={phone => setPhone(phone)}
            theme={{ colors: { primary: '#363636', underlineColor: 'transparent', } }}
          />
          <Paper.Button mode="contained" onPress={() => console.log('Pressed')} style={styles.buttonSubmit}>
            Save
          </Paper.Button>
        </RN.View>
      </RN.View>
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  titleStyle: {
    fontSize: 14
  },
  buttonSubmit:{
    width:'50%', 
    borderRadius:9999,
    marginTop:24,
    marginBottom:24,
    marginLeft:'auto',
    marginRight:'auto'
  },
  descriptionStyle: {
    fontSize: 18,
    paddingTop: 8,
    color: '#363636'
  },
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
  imageContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 32,
    justifyContent: "center",
    alignSelf: "center"
  },
  container: {
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    height:"100%"
  },
  inputColor: {
    backgroundColor: '#fff',
  }
})
