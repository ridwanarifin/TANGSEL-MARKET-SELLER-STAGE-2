import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';

function KategoriItem ({ item }) {
  return (
    <RN.View>
      <Paper.Text> {JSON.stringify(item)} </Paper.Text>
    </RN.View>
  )
};

export default React.memo(
  KategoriItem,
  (prevProps, nextProps) =>
  _.isEqual(prevProps, nextProps)
)