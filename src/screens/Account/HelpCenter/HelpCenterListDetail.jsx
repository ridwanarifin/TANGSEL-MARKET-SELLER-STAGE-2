import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'

export default function HelpCenterListDetail(props) {
  return (
    <RN.View>
      <RN.View style={styles.container}>
        <Paper.Text style={styles.heading}>{props.route.params.contentName}</Paper.Text>
        <Paper.Text style={styles.text}>{props.route.params.content}</Paper.Text>
      </RN.View>
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  heading:{
    fontSize:14,
    fontWeight:'bold',
    textTransform:'capitalize',
    marginBottom:32
  },
  text:{
    fontSize:12,
  }
})
