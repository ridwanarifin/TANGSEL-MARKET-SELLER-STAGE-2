import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { JasaKirimModalRouteProp, JasaKirimModalNavigationProp } from '../../types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { setJasaKirimDalamTangsel, setJasaKirimLuarTangsel, JasaKirim } from '../../redux/shopSlice';
import { RootState } from '../../redux/rootReducer';
import { useTheme } from '@react-navigation/native';
import layout from '../../constants/Layout';

type Prop = {
  route: JasaKirimModalRouteProp
  navigation: JasaKirimModalNavigationProp
}

export default function JasaKirimDetilScreen (props: Prop) {
  const { params } = props.route;
  const { colors } = Paper.useTheme();
  const { colors: navColors } = useTheme()
  const dispatch = useDispatch();

  const { pengiriman_dalam_tangsel, pengiriman_luar_tangsel } = useSelector ((state: RootState) => state.shop.jasa_kirim, shallowEqual)

  const _setSelected = (text: string) => {
    setSelected(text);
  };

  const initValueJasaKirim = (): string => {
    if (params.title.includes("luar")) {
      return pengiriman_luar_tangsel;
    }
    return pengiriman_dalam_tangsel;
  };

  const _submit = () => {
    try {
      if (params.title.includes("luar")) {
        dispatch(setJasaKirimLuarTangsel(selected));
      } else {
        dispatch(setJasaKirimDalamTangsel(selected));
      }
    } finally {
      props.navigation.goBack();
    }
  };

  const [selected, setSelected] = React.useState<string>(initValueJasaKirim());

  return (
    <SafeAreaView style={{paddingTop: 15}}>
      <RN.FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item}
        data={params.data}
        renderItem={({item}) => {
          return (
            <Paper.Surface style={[styles.item, _.isEqual(selected, item) ? {backgroundColor: "rgba(8, 160, 233, 0.05)"} : null]}>
              <Paper.List.Item
                titleStyle={{color: _.isEqual(selected, item) ? colors.link : colors.text }}
                title={item}
                onPress={() => _setSelected(item)}
                rippleColor="rgba(8, 160, 233, 0.05)"
                borderless
                right={() => (
                  <Paper.RadioButton
                    value={item}
                    status={_.isEqual(selected, item) ? "checked" : "unchecked"}
                    color={colors.link}
                    onPress={() => _setSelected(item)}
                  />
                )}
              />
            </Paper.Surface>
          )}
        }
        indicatorStyle={"black"}
        ItemSeparatorComponent={() => <Paper.Divider style={styles.separator} />}
      />
      <RN.View style={styles.footer}>
        <Paper.TouchableRipple onPress={_submit} borderless style={[styles.btn, {backgroundColor: colors.link}]}>
          <Paper.Subheading style={{color: colors.background}}>Simpan</Paper.Subheading>
        </Paper.TouchableRipple>
      </RN.View>
    </SafeAreaView>
  )
}

const { window } = layout;
const styles = RN.StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 228,
    minHeight: 47,
    borderRadius: 32,
    elevation: 3
  },
  btn__text: {
    fontFamily: "roboto-medium",
    textAlign: "center",
  },
  contentContainer: {
    paddingHorizontal: 15,
    minHeight: window.height - 130,
    position: "relative"
  },
  item: {
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 56,
  },
  separator: {
    marginVertical: 8,
  },
  footer: {
    bottom: 0,
    alignItems: "center",
    position: "absolute",
    width: "100%",
  }
})
