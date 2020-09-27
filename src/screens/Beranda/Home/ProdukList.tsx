import * as React from 'react';
import  * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

export default function ProdukList(props: RN.FlatListProperties<any>) {
  const { colors } = Paper.useTheme();
  return (
    <FlatList
      {...props}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={[styles.columnWrapper, {backgroundColor: colors.surface}]}
      ItemSeparatorComponent={() => <Paper.Divider style={{marginVertical: 5}} />}
    />
  );
};

const styles = RN.StyleSheet.create({
  columnWrapper: {
    // flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})
