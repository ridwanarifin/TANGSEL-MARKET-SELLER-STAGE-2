import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'

export default function ChatScreen() {
  return (
    <RN.View style={styles.container}>
      <Paper.Headline style={styles.textCenter} >
        coming soon
      </Paper.Headline>
      <Paper.IconButton
          icon="alert-octagon"
          style={styles.textCenter}
          size={64}
          color={Paper.Colors.red500}
      />
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center"
  },
  textCenter:{
    alignSelf:"center",
  },
})
