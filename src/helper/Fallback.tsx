import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import Colors from '../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

type P = {
    containerStyle?: RN.StyleProp<RN.ViewStyle>;
    error: Error;
    resetError: () => void;
};
/**
 * @component Fallback
 * 
 * @param containerStyle `StyleProp<ViewStyle>`
 * 
 * @param error `{name: string; message: string; stack?: string;}`
 * 
 * @param resetError `() => void`
 */
const Fallback: React.FC<P> = ({
    containerStyle,
    error,
    resetError
}): JSX.Element => {
    return (
        <Paper.Surface style={[styles.container, containerStyle]}>
            <Paper.Headline>Oops!</Paper.Headline>
            <Paper.Subheading>
                Something went wrong. We are working on getting
                this fixed as soon as we can. You may be able to
                try again.
            </Paper.Subheading>
            <Paper.Divider style={styles.divider} />
            <ScrollView style={styles.scroll}>
                <Paper.Text>
                    {_.toString(error)}
                </Paper.Text>
            </ScrollView>
            <Paper.Button
                style={styles.button} 
                color={Colors.link}
                dark
                mode="contained"
                onPress={resetError}>
                Try again
            </Paper.Button>
        </Paper.Surface>
    );
};

export default Fallback;

const styles = RN
    .StyleSheet
    .create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'papayawhip',
            padding: 10,
            elevation: 8
        },
        button: {
            marginTop: 20,
            padding: 10,
            borderRadius: 18,
        },
        scroll: {
            maxHeight: 200
        },
        divider: {
            marginTop: 10,
            marginBottom: 10,
            height: 2
        }
    });
