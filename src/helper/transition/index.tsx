import * as React from 'react';
import * as RN from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { CardAnimationContext } from '@react-navigation/stack';

export function ScaleAnimate(props) {
    return (
        <ErrorBoundary onError={(error: Error, stackTrace: string) => console.log(error)}>
            <CardAnimationContext.Consumer>
                {value => props.children({ style: {
                    opacity: value?.current.progress,
                    transform: [{ scale: value?.current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.25, 1]
                    })}]
                }})}
            </CardAnimationContext.Consumer>
        </ErrorBoundary>
    );
};

const styles = RN.StyleSheet.create({})
