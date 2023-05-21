import React from 'react';
import App from '../src/App.js';
import {store} from './app/store.js';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client'
import {ContextProvider} from './app/ContextProvider.js';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ContextProvider>
            <App/> 
        </ContextProvider>

    </Provider>

)
