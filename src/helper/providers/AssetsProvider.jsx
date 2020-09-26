import * as React from 'react';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

export default function AssetsProvider(props) {
    const [loaded] = useFonts({
        'roboto-light': require('../../assets/fonts/roboto/light.ttf'),
        'roboto-medium': require('../../assets/fonts/roboto/medium.ttf'),
        'roboto-regular': require('../../assets/fonts/roboto/regular.ttf'),
        'roboto-thin': require('../../assets/fonts/roboto/thin.ttf')
    });
    return !loaded ? <AppLoading /> : props.children;
};
