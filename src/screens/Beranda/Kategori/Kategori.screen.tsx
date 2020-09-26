import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import KategoriList from './KategoriList';
import KategoriItem from './KategoriItem';

export default function KategoriScreen () {
  function _renderItem ({item}) {
    return <KategoriItem item={item} />
  }
  return (
    <RN.View>
      <Paper.Text>Kategori Screen</Paper.Text>
      <KategoriList
        sections={DATA_KATEGORI}
        renderItem={_renderItem}
      />
    </RN.View>
  )
};

const DATA_KATEGORI = [{
  title: 'Khas Tangsel',
  description: 'Khas Tangsel Adalah Produk yang dipoduksi sendiri oleh Warga Tangerang Selatan',
  data: [{
    icon: 'close',
    title: 'Kuliner'
  }]
}]
