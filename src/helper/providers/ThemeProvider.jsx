import * as React from 'react';
import * as Paper from 'react-native-paper';
import * as fontConfig from '../../constants/fontConfig';

const Theme = {
    ...Paper.DefaultTheme,
    fonts: Paper.configureFonts(fontConfig)
};

export default function ThemeProvider(props) {
    return (
        <Paper.Provider theme={Theme}>
            {props.children}
        </Paper.Provider>
    );
};
