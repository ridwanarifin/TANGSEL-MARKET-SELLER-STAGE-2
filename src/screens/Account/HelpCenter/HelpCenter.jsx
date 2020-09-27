import * as React from 'react'
import * as RN from 'react-native'
import * as Paper from 'react-native-paper'

export default function HelpCenter(props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <RN.View>
      <RN.View style={styles.container} >
        <Paper.Searchbar
          style={styles.searchBar}
          placeholder="Misal : Pesanan belum dikirim"
          clearIcon=""
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </RN.View>

      {/* Items */}
      {data.map((d,i) => {
        return (
          <RN.View style={[styles.mtMd, styles.containerList]} key={i}>
            <Paper.List.Item
              title={d.name}
              right={props => <Paper.List.Icon {...props} icon="chevron-right" />}
              onPress={() => props.navigation.navigate('HelpCenterList', {listItem:d.items, name:d.name})}
            />
          </RN.View>
        )
      })}
    </RN.View>
  )
}

const styles = RN.StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  containerList:{
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  mtMd: {
    marginTop: 8
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#fafafa',
    borderRadius: 9999,
    borderColor: '#B5B5B5',
    borderWidth: .3
  }
})

const data = [
  {
    name: 'Akun Saya',
    items: [
      {
        name: 'cara daftar akun',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'Cara Login',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'lupa kata sandi',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'saya tidak menerima kode OTP',
        content: 'lorem ipsum dolor sit amet'
      },
    ]
  }, {
    name: 'Pesanan Saya',
    items: [
      {
        name: 'masalah pesanan',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'tidak dapat membayar',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'laporkan Pembeli',
        content: 'lorem ipsum dolor sit amet'
      },
      {
        name: 'kurir bermasalah',
        content: 'lorem ipsum dolor sit amet'
      },
    ]
  }
]
