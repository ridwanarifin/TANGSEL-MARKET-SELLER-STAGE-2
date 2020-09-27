import * as React from 'react';
import * as RN from 'react-native'
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import baseStyle from '../../styles';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import SwipeRating from '../../components/SwipeRating';
import PriceDiscount from '../../components/PriceDiscount';
import { PesananMasukScreenRouteProp, PesananMasukScreenNavigationProp } from '../../types';

type PesananMasukProp = {
  route?: PesananMasukScreenRouteProp
  navigation?: PesananMasukScreenNavigationProp
}
function PesananMasuk (props: PesananMasukProp) {
  const { colors, fonts } = Paper.useTheme();
  const [q, setQ] = React.useState<string | undefined>("");
  const [showModal, setShowModal]   = React.useState<boolean>(false);
  const [context, setContext]       = React.useState<"baru" | "lama">("baru");

  const _handleModal = React.useCallback(() => setShowModal(v => !v), [])
  const _handleContext = React.useCallback(
    (params: "baru" | "lama") => setContext(params)
  ,[]);

  const ListItemModal = React.useMemo(() =>
    ({title, value, isChecked}) => (
    <Paper.List.Item
      style={[styles.modalItem, {
        backgroundColor: isChecked ? 'rgba(8, 160, 233, 0.05)' : Colors.light.whiteTer
      }]}
      titleStyle={{color: isChecked ? colors.link : colors.text}}
      rippleColor="rgba(8, 160, 233, 0.05)"
      borderless
      title={title}
      onPress={() => _handleContext (value)}
      right={() => (
          <Paper.RadioButton
            value="lama"
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => _handleContext(value)}
        />
      )}
    />
  ), [context]);

  const ModalUrutkan = React.useMemo(() => (
    <Paper.Portal>
      <Paper.Modal contentContainerStyle={[styles.containerModal, {backgroundColor: colors.surface}]} visible={showModal} onDismiss={_handleModal}>
        <Paper.Headline style={{alignSelf: "center", marginBottom: 32}}>Urutkan</Paper.Headline>
        {ListItemModal({title: "Tanggal Paling lama", value: "lama", isChecked: context === "lama" })}
        {ListItemModal({title: "Tanggal Paling baru", value: "baru", isChecked: context === "baru" })}
      </Paper.Modal>
    </Paper.Portal>
  ), [showModal, context]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Paper.Surface style={styles.section}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[{
            id: 0,
            title: "Pesanan masuk",
            count: 3
          },{
            id: 1,
            title: "Dikemas",
            count: 2
          },{
            id: 2,
            title: "Sedang Dikirim",
            count: 4
          }]}
          renderItem={({ item }) => {
            return (
              <Paper.Button uppercase={false} color={colors.link} mode="contained"> {item.title} </Paper.Button>
            )
          }}
          indicatorStyle="white"
          contentContainerStyle={{paddingBottom: 10}}
          scrollIndicatorInsets={{left: 5, right: 5}}
          ItemSeparatorComponent={
            () => <Paper.Divider style={{paddingHorizontal: 5, alignSelf: "center"}} />
          }
          horizontal
        />
      </Paper.Surface>

      <Paper.Surface style={[{flexDirection: "row"}, styles.section]}>
        <RN.View style={{width: "60%"}}>
          <Paper.Searchbar
            value={q}
            onChangeText={text => setQ(text)}
            theme={{
              colors: {
                placeholder: "#B5B5B5"
              }
            }}
            placeholder="Cari Pesanan Disini"
            numberOfLines={1}
            inputStyle={{fontSize: 14, color: '#B5B5B5'}}
            style={{borderRadius: 16}}
          />
        </RN.View>

        <Paper.Surface style={[{flexDirection: "row"}]}>
          <Paper.IconButton
            onPress={_handleModal}
            icon={({size, color}) => {
              return (
                <RN.Image
                  source={require('../../assets/order-icon.png')}
                  style={{width: size, height: size, tintColor: color}}
                />
              )
            }}
          />
          <Paper.Text style={{alignSelf: "center"}}>Urutkan</Paper.Text>
        </Paper.Surface>
      </Paper.Surface>

      <Paper.Surface style={[{ flex: 1}]}>
        <RN.SectionList
          contentContainerStyle={styles.section}
          sections={DATA}
          keyExtractor={(item, index) => index.toString()}
          SectionSeparatorComponent={() => <Paper.Divider style={{height: 2, backgroundColor: "rgba(50, 115, 220, 0.05)"}} />}
          ItemSeparatorComponent={() => <Paper.Divider style={{height: 2, backgroundColor: colors.link, marginVertical: 10}} />}
          renderSectionHeader={({ section: { title }}) =>
            <Paper.List.Item
              title="Pesanan Masuk"
              titleStyle={{...fonts.medium}}
              right={() =>
                <Paper.Text style={{alignSelf: "center", ...fonts.medium}}>{title}</Paper.Text>
              }
            />
          }
          renderItem={({item}) =>
            <Paper.Surface style={{paddingVertical: 24, marginBottom: 30}}>
              <Paper.List.Item
                title="No. Order"
                right={() =>
                  <Paper.Text style={{alignSelf: "center", ...fonts.medium, fontSize: 14}}>{item.no}</Paper.Text>
                }
                style={{borderColor: colors.link, borderRadius: 8, borderWidth: 1, paddingRight: 20, marginBottom: 24}}
                titleStyle={{...fonts.medium, fontSize: 14}}
              />

              <Paper.List.Item
                title="Status"
                right={() =>
                  <Paper.Text style={{alignSelf: "center", ...fonts.medium, fontSize: 14, color: colors.link}}>{item.status}</Paper.Text>
                }
                style={{backgroundColor: 'rgba(50, 115, 220, 0.05)', borderRadius: 8, paddingRight: 20}}
              />
              <Paper.HelperText type="info"> {item.ket} </Paper.HelperText>

              <Paper.Surface style={{marginTop: 15, paddingVertical: 24}}>
                <Paper.Subheading>Pembeli : {item.customer.name}</Paper.Subheading>
                <Paper.Divider style={{height: 1.5, marginVertical: 15}} />

                <RN.View>
                  {_.map(item.products, (d, index) => (
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
                <Paper.Button
                  color={colors.link}
                  mode="contained"
                  style={[baseStyle.btn, {marginTop: 12}]}
                  onPress={() => props.navigation.navigate('DetilPesananScreen', item)}>Detil</Paper.Button>
              </Paper.Surface>
            </Paper.Surface>
          }
        />
      </Paper.Surface>

      {ModalUrutkan}
    </SafeAreaView>
  )
};

export default React.memo(
  PesananMasuk,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
);

const styles = RN.StyleSheet.create({
  section: {
    // flex: 1,
    padding: 16,
    marginBottom: 8,
  },
  containerModal: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  modalHeadline: {
    alignSelf: "center"
  },
  modalItem: {
    borderRadius: 16,
    marginVertical: 8
  }
})

const DATA = [
  {
    title: "2 Feb 2020",
    data: [
      {
        id: 0,
        no: "00000008",
        status: "Pembayaraan Berhasil",
        ket: "BJB Virtual Account (Konfirmasi Otomatis)",
        customer_id: "091298234",
        products: [
          {
            id: 0,
            name: 'Kemeja',
            rating: 4,
            images: [
              "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/9/4/35734172/35734172_2baeece8-bd76-4aab-9a8b-817374dd83a8_1536_1536.jpeg",
              "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/9/4/35734172/35734172_2baeece8-bd76-4aab-9a8b-817374dd83a8_1536_1536.jpeg",
              "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/9/4/35734172/35734172_2baeece8-bd76-4aab-9a8b-817374dd83a8_1536_1536.jpeg",
            ],
            discount: 10,
            price: 325000,
            postal_fee: 20000
          },
          {
            id: 0,
            name: 'T-sirt',
            rating: 4,
            images: [
              "https://www.asket.com/img/width=750,format=webp,quality=70/https://asket.centracdn.net/client/dynamic/images/2_91cd261056-asket_tee_white_slide_01-original.jpg",
              "https://www.asket.com/img/width=750,format=webp,quality=70/https://asket.centracdn.net/client/dynamic/images/2_91cd261056-asket_tee_white_slide_01-original.jpg",
              "https://www.asket.com/img/width=750,format=webp,quality=70/https://asket.centracdn.net/client/dynamic/images/2_91cd261056-asket_tee_white_slide_01-original.jpg",
            ],
            discount: 5,
            price: 150000,
            postal_fee: 8000
          }
        ],
        customer: {
          name: "Asep",
          phone: "+6282247528881",
          address: "Komplek Bunga No.33, Pondok Pucung, Karang Tengah, Tangerang",
        }
      }
    ],
  },
  {
    title: "10 Mar 2020",
    data: [
      {
        id: 0,
        no: "00000008",
        status: "Pembayaraan Berhasil",
        ket: "BJB Virtual Account (Konfirmasi Otomatis)",
        customer_id: "0912234123",
        products: [
          {
            id: 0,
            name: 'Kamera',
            rating: 4,
            images: [
              "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
              "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
              "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
            ],
            discount: 10,
            price: 3250000,
            postal_fee: 40000
          },
          {
            id: 0,
            name: 'Kemeja Coklat',
            rating: 4,
            images: [
              "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
              "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
              "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
            ],
            discount: 0,
            price: 200000,
            postal_fee: 20000
          }
        ],
        customer: {
          name: "Bambang",
          phone: "+6285722845211",
          address: "Jl. RS. Fatmawati Raya No.1, Aspen Residence Tower A, No.17.10, Cilandak, Pondok Labu, Jakarta Selatan"
        }
      }
    ]
  },
];
