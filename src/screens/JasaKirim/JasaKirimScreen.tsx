import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, shallowEqual } from 'react-redux';
import { useTheme, useNavigation, useRoute, StackActions } from '@react-navigation/native';
import { JasaKirimModalRouteProp, JasaKirimModalNavigationProp } from '../../types';
import { RootState } from '../../redux/rootReducer';

const data = [
  {id: 0, title: 'Pengiriman dalam Tangsel', data: ['1 - 2 Hari', '2 - 3 Hari', '3 - 4 Hari']},
  {id: 1, title: 'Pengiriman luar Tangsel', data: ['1 - 2 Hari', '2 - 3 Hari', '3 - 4 Hari', 'Lebih dari 7 hari']}
]

type Prop = {
  route: JasaKirimModalRouteProp
  navigation: JasaKirimModalNavigationProp
};

export default function JasaKirimScreen({route, navigation } : Prop) {
  const { pengiriman_dalam_tangsel, pengiriman_luar_tangsel } = useSelector((state: RootState) => state.shop.jasa_kirim, shallowEqual)

  const _handlePress = React.useCallback((title, data) => navigation.navigate('JasaKirimModalDetilScreen', {title, data }) ,[])
  const listItem = React.useMemo(
    () => ({ title, data }) => {
      const t = title.includes('dalam') ? pengiriman_dalam_tangsel : pengiriman_luar_tangsel
      return (
        <Paper.Surface style={styles.item}>
          <Paper.List.Item
            title={t}
            description={title}
            right={() => <Paper.List.Icon icon="chevron-right" />}
            onPress={() => _handlePress(title, data)}
            borderless
          />
        </Paper.Surface>
      )
    },
  [pengiriman_dalam_tangsel, pengiriman_luar_tangsel]);

  return (
    <FlatList
      style={{marginTop: 23}}
      data={data}
      keyExtractor={(item, index) => item.title}
      renderItem={({item}) => listItem(item)}
    />
  )
}

const styles = RN.StyleSheet.create({
  item: {
    borderRadius: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  }
})
