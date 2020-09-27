import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import ErrorBoundary from 'react-native-error-boundary';
import { Asset } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardAnimationContext } from '@react-navigation/stack';
import { SvgUri } from 'react-native-svg';

import KategoriList from './KategoriList';
import KategoriItem from './KategoriItem';
import Fallback from '../../../helper/Fallback';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import { ScrollView } from 'react-native-gesture-handler';

export default function KategoriScreen () {
  const { colors } = Paper.useTheme();
  return (
    <SafeAreaView style={[styles.container]}>
    {/* <CardAnimationContext.Consumer>
      {value => ( */}
        <ScrollView>
          {_.map(DATA_KATEGORI, (data, idx: number) => (
            <Paper.List.Accordion
              key={idx}
              theme={{colors: {primary: colors.link}}}
              title={data.title}
              titleStyle={{textTransform: "capitalize"}}
              description="description">

              <ErrorBoundary FallbackComponent={Fallback}>
                <RN.View style={styles.containerIcon}>
                  {_.map(data.data, (item, index) =>
                    <Item key={index}
                      title={item}
                      index={index}
                      section={data.title}
                    />
                  )}
                </RN.View>
              </ErrorBoundary>
            </Paper.List.Accordion>
          ))}
        </ScrollView>
      {/* )}
    </CardAnimationContext.Consumer> */}
    </SafeAreaView>
  )
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  containerIcon: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      // paddingRight: 25,
      paddingLeft: "10%",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "rgba(219, 219, 219, 0.3)",
  },
  iconItem: {
      // borderWidth: 1,
      borderRadius: 16,
      borderColor: Colors.light.greyLighter,
      width: 52,
      height: 52,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5
  },
  containerIconitem: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
      paddingBottom: 10,
      // borderWidth: 1,
  },
  title: {
      marginTop: 5,
      textTransform: "capitalize",
      flexWrap: "wrap",
      textAlign: "center"
  }
});

type ItemProps = {title: string; index: number; section: any};
const Item = React.memo<(props: ItemProps) => JSX.Element>(
  (props): JSX.Element => {
    let URI: any = switchIconUriByName(props.section, props.title);
    return (
      <RN.View
          key={props.index}
          style={[styles.containerIconitem, {
              width: Layout.window.width / 4 - 20,
          }]}>
          <Paper.Surface style={styles.iconItem}>
              <Paper.TouchableRipple onPress={() => alert(props.title)}>
                  <SvgUri
                      width="28"
                      height="28"
                      uri={Asset.fromModule(URI).uri}
                  />
              </Paper.TouchableRipple>
          </Paper.Surface>
          <Paper.Text style={styles.title}>{props.title}</Paper.Text>
      </RN.View>
    );
  },
  (prev, next) => _.isEqual(prev, next)
);


function switchIconUriByName(
  section: CategoryContext,
  title: string,
):
  IconPria |
  IconWanita |
  IconKuliner |
  IconKerajinan |
  IconElektronik |
  IconTopupTagihan |
  undefined {

  const s: string = _.toLower(section)
  const t: string = _.toLower(title) ;
  switch (s) {
    case CategoryContext.PakaianPria:
      switch (t) {
        case "atasan":
            return IconPria.Atasan;
        case "bawahan":
            return IconPria.Bawahan;
        case "sport":
            return IconPria.Sport;
        case "aksesoris":
            return IconPria.Aksesoris;
        case "sepatu":
            return IconPria.Sepatu;
        case "jaket & luaran":
            return IconPria.Jaket;
      };
    break;

    case CategoryContext.PakaianWanita:
      switch (t) {
        case "atasan":
            return IconWanita.Atasan;
        case "bawahan":
            return IconWanita.Bawahan;
        case "tas":
            return IconWanita.Tas;
        case "aksesoris":
            return IconWanita.Aksesoris;
        case "sepatu":
            return IconWanita.Sepatu;
      }
    break;

    case CategoryContext.Kuliner:
      switch (t) {
        case "menu sarapan":
            return IconKuliner.Sarapan;
        case "makanan siap saji":
            return IconKuliner.SiapSaji;
        case "makanan beku":
            return IconKuliner.Beku;
        case "makanan kaleng":
            return IconKuliner.Kaleng;
        case "buah buahan":
            return IconKuliner.Buah;
        case "makanan ringan":
            return IconKuliner.Ringan;
        case "roti dan kue":
            return IconKuliner.Kue;
        case "makanan segar":
            return IconKuliner.Segar;
        case "minuman":
            return IconKuliner.Minuman;
      }
    break;

    case CategoryContext.Kerajinan:
      switch (t) {
        case "kerajinan kayu":
            return IconKerajinan.Kayu;
        case "furniture":
            return IconKerajinan.Furniture;
        case "keramik":
            return IconKerajinan.Keramik;
      };
    break;

    case CategoryContext.Elektronik:
      switch (t) {
        case "audio":
            return IconElektronik.Audio;
        case "handphone":
            return IconElektronik.Handphone;
        case "kamera":
            return IconElektronik.Kamera;
        case "komputer & laptop":
            return IconElektronik.Komputer;
        case "tv & monitor":
            return IconElektronik.Tv;
        case "elektronik rumah tangga":
            return IconElektronik.RumahTangga;
      };
    break;

    case CategoryContext.TopupTagihan:
      switch (t) {
        case "beli pulsa":
            return IconTopupTagihan.Pulsa;
        case "paket internet":
            return IconTopupTagihan.Internet;
        case "pulsa listrik":
            return IconTopupTagihan.Listrik;
        case "pdam":
            return IconTopupTagihan.Pdam;
      }
    break
  };
};


