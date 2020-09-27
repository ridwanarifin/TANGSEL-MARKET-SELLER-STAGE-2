import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'

export default function PrivacyPolicy() {
  return (
    <RN.View style={styles.container}>
      <Paper.Text style={styles.text}>
        Laborum cupidatat fugiat dolore fugiat aliqua in nulla Lorem irure duis. Sunt aliquip excepteur qui esse minim anim ad ut. Ea eiusmod est amet elit ea ea. Aute velit eiusmod aute nulla deserunt deserunt adipisicing. Ex quis cillum reprehenderit cillum velit mollit. Cupidatat duis voluptate fugiat adipisicing in fugiat. Commodo eiusmod adipisicing fugiat aliqua sint qui labore duis nostrud minim pariatur.
        {"\r\n \r\n"}
        Laborum cupidatat fugiat dolore fugiat aliqua in nulla Lorem irure duis. Sunt aliquip excepteur qui esse minim anim ad ut. Ea eiusmod est amet elit ea ea. Aute velit eiusmod aute nulla deserunt deserunt adipisicing. Ex quis cillum reprehenderit cillum velit mollit. Cupidatat duis voluptate fugiat adipisicing in fugiat. Commodo eiusmod adipisicing fugiat aliqua sint qui labore duis nostrud minim pariatur.
      </Paper.Text>
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 8,
    paddingTop: 64,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height:'100%',
    backgroundColor: "white"
  },
  text:{
    color:'#363636',
    fontSize:14,
    lineHeight:24
  }
})