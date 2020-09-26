import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _, { isEmpty } from 'lodash';
import ErrorBoundary from 'react-native-error-boundary';
import Fallback from '../helper/Fallback';

type P = {
    containerStyle?: RN.StyleProp<RN.ViewStyle>;
    heading: string;
    headingStyle?: RN.StyleProp<RN.TextStyle>;
    tableContainerStyle?: RN.StyleProp<RN.ViewStyle>;
    data: any;
};
/**
 * @component Table
 * 
 * @param containerStyle ` StyleProp<ViewStyle> ` (optional)
 *
 * @param heading ` string `
 *
 * @param data ` { kategori: string; berat: string, tipe: string } `
 * 
 * @param tableContainerStyle ` StyleProp<ViewStyle> ` (optional)
 */
const Table : React.FC <P> = ({
    containerStyle,
    heading,
    headingStyle,
    data,
    tableContainerStyle
}) : JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <RN.View style={containerStyle}>
                <Paper.Subheading style={[styles.heading, headingStyle]}>
                    {heading}
                </Paper.Subheading>
                <Paper.Divider style={styles.divider}/>
                <RN.View style={tableContainerStyle}>
                    {_.map((data), (val, key) => (
                        <Paper.DataTable.Row key={key}>
                            <Paper.DataTable.Cell>
                                <Paper.Text style={styles.item}>
                                    {_.capitalize(key)}
                                </Paper.Text>
                            </Paper.DataTable.Cell>
                            <Paper.DataTable.Cell>
                                <Paper.Text style={styles.item}>
                                    {_.capitalize(val)}
                                </Paper.Text>
                            </Paper.DataTable.Cell>
                        </Paper.DataTable.Row>
                    ))}
                </RN.View>
            </RN.View>
        </ErrorBoundary>
    );
};

export default React.memo(Table, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const styles = RN.StyleSheet.create({
    capitalize: { textTransform: "capitalize" },
    heading: {
        textTransform: "capitalize",
        fontWeight: "bold",
    },
    divider: {
        height: 1.5,
        marginTop: 10,
        marginBottom: 10
    },
    item: {
        fontSize: 12
    }
});
