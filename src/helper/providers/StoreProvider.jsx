import * as React from 'react';
import { Provider as ProviderStore } from 'react-redux';
import store from '../../redux/store';

export default function StoreProvider(props) {
    return (
        <ProviderStore store={store}>
            {props.children}
        </ProviderStore>
    );
};
