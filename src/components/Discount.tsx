import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';

type Prop = {
  containerStyle?: RN.StyleProp<RN.ViewStyle>
  price: React.ReactText
  discount: number
};

export default function Discount (props: Prop) {
  const { colors } = Paper.useTheme();
  function calDiscount () {
    if (typeof props.price !== 'number') {
      return parseInt(props.price) * props.discount / 100
    }
    return props.price * props.discount / 100
  }
  return (
    <RN.View style={[styles.container, props.containerStyle]}>
      <Paper.Text style={styles.text}>
        {calDiscount()}
      </Paper.Text>
      <Paper.Text style={[styles.textPercent,{ color: colors.error }]}>-10%</Paper.Text>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 10,
    lineHeight: 15,
    color: '#BDBDBD',
    marginRight: 15,
    textDecorationLine: "line-through"
  },
  textPercent: {
    fontSize: 10,
    lineHeight: 15,
  }
})
