/* @flow */ 
import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import createStore from './src/createStore';
import App from './src/App';
import renderHTML from './renderHTML';

const app = express();
const PORT = process.env.POT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use('/images', express.static('public/images'));

app.get('*', (req, res) => {
    
    const store = createStore();
    const context = {};

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    const preloadedState =
        serialize(store.getState())
        .replace(/</g, '\\u003c');

    const renderHTMLContent = renderHTML({
        body: content,
        preloadedState
    });
    
    res.send(renderHTMLContent);
})

app.listen(PORT, () => {
    console.log(`Application is Running on ${PORT}`)
});