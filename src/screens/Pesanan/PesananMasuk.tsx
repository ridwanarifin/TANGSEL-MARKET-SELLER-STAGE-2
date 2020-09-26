import * as React from 'react';
import * as RN from 'react-native'
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import baseStyle from '../../styles';
import Layout from '../../constants/Layout';

function PesananMasuk() {
  const { colors } = Paper.useTheme();
  const [q, setQ] = React.useState<string | undefined>("");
  const [showModal, setShowModal]   = React.useState<boolean>(false);
  const [context, setContext]       = React.useState<"baru" | "lama">("baru");

  const _handleModal = React.useCallback(() => setShowModal(v => !v), [])
  const ModalUrutkan = React.useMemo(() =>
    (
        <Paper.Modal contentContainerStyle={{backgroundColor: colors.surface}} visible={showModal} onDismiss={_handleModal}>
          <Paper.List.Item title="Tanggal Paling baru" right={() => <Paper.Checkbox status={context == "baru" ? "checked" : "unchecked"} />} />
          <Paper.List.Item title="Tanggal Paling lama" right={() => <Paper.Checkbox status={context == "lama" ? "checked" : "unchecked"} />} />
        </Paper.Modal>
    )
  ,[showModal])
  return (
    <SafeAreaView>
      <Paper.Surface style={styles.section}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[{
            id: 0,
            title: "Pesanan masuk",
            count: 3
          },{
            id: 1,
            title: "Dikemas",
            count: 2
          },{
            id: 2,
            title: "Sedang Dikirim",
            count: 4
          }]}
          renderItem={({ item }) => {
            return (
              <Paper.Button uppercase={false} color={colors.link} mode="contained"> {item.title} </Paper.Button>
            )
          }}
          indicatorStyle="white"
          contentContainerStyle={{paddingBottom: 10}}
          scrollIndicatorInsets={{left: 5, right: 5}}
          ItemSeparatorComponent={
            () => <Paper.Divider style={{paddingHorizontal: 5, alignSelf: "center"}} />
          }
          horizontal
        />
      </Paper.Surface>

      <Paper.Surface style={[{flexDirection: "row"}, styles.section]}>
        <RN.View style={{width: "60%"}}>
          <Paper.Searchbar
            value={q}
            onChangeText={text => setQ(text)}
            theme={{
              colors: {
                placeholder: "#B5B5B5"
              }
            }}
            placeholder="Cari Pesanan Disini"
            numberOfLines={1}
            inputStyle={{fontSize: 14, color: '#B5B5B5'}}
            style={{borderRadius: 16}}
          />
        </RN.View>

        <Paper.Surface style={{flexDirection: "row"}}>
          {/* <Paper.Portal> */}
          {/* <Paper.Modal visible={showModal} onDismiss={_handleModal}>
            <Paper.List.Item title="Tanggal Paling baru" right={() => <Paper.Checkbox status={context == "baru" ? "checked" : "unchecked"} />} />
            <Paper.List.Item title="Tanggal Paling lama" right={() => <Paper.Checkbox status={context == "lama" ? "checked" : "unchecked"} />} />
          </Paper.Modal> */}

          <Paper.IconButton
            onPress={_handleModal}
            icon={({size, color}) => {
              return (
                <RN.Image
                  source={require('../../assets/order-icon.png')}
                  style={{width: size, height: size, tintColor: color}}
                />
              )
            }}
          />
          <Paper.Text>Urutkan</Paper.Text>
          {/* </Paper.Portal> */}
        </Paper.Surface>
      </Paper.Surface>

      {ModalUrutkan}
    </SafeAreaView>
  )
};

export default React.memo(
  PesananMasuk,
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
);

const styles = RN.StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  }
})
