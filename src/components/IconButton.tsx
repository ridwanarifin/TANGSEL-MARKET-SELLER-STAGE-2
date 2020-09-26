import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import Constants from 'expo-constants';
import _ from 'lodash';
import Colors from '../constants/Colors';
import { IconButtonProps } from 'react-native-vector-icons/Icon';

const DefaultProps: T = {
    name: "chat",
    size: Constants.statusBarHeight * 1.2,
    color: Colors.whiteBis,
};

export interface T extends IconButtonProps {
    /**
     * name icon from material design
     */
    name: string;
    /**
     * style view of container icon
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;
    /**
     * value badge of icon
     */
    value?: number;
    children?: React.ReactNode;
};

const IconButton: React.FC<T> = (props): JSX.Element => {

    const renderBadge = React.useMemo<JSX.Element>(
        (): JSX.Element => (
            <Paper.Badge style={styles.badge}>{props.value}</Paper.Badge>
        ),
    []);

    return (
        <RN.View style={[props.containerStyle, styles.container]}>
            <Paper.IconButton
                icon={props.name}
                animated={true}
                borderless={true}
                style={[props.style, { zIndex: 3}]}
                size={props.size}
                {...props}
            />
            {props.value ? renderBadge : null}
            {props.children}
        </RN.View>
    );
};

IconButton.defaultProps = DefaultProps;
export default React.memo(IconButton, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const styles = RN.StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 3,
    },
    badge: {
        position: "absolute",
        top: 3,
    },
    plus: {
        position: "absolute",
        backgroundColor: Colors.light.danger,
        width: 20,
        height: 20,
        top: -7,
        right: -7
    }
});