const DATA_KATEGORI = [{
  title: "pakaian pria",
  data: [
      "atasan",
      "bawahan",
      "sport",
      "aksesoris",
      "sepatu",
      "jaket & luaran",
  ]
},{
  title: "pakaian wanita",
  data: [
      "atasan",
      "bawahan",
      "tas",
      "aksesoris",
      "sepatu",
  ]
},{
  title: "kuliner",
  data: [
      "menu sarapan",
      "makanan siap saji",
      "makanan beku",
      "makanan kaleng",
      "buah buahan",
      "makanan ringan",
      "roti dan kue",
      "makanan segar",
      "minuman",
  ]
},{
  title: "kerajinan",
  data: [
      "kerajinan kayu",
      "furniture",
      "keramik",
  ]
},{
  title: "elektronik",
  data: [
      "audio",
      "handphone",
      "kamera",
      "komputer & laptop",
      "tv & monitor",
      "elektronik rumah tangga",
  ]
},{
  title: "top up & tagihan",
  data: [
      "beli pulsa",
      "paket internet",
      "pulsa listrik",
      "pdam",
  ]
}]



/**
 *
 *
 * @enum {string} enum for section
 */
enum CategoryContext {
  PakaianPria = "pakaian pria",
  PakaianWanita = "pakaian wanita",
  Kuliner = "kuliner",
  Kerajinan = "kerajinan",
  Elektronik = "elektronik",
  TopupTagihan = "top up & tagihan",
};

/**
*
*
* @enum {string | NodeRequire} for url svg icon pria
*/
enum IconPria {
  Aksesoris = require("../../../assets/svg/pria/aksesoris.svg"),
  Atasan = require("../../../assets/svg/pria/atasan.svg"),
  Bawahan = require("../../../assets/svg/pria/bawahan.svg"),
  Jaket = require("../../../assets/svg/pria/jaket.svg"),
  Sepatu = require("../../../assets/svg/pria/sepatu.svg"),
  Sport = require("../../../assets/svg/pria/sport.svg"),
};

/**
*
*
* @enum {string | NodeRequire} for url svg icon wanita
*/
enum IconWanita {
  Aksesoris = require("../../../assets/svg/wanita/aksesoris.svg"),
  Atasan = require("../../../assets/svg/wanita/atasan.svg"),
  Bawahan = require("../../../assets/svg/wanita/bawahan.svg"),
  Sepatu = require("../../../assets/svg/wanita/sepatu.svg"),
  Tas = require("../../../assets/svg/wanita/tas.svg"),
};

/**
*
*
* @enum {string | NodeRequire} for url svg icon kuliner
*/
enum IconKuliner {
  Beku = require("../../../assets/svg/kuliner/beku.svg"),
  Buah = require("../../../assets/svg/kuliner/buah.svg"),
  Kaleng = require("../../../assets/svg/kuliner/kaleng.svg"),
  Kue = require("../../../assets/svg/kuliner/kue.svg"),
  Minuman = require("../../../assets/svg/kuliner/minuman.svg"),
  Ringan = require("../../../assets/svg/kuliner/ringan.svg"),
  Sarapan = require("../../../assets/svg/kuliner/sarapan.svg"),
  Segar = require("../../../assets/svg/kuliner/segar.svg"),
  SiapSaji = require("../../../assets/svg/kuliner/siap_saji.svg"),
};

/**
*
*
* @enum {string | NodeRequire} for url svg icon kerajinan
*/
enum IconKerajinan {
  Furniture = require("../../../assets/svg/kerajinan/furniture.svg"),
  Kayu = require("../../../assets/svg/kerajinan/kayu.svg"),
  Keramik = require("../../../assets/svg/kerajinan/keramik.svg"),
};

/**
*
*
* @enum {string | NodeRequire} for url svg icon elektronik
*/
enum IconElektronik {
  Audio = require("../../../assets/svg/elektronik/audio.svg"),
  Handphone = require("../../../assets/svg/elektronik/handphone.svg"),
  Kamera = require("../../../assets/svg/elektronik/kamera.svg"),
  Komputer = require("../../../assets/svg/elektronik/komputer.svg"),
  RumahTangga = require("../../../assets/svg/elektronik/rumah_tangga.svg"),
  Tv = require("../../../assets/svg/elektronik/tv.svg"),
};

enum IconTopupTagihan {
  Internet = require("../../../assets/svg/topup_tagihan/internet.svg"),
  Listrik = require("../../../assets/svg/topup_tagihan/pulsa_listrik.svg"),
  Pdam = require("../../../assets/svg/topup_tagihan/pdam.svg"),
  Pulsa = require("../../../assets/svg/topup_tagihan/pulsa.svg"),
}
