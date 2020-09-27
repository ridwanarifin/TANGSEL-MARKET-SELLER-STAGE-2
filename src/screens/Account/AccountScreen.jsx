import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'

export default function AccountScreen(props) {
  return (
    <RN.View>
      <RN.View style={styles.container}>
        <RN.View style={[styles.flexRowItemsCenter, styles.borderBottom]}>
          <RN.View style={styles.widthOneToFour}>
            <Paper.Avatar.Image style={styles.mxauto} size={64} source={require('../../assets/images/account/user.png')} />
          </RN.View>
          <RN.View style={styles.widthThreeToFour}>
            <Paper.Text style={styles.textHeading}>Tangsel distro</Paper.Text>
            <Paper.Text style={[styles.link, styles.mtSm]} onPress={() => props.navigation.navigate('EditAccount')}>
              Edit Profile
          </Paper.Text>
          </RN.View>
        </RN.View>
        <RN.View style={[styles.pyLg]}>
          <Paper.Text style={styles.textNormal}>+62 12 8888 8888</Paper.Text>
          <Paper.Text style={[styles.textNormal, styles.mtMd]}>email@mail.com</Paper.Text>
        </RN.View>
      </RN.View>

      {/* pusat bantuan */}
      <RN.View style={[styles.mtMd, styles.container]}>
        <Paper.List.Item
          title="Pusat Bantuan"
          left={props => <Paper.List.Icon {...props} icon="face-agent" />}
          right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
          onPress={() => props.navigation.navigate('HelpCenter')}
        />
      </RN.View>

      {/* Hubungi Kami */}
      <RN.View style={[styles.mtMd, styles.container]}>
        <Paper.List.Item
          title="Hubungi Kami"
          left={props => <Paper.List.Icon {...props} icon="phone" />}
          right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
          onPress={() => props.navigation.navigate('ContactUs')}
        />
      </RN.View>

      {/* Kebijakan Privasi */}
      <RN.View style={[styles.mtMd, styles.container]}>
        <Paper.List.Item
          title="Kebijakan Privasi"
          left={props => <Paper.List.Icon {...props} icon="alert-circle-outline" />}
          right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
          onPress={() => props.navigation.navigate('PrivacyPolicy')}
        />
      </RN.View>

      {/* Tentang Kami */}
      <RN.View style={[styles.mtMd, styles.container]}>
        <Paper.List.Item
          title="Tentang Kami"
          left={props => <Paper.List.Icon {...props} icon="earth" />}
          right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Pressed')}
        />
      </RN.View>

      <Paper.Button 
        mode="contained" 
        onPress={() => console.log('Pressed')}
        color="#FF3860"
        style={styles.buttonExit}
      >
        Keluar
      </Paper.Button>

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
    backgroundColor: "white"
  },
  buttonExit:{
    width:'50%',
    borderRadius:9999,
    marginLeft:'auto',
    marginRight:'auto',
    padding:8,
    marginTop:40,
  },
  bgWhite:{
    backgroundColor:'white'
  },
  textNormal: {
    fontSize: 12,
    fontWeight: '600'
  },
  borderBottom: {
    borderColor: '#f5f5f5',
    borderBottomWidth: 1
  },
  mxauto: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  flexRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  widthOneToFour: {
    width: '25%'
  },
  widthThreeToFour: {
    width: '75%'
  },
  textHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  link: {
    color: '#08A0E9',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  mtSm: {
    marginTop: 4
  },
  mtMd: {
    marginTop: 8
  },
  mtLg: {
    marginTop: 16
  },
  pyLg: {
    paddingTop: 16,
    paddingBottom: 16
  }
})
