import * as React from 'react';
import * as Paper from 'react-native-paper';
import * as RN from 'react-native';
import _ from 'lodash';

export type PenjualanType = {
  /**
   * Penjualan Type
   * @property IconPenjualanType
   * ```js
   * {
   *    id: number,
   *    title: string,
   *    icon: string,
   *    color: string
   * }
   * ```
   */
  data: Array<IconPenjualanType> | undefined
};

type IconPenjualanType = {
  id: number,
  title: string,
  icon: string,
  color: string,
} | undefined

const Penjualan: React.FC<PenjualanType> = (props): JSX.Element => {
  const { colors, fonts } = Paper.useTheme()
  const _itemIcon = React.useMemo(
    () => (item: IconPenjualanType, index: number) => {
      if (!item) { return }
      return (
        <Paper.TouchableRipple
          onPress={() => console.log('pressed')}
          key={index}
          style={styles._penjualan_content_item_container}
          borderless
        >
          <React.Fragment>
            <Paper.IconButton
              style={[{ backgroundColor: item.color }, styles._penjualan_content_item]}
              icon={item.icon}
              color="#fafafa"
              size={27}
            />
            <Paper.Text style={[styles._penjualan_content_item_title, fonts.medium]}>
              {item.title}
            </Paper.Text>
          </React.Fragment>
        </Paper.TouchableRipple>
      )
    },
  []);
  return (
    <RN.View style={[styles._penjualan, { backgroundColor: colors.surface }]}>
      <Paper.Headline style={fonts.medium}>Penjualan Saya</Paper.Headline>
      <RN.View style={styles._penjualan_content}>
        {_.map(props.data, _itemIcon)}
      </RN.View>
    </RN.View>
  )
};

export default React.memo(Penjualan, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const styles = RN.StyleSheet.create({
    _penjualan: {
      flex: 1,
      marginTop: 35,
      paddingTop: 5,
      paddingBottom: 22,
      paddingHorizontal: 15
    },
    _penjualan_content: {
      flex: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 15,
      paddingHorizontal: 5
    },
    _penjualan_content_item_container: {
      backgroundColor: 'transparent',
      flexDirection: 'column',
      minWidth: 100,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 34
    },
    _penjualan_content_item: {
      width: 52,
      minHeight: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16.9,
    },
    _penjualan_content_item_title: {
      fontSize: 12,
      lineHeight: 18,
      textAlign: 'center',
      textTransform: 'capitalize',
    },
})
