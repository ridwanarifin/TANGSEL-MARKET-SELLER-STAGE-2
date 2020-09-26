import * as React from 'react';
import * as Safe from 'react-native-safe-area-context';

export default function SafeAreaProvider(props: Safe.SafeAreaViewProps) {
    return (
        <Safe.SafeAreaProvider initialSafeAreaInsets={props.initialSafeAreaInsets}>
            {props.children}
        </Safe.SafeAreaProvider>
    );
};
