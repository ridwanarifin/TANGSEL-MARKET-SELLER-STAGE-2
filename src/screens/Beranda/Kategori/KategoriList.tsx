import * as React from 'react';
import * as RN from 'react-native';

export default function KategoriList (props: RN.SectionListProps<any>) {
  return (
    <RN.SectionList
      {...props}
      keyExtractor={(item, index) => item + index}
    />
  );
};
