import * as React from 'react';
import * as Paper from 'react-native-paper';
import * as RN from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import * as Linking from 'expo-linking';

import layout from '../../../constants/Layout';
import PenjualanSection from './PenjualanSection';
import ProfilSection from './ProfilSection';
import { RootState } from '../../../redux/rootReducer';
import ProdukList from './ProdukList';
import ProdukItem from './ProdukItem';
import { HomeScreenRouteProp, HomeScreenNavigationProp } from '../../../types';
import AsyncStorage from '@react-native-community/async-storage';


const dataPenjualan: Array<PenjualanType> | undefined = [
  {id: 0, title: 'Pesanan masuk', icon: 'email-open-outline', color: '#B14AFD'},
  {id: 1, title: 'Dikemas', icon: 'package-variant-closed', color: '#FB9400'},
  {id: 2, title: 'Sedang dikirim', icon: 'truck-fast', color: '#00D8FD'},,
  {id: 3, title: 'Selesai', icon: 'file-document-box-check', color: '#00D8FD'},
  {id: 4, title: 'Dibatalkan', icon: 'file-document-box-remove-outline', color: '#00D8FD'}
]

type Prop = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}
type PenjualanType = {
  id: number,
  title: string,
  icon: string,
  color: string,
} | undefined
type ActionType = Array<string> | undefined

export default function HomeScreen(props : Prop) {
  const { name, avatar, address, phone } = useSelector((state: RootState) => state.shop, shallowEqual)
  const { colors } = Paper.useTheme();
  const [penjualan, setPenjualan] = React.useState<Array<PenjualanType> | undefined>(dataPenjualan)
  const PERSISTENCE_KEY = 'NAVIGATION_STATE';

  const [stateFromStrg, setInitialState] = React.useState<any>('');
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = Linking.getInitialURL();
        if (RN.Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          console.log(savedStateString);

          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          console.log(savedStateString)
          console.log(initialUrl);

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    restoreState()
  }, []);

  const _renderHeaderComponent = () => (
    <RN.View>
      <ProfilSection
        data={{
          avatar: {uri: avatar},
          name: name,
          location: address,
          phone: phone
        }}
      />
      <Paper.Text>{stateFromStrg} </Paper.Text>
      <PenjualanSection data={penjualan} />

      <Paper.Card style={styles._actions_container}>
        <Paper.Card.Content>
          <Paper.Surface style={[styles._action_list, { backgroundColor: colors.background }]}>
            <Paper.List.Item
              style={{borderRadius: 16}}
              title="Saldo Saya"
              right={() =>
                <Paper.List.Icon icon="chevron-right" />
              }
              borderless
              titleStyle={styles._action_title}
            />
          </Paper.Surface>

          <Paper.Surface style={[styles._action_list, { backgroundColor: colors.background }]}>
            <Paper.List.Item
              style={{borderRadius: 16}}
              title="Penilaian Toko"
              right={() =>
                <Paper.List.Icon icon="chevron-right" />
              }
              borderless
              titleStyle={styles._action_title}
            />
          </Paper.Surface>

          <Paper.Surface style={[styles._action_list, { backgroundColor: colors.background }]}>
            <Paper.List.Item
              style={{borderRadius: 16}}
              title="Jasa Kirim Saya"
              onPress={() => props.navigation.navigate('JasaKirimModal')}
              right={() =>
                <Paper.List.Icon icon="chevron-right" />
              }
              borderless
              titleStyle={styles._action_title}
            />
          </Paper.Surface>
        </Paper.Card.Content>
        <Paper.Card.Actions style={styles._action_button_container}>
          <Paper.Button
            mode="contained"
            color={colors.link}
            style={styles._action_button}
            labelStyle={{textTransform: 'capitalize'}}
            onPress={() => props.navigation.navigate('KategoriScreen')}
          >
            Tambah Produk
          </Paper.Button>
        </Paper.Card.Actions>
      </Paper.Card>
    </RN.View>
  )

  return (
    <SafeAreaView>
      <ProdukList
        data={DATA_PRODUCT}
        ListHeaderComponent={_renderHeaderComponent}
        renderItem={({item}) => <ProdukItem item={item} onPress={() => props.navigation.push('DetilScreen', item)} />}
      />
    </SafeAreaView>
  )
};

const DATA_PRODUCT = [{
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
    reviews: 5,
    specs: {
      kategori: 'Kategori',
      weight: '250 gram',
      type: 'Katun',
      size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
  },{
    id: 1,
    name: 'Kamera',
    rating: 4,
    images: [
      "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
      "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
      "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/03/Blog_Rekomendasi-Kamera-Mirrorless-Canon-Terbaik-Terfavorit-696x360.jpg",
    ],
    discount: 10,
    price: 3250000,
    reviews: 10,
    specs: {
      kategori: 'Elektronik/Kamera',
      weight: '',
      type: '',
      size: ''
    },
    descriptions: 'Kamera mirrorless memiliki bodi yang lebih kecil dari kamera digital single-lens reflex (DSLR). Bentuk bodi yang compact memberikan keuntungan bagi pengguna yang mengutamakan mobilitas dengan ukuran kamera yang lebih ringan.',
  },{
    id: 2,
    name: 'Kemeja Coklat',
    rating: 4,
    images: [
      "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
      "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
      "https://cf.shopee.co.id/file/8c81a497b92d4c5908fdc2185cb59ae3",
    ],
    discount: 0,
    price: 200000,
    reviews: 10,
    specs: {
      kategori: 'Pakaian Pria',
      weight: '',
      type: '',
      size: ''
    },
    descriptions: 'Kamera mirrorless memiliki bodi yang lebih kecil dari kamera digital single-lens reflex (DSLR). Bentuk bodi yang compact memberikan keuntungan bagi pengguna yang mengutamakan mobilitas dengan ukuran kamera yang lebih ringan.',
  },{
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
    reviews: 5,
    specs: {
      kategori: 'Kategori',
      weight: '250 gram',
      type: 'Katun',
      size: 'M (m)'
    },
    descriptions: 'Kaos Polos cotton combed 20s standar distro, bahan cotton combed 20s standar distro yang halus dan lembut. Tanpa merek, cocok untuk sablon DTG, digital, atau manual, ready stock dan siap kirim gojek wilayah jakarta. Tersedia ukuran S sampai XXXL.',
  }
]

const { window } = layout;
const styles = RN.StyleSheet.create({
  container: {
  },
  _item__container: {
    width: '45%'
  },
  // actions
  _actions_container: {
    marginTop: 35,
    paddingTop: 30,
    paddingBottom: 30
  },
  _action_title: {
    fontFamily: 'roboto-medium',
    fontSize: 14,
    textTransform: 'capitalize'
  },
  _action_list: {
    // borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  _action_button_container: {
    marginTop: 15,
    justifyContent: 'center',
  },
  _action_button: {
    fontFamily: 'roboto-medium',
    fontSize: 18,
    borderRadius: 32,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20
  }
})
