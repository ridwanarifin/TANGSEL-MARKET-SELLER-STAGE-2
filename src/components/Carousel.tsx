import * as React from 'react';
import _ from 'lodash';
import * as RN from 'react-native';
import * as Paper from 'react-native-paper';
import * as SnapCarousel from 'react-native-snap-carousel';
import ErrorBoundary from 'react-native-error-boundary';
import Fallback from './Fallback';
import Devices from '../constants/Layout';
import { DETAIL_ITEM as StaticItem } from '../static/home';
import Colors from '../constants/Colors';

export interface T {
    data: any[];
    children?: React.ReactNode;
    containerStyle?: RN.StyleProp<RN.ViewStyle>
};

export interface S {
    data: any[];
    activeIndex: number;
};

export class Carousel extends React.Component<T, S> {
    readonly state: S;
    private snapRef: any;
    constructor(props: T) {
        super(props)
        this.state = {
            data: [],
            activeIndex: 0
        }
        this.snapRef = React.createRef();
        this.onSnap = this.onSnap.bind(this);
        this.renderItem = this.renderItem.bind(this);
    };

    static defultProps = StaticItem;

    static getDerivedStateFromProps(next: T, prev: T): { data: any[] } | null {
        if (!_.isEqual(next, prev)) {
            return { data: next.data }
        };

        return null;
    };

    render() {
        return (
            <ErrorBoundary FallbackComponent={Fallback}>
                <SnapCarousel.default
                    data={this.state.data}
                    onSnapToItem={this.onSnap}
                    sliderWidth={SLIDE_WIDTH}
                    sliderHeight={189}
                    itemWidth={ITEM_WIDTH}
                    renderItem={this.renderItem}
                    hasParallaxImages={true}
                />
                {this.props.children}
                {this.pagination}
            </ErrorBoundary>
        )
    };

    get pagination (): JSX.Element {
        const {activeIndex, data} = this.state;
        return (
            <SnapCarousel.Pagination
                ref={this.snapRef}
                containerStyle={[styles.containerStyle, this.props.containerStyle]}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    };

    onSnap(activeIndex: number) {
        this.setState({ activeIndex });
    };

    renderItem({ item, index }:{item: any; index: number}, parallaxProps: SnapCarousel.AdditionalParallaxProps): JSX.Element {
        return (
            <RN.View key={index} style={styles.item}>
                <SnapCarousel.ParallaxImage
                    source={{ uri: item }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </RN.View>
        )
    };
};

export default Carousel;

const SLIDE_WIDTH: number = Devices.window.width;
const ITEM_WIDTH: number = SLIDE_WIDTH - 30;
const ITEM_HEIGHT: number = SLIDE_WIDTH / 1.5;
const styles = RN.StyleSheet.create({
    containerStyle: {backgroundColor: "transparent"},
    item: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    imageContainer: {
        flex: 1,
        marginBottom: RN.Platform.select({ ios: 0, android: 1 }),
        borderRadius: 5,
    },
    image: {
        ...RN.StyleSheet.absoluteFillObject,
        resizeMode: "cover"
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: "#2f80ed",
    },
    inactiveDotStyle: {
        backgroundColor: Colors.light.greyLight
    }
});
