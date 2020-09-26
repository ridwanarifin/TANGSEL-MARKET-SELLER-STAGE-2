import * as React from 'react';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import _ from 'lodash';
import { numberFormat } from '../helper/numberFormat';
import Colors from '../constants/Colors';
import ErrorBoundary from 'react-native-error-boundary';
import Fallback from '../helper/Fallback';

export interface PriceDiscountProps {
    containerStyle?: RN.StyleProp<RN.ViewStyle>;
    price: number;
    discount?: number | null;
};

const PriceDiscount: React.FC<PriceDiscountProps> = ({
    containerStyle,
    price,
    discount,
}): JSX.Element => {
    const { fonts } = Paper.useTheme();
    const Heading = React.useMemo(() => (
        <Paper.Subheading style={[styles.priceDiscount, {...fonts.medium}]}>
            {numberFormat.format(
                discount
                    ? price - (price * discount / 100)
                    : price
            )}
        </Paper.Subheading>
    ), [price, discount]);

    const PriceAndDiscount = React.useMemo(() => (
        <RN.View style={[styles.row]}>
            <Paper.Text style={[styles.price, {...fonts.medium}]}>
                {numberFormat.format(price)}
            </Paper.Text>
            <Paper.Text style={[styles.discount, {...fonts.medium}]}>
                -{discount}%
            </Paper.Text>
        </RN.View>
    ), [price, discount]);

    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <RN.View style={containerStyle}>
                {Heading}
                {discount ? PriceAndDiscount : null}
            </RN.View>
        </ErrorBoundary>
    );
};

export default React.memo(PriceDiscount, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export const styles = RN.StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    discount: {
        color: Colors.light.danger,
        marginLeft: 20,
        fontSize: 12
    },
    priceDiscount: {
        color: Colors.light.link,
        fontSize: 16
    },
    price: {
        color: Colors.light.greyLight,
        fontSize: 12,
        textDecorationLine: "line-through"
    }
});
