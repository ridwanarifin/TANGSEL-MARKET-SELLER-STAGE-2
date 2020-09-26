import * as React from 'react';
import * as Paper from 'react-native-paper';
import * as RN from 'react-native';
import _ from 'lodash';
import Layout from '../../../constants/Layout';
import SwipeRating from '../../../components/SwipeRating';
import PriceDiscount from '../../../components/PriceDiscount';

function ProdukItem({ item, onPress }) {
  const { fonts } = Paper.useTheme();
  return (
    <Paper.TouchableRipple borderless onPress={onPress}>
      <RN.View style={styles.container}>
        <RN.Image
          width={imageWidth}
          height={imageHeight}
          source={{uri: item.images[0]}}
          style={{width: imageWidth, height: imageHeight, resizeMode: "contain", borderRadius: 4}}
        />

        <Paper.Text style={[styles.text, {...fonts.medium}]}> {item.name} </Paper.Text>

        <SwipeRating
          readonly
          ratingCount={5}
          startingValue={item.rating}
        />

        <PriceDiscount price={item.price} discount={item.discount}  />
      </RN.View>
    </Paper.TouchableRipple>
  );
};

export default React.memo(
  ProdukItem,
  (prevProps, nextProps) =>
    _.isEqual(prevProps, nextProps)
);

const { window } = Layout;
const padding = 10
const imageWidth = window.width / 2 - padding * 2;
const imageHeight = 185;
const styles = RN.StyleSheet.create({
  container: {
    maxWidth: window.width / 2 - padding * 2,
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
    paddingHorizontal: 0,
  }
})
