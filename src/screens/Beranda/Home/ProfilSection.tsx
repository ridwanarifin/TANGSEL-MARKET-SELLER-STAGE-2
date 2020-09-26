import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';

type IconType = {
  icon: string;
  iconStyle?: RN.StyleProp<RN.TextStyle>;
  title?: string;
} ;

type ProfilType = {
  data: {
    avatar: RN.ImageSourcePropType,
    name: string,
    location: string,
    phone: string,
  }
}

const Profil = ((props : ProfilType):
  JSX.Element => {
    const { colors } = Paper.useTheme();
    const { data } = props;

    const item = React.useMemo(() => ({
       icon, iconStyle={marginRight: 11}, title
    } : IconType) => {
        return (
          <RN.Text>
            <MaterialIcons color="#30DE9F" size={14} name={icon} style={iconStyle} />
            <Paper.Paragraph> {title} </Paper.Paragraph>
          </RN.Text>
        )
      },
    []);

    return (
      <RN.View style={[styles.container,{backgroundColor: colors.surface }]}>
        <Paper.Avatar.Image
          style={styles.profile__avatar}
          source={data.avatar}
        />
        <Paper.Title style={styles.profile__name}>
          {data.name}
        </Paper.Title>
        <RN.View style={styles.profile__content}>
          <RN.View style={styles.profile__content_item}>
            {item({icon: "location-on", title: data.location})}
          </RN.View>
          <RN.View style={styles.profile__content_item}>
            {item({icon: "phone", title: data.phone})}
          </RN.View>
        </RN.View>
      </RN.View>
    )
  }
);

export default React.memo (
  Profil, (prevProps, nextProps) =>
  _.isEqual (prevProps, nextProps)
);

const styles = RN.StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingBottom: 67,
    alignItems: "center"
  },
  profile__avatar: { alignSelf: "center" },
  profile__name: {
    marginTop: 5,
    textAlign: "center"
  },
  profile__content: {
    marginTop: 20,
    flexDirection: "column"
  },
  profile__content_item: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    marginBottom: 9
  }
});
