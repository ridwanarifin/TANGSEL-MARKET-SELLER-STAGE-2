import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'
import {Feather, FontAwesome} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

export default function ContactUs() {
  const [text, setText] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState('')
  const {colors} = Paper.useTheme();
  const [visible, setVisible] = React.useState(false);


  // Image Upload Open Picker
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


  // SHOW HIDE MODAL
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <RN.View>
      <RN.View style={styles.container}>
        <Paper.Text style={styles.heading}>Halo, Apa yang bisa kami bantu?</Paper.Text>
        <Paper.Text style={styles.text}>Detail Masalah</Paper.Text>
        <Paper.TextInput
          placeholder="Tuliskan Rincian Kendala Anda"
          value={text}
          mode='outlined'
          onChangeText={text => setText(text)}
          style={styles.textArea}
          selectionColor='#dbdbdb'
          underlineColor='transparent'
          placeholderTextColor='#b5b5b5'
          underlineColorAndroid='transparent'
          theme={{colors: {primary:colors.link}}}
          multiline={true}
          numberOfLines={6}
        />
        <Paper.Text style={[styles.text, styles.textSm]}>Lampirkan bukti pembayaran atau dokumen lainnya dalam bentuk foto atau video untuk menguatkan komplain anda</Paper.Text>
        <Paper.TouchableRipple style={styles.containerUploadImage} borderless onPress={openImagePickerAsync}>
          <RN.View style={styles.uploadImage} size={90} source={{uri: selectedImage}} >
          <Paper.Button style={styles.uploadImageText} color="#b5b5b5" icon={() => <Feather color='#b5b5b5' name="upload-cloud" size={32} />} mode="text" >
            upload Foto
          </Paper.Button>
          </RN.View>
        </Paper.TouchableRipple>
        <Paper.Button style={styles.buttonSubmit} mode="contained" onPress={showModal}>
          Send
        </Paper.Button>
      </RN.View>
      <Paper.Portal>
        <Paper.Modal visible={visible} onDismiss={hideModal}>
          <RN.View style={styles.modalBg}>
            <Paper.Headline style={styles.modalHeading}>komplain terkirim</Paper.Headline>
            <Paper.Text style={styles.modalText}>Kami akan segera memproses komplain anda, Terimakasih</Paper.Text>
            <Paper.Avatar.Icon size={120} style={styles.bgIcon} icon={() => <FontAwesome name="paper-plane-o" size={60} color='#08A0E9' />} />
            <Paper.Button style={styles.buttonSubmit} mode="contained" onPress={hideModal}>
              Back
            </Paper.Button>
          </RN.View>
        </Paper.Modal>
      </Paper.Portal>
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    height:'100%'
  },
  containerUploadImage:{
    marginTop:16,
    marginBottom:64
  },
  uploadImage:{
    width:'100%',
    borderRadius:10,
    borderColor: '#dbdbdb',
    borderWidth:1,
    borderStyle:'dashed',
    backgroundColor:'#fafafa',
  },
  uploadImageText:{
    padding:16
  },
  buttonSubmit:{
    width:'75%',
    backgroundColor:'#08A0E9',
    borderRadius:9999,
    marginLeft:'auto',
    marginRight:'auto',
    paddingTop:8,
    paddingBottom:8,
    marginTop:32,
    marginBottom:32,
  },
  heading:{
    fontSize:14,
    fontWeight:'bold',
    textTransform:'capitalize',
    marginBottom:24,
    marginTop:16
  },
  text:{
    fontSize:14,
    textTransform:'capitalize',
    marginBottom:16,
    marginTop:16
  },
  textArea:{
    borderColor:'#dbdbdb',
    color:'#dbdbdb',
    backgroundColor: "#fafafa"
  },
  textSm:{
    fontSize:11,
    color:'#b5b5b5',
    marginTop:24
  },
  modalBg:{
    backgroundColor:'#fff',
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    padding:28,
    textAlign:'center',
  },
  modalHeading:{
    textAlign:'center',
    fontWeight:'bold',
    textTransform:'capitalize',
  },
  modalText:{
    marginTop:8,
    textAlign:'center',
    color:'#b5b5b5',
    fontSize:14
  },
  bgIcon:{
    backgroundColor:'#E2F6FF',
    borderRadius:50,
    marginTop:32,
    marginBottom:32,
    marginLeft:'auto',
    marginRight:'auto',
  }
})
