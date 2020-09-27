import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-snap-carousel';

import { DetilScreenRouteProp, DetilScreenNavigationProp } from '../../../types';
import baseStyle from '../../../styles';
import Layout from '../../../constants/Layout';
import Carousel from '../../../components/Carousel';
import PriceDiscount from '../../../components/PriceDiscount';
import { Rating } from 'react-native-ratings';
import SwipeRating from '../../../components/SwipeRating';
import Colors from '../../../constants/Colors';
import Table from '../../../components/Table';

type DetilProp = {
  route?: DetilScreenRouteProp
  navigation?: DetilScreenNavigationProp
}

const DetilScreen: React.FC<DetilProp> =
(props) => {
  const inset = useSafeArea();
  const { fonts } = Paper.useTheme();
  const { params } = props.route
  return (
    <SafeAreaView>
      <ScrollView>
        <RN.View>
          <Paper.Surface style={{paddingTop: 16, paddingBottom: 23, marginBottom: 4}}>
            <Carousel
              data={params?.images}
            />
            <RN.View style={{paddingHorizontal: 15}}>
              <Paper.Title>{params?.name}</Paper.Title>
              <PriceDiscount price={params?.price} discount={params?.discount} />
            </RN.View>
          </Paper.Surface>

          <Paper.Surface style={{paddingHorizontal: 15, paddingVertical: 17, marginHorizontal: 4}}>
            <SwipeRating
              readonly
              ratingCount={5}
              startingValue={params?.rating}
            />

            <RN.View style={styles.row}>
                <Paper.Text>4/5</Paper.Text>
                <Paper.IconButton icon="record" size={10} color={Colors.light.darkBlack} />
                <Paper.Text>From {params?.reviews} Reviews</Paper.Text>
            </RN.View>
          </Paper.Surface>

          <Paper.Surface style={{paddingHorizontal: 15, paddingVertical: 17, marginHorizontal: 4}}>
            <Table
              heading="Spesifikasi"
              data={params?.specs}
              containerStyle={{marginBottom: 24}}
            />

            <Paper.Subheading style={[{...fonts.medium}]}>
                Deskripsi Produk
            </Paper.Subheading>
            <Paper.Divider style={styles.divider} />

            <Paper.Text style={{lineHeight: 25}}>
                {params?.descriptions}
            </Paper.Text>
          </Paper.Surface>
        </RN.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(
  DetilScreen,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
)

const SLIDE_WIDTH: number = Layout.window.width;
const ITEM_WIDTH: number = SLIDE_WIDTH - 30;
const ITEM_HEIGHT: number = SLIDE_WIDTH / 1.5;

const styles = RN.StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  divider: {
    height: 1.5,
    marginTop: 10,
    marginBottom: 10
  },
})
