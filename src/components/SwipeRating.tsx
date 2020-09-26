import * as React from 'react';
import * as RN from 'react-native';
import { Rating, RatingProps } from 'react-native-ratings';

export default function SwipeRating (props: RatingProps) {
  return (
    <Rating style={styles.container} imageSize={14} {...props} />
  )
};

const styles = RN.StyleSheet.create({
  container: {
    alignItems: "flex-start"
  }
})


