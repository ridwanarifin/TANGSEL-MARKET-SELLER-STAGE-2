import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import baseStyle from '../../styles';
import Colors from '../../constants/Colors';
import SwipeRating from '../../components/SwipeRating';
import PriceDiscount from '../../components/PriceDiscount';
import { DetilPemesananScreenRouteProp, DetilPemesananScreenNavigationProp } from '../../types';
import { numberFormat } from '../../helper/numberFormat';
import { RootState } from '../../redux/rootReducer';

type DetilPesananProp = {
  route?: DetilPemesananScreenRouteProp
  navigation?: DetilPemesananScreenNavigationProp
}
const DetilPesanan: React.FC<DetilPesananProp> = (props) => {
  const { colors, fonts } = Paper.useTheme();
  const { params } = props.route;
  const { pengiriman_dalam_tangsel: dalam_tangsel, pengiriman_luar_tangsel: luar_tangsel } = useSelector(
    (state: RootState) => state.shop.jasa_kirim
  )
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 4}}>
      <ScrollView>
      <Paper.Surface style={{paddingTop: 14, paddingHorizontal: 16, marginVertical: 4}}>
        <Paper.List.Item
          title="No. Order"
          right={() =>
            <Paper.Text style={{alignSelf: "center", ...fonts.medium, fontSize: 14}}>{params?.no}</Paper.Text>
          }
          style={{borderColor: colors.link, borderRadius: 8, borderWidth: 1, paddingRight: 20, marginBottom: 24}}
          titleStyle={{...fonts.medium, fontSize: 14}}
        />

        <Paper.List.Item
          title="Status"
          right={() =>
            <Paper.Text style={{alignSelf: "center", ...fonts.medium, fontSize: 14, color: colors.link}}>{params?.status}</Paper.Text>
          }
          style={{backgroundColor: 'rgba(50, 115, 220, 0.05)', borderRadius: 8, paddingRight: 20}}
        />
        <Paper.HelperText type="info"> {params?.ket} </Paper.HelperText>
      </Paper.Surface>

      <Paper.Surface style={{marginVertical: 4}}>
        <Paper.List.Section>
          <Paper.List.Accordion
            title="Info Pembayaran"
            theme={{colors: {primary: colors.link}}}>
            <Paper.List.Item
              title="Total Harga Barang"
              description={(args) => (
                <Paper.Text style={{fontSize: 14, ...fonts.medium, marginTop: 8}} {...args}>
                  {numberFormat.format(
                    _.sumBy(params.products,
                      function (obj) {
                        return obj!.price - (obj!.price * obj!.discount / 100)
                      }
                    )
                  )}
                </Paper.Text>
              )}
              titleStyle={{color: Colors.light.greyLight, fontSize: 14}}
            />
            <Paper.Divider style={{height: 1.5, marginHorizontal: 16, marginVertical: 10}} />
            <Paper.List.Item
              title="Total Ongkos Kirim"
              description={(args) => (
                <Paper.Title style={{fontSize: 14, ...fonts.medium, marginTop: 8}} {...args}>
                  {numberFormat.format(
                    _.sumBy(params.products, function (obj) {
                      return obj.postal_fee
                    })
                  )}
                </Paper.Title>
              )}
              titleStyle={{color: Colors.light.greyLight, fontSize: 14}}
            />
          </Paper.List.Accordion>
        </Paper.List.Section>
      </Paper.Surface>

      <Paper.Surface style={{paddingHorizontal: 16, paddingVertical: 20, marginVertical: 4}}>
        <Paper.Subheading style={{...fonts.medium}}>Alamat Pengiriman</Paper.Subheading>
        <Paper.Divider style={{height: 1.5, marginVertical: 10}} />

        <Paper.Text style={{...fonts.medium, marginVertical: 4}}>Rumah</Paper.Text>
        <Paper.Text style={{marginVertical: 4}}>{params?.customer.name} ({params?.customer.phone})</Paper.Text>
        <Paper.Text style={{marginVertical: 4}}>{params?.customer.address}</Paper.Text>
      </Paper.Surface>

      <RN.View style={{marginTop: 4}}>
        <Paper.List.Section>
          <Paper.List.Accordion
            style={{backgroundColor: colors.surface}}
            title="Info Produk"
            theme={{colors: {primary: colors.link}}}>
              <React.Fragment>
                <Paper.Surface>
                  <RN.View style={{flexDirection: "row", paddingHorizontal: 16}}>
                    <Paper.Text style={{color: Colors.light.greyLight}}>Pembeli :</Paper.Text>
                    <Paper.Text style={{...fonts.medium}}> {params?.customer.name} </Paper.Text>
                  </RN.View>
                  <Paper.Divider style={{margin: 16}} />
                  <RN.View style={{paddingHorizontal: 16}}>
                  {_.map(params?.products, (d, index) => (
                    <React.Fragment key={index}>
                      <RN.View key={index} style={{flexDirection: "row"}}>
                        <RN.Image
                          style={{width: 64, height: 64, borderRadius: 4}}
                          source={{uri: d.images[0]}}
                        />
                        <RN.View style={{marginLeft: 14}}>
                          <Paper.Subheading style={{marginBottom: 8}}> {d.name} </Paper.Subheading>
                          <SwipeRating
                            readonly
                            ratingCount={5}
                            startingValue={d.rating}
                          />
                          <PriceDiscount containerStyle={{marginTop: 8}} price={d.price} discount={d.discount} />
                        </RN.View>
                      </RN.View>
                      <Paper.Divider style={{height: 1.5, margin: 12, width: '95%'}} />
                    </React.Fragment>
                    ))
                  }
                  </RN.View>
                </Paper.Surface>

                <Paper.Surface style={{paddingHorizontal: 16, paddingVertical: 20, marginTop: 4}}>
                  <Paper.Surface style={{
                    backgroundColor: colors.background,
                    // borderWidth: 1,
                    borderRadius: 16,
                    marginBottom: 16,
                    elevation: 4,
                  }}>
                    <Paper.List.Item
                      style={{borderRadius: 16}}
                      title="Pengiriman"
                      description={() => (
                        <Paper.HelperText
                          style={{color: colors.text, ...fonts.medium}}
                          type="info">
                            Tangsel ({dalam_tangsel}), Luar Tangsel ({luar_tangsel})
                        </Paper.HelperText>
                      )}
                      right={() =>
                        <Paper.List.Icon icon="chevron-right" />
                      }
                      onPress={() => props.navigation.push('JasaKirimModal')}
                      borderless
                      titleStyle={{
                        fontFamily: 'roboto-medium',
                        fontSize: 14,
                        textTransform: 'capitalize'
                      }}
                    />
                  </Paper.Surface>

                  <Paper.Button
                    style={[baseStyle.btn, {height: 44, marginHorizontal: 42, marginTop: 42}]}
                    color={colors.link}
                    mode="contained"
                    uppercase={false}>
                    Kemas Barang
                  </Paper.Button>
                </Paper.Surface>
              </React.Fragment>
          </Paper.List.Accordion>
        </Paper.List.Section>
      </RN.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(
  DetilPesanan,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
)
