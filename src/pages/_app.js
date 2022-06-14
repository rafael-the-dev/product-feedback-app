import * as React from 'react';
//import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { theme } from 'src/material-ui/theme';
import createEmotionCache from 'src/material-ui/createEmotionCache';
//import { Provider } from 'react-redux';
import { ApolloProvider } from "@apollo/client"
//import { store } from 'src/redux/store';

import Layout from 'src/components/Layout';
import 'src/styles/reset.css'
import 'src/styles/globals.css'
import 'src/styles/tailwind.css'
import { AppContextProvider } from 'src/context/AppContext';
import client from 'src/graphql/apollo-client';
import { LoginContextProvider } from 'src/context/LoginContext';

import { SubscriptionContextProvider } from "src/context/SubscriptionContext"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ApolloProvider client={client}>
                <LoginContextProvider>
                    <SubscriptionContextProvider>
                        <AppContextProvider>
                            <CacheProvider value={emotionCache}>
                                <ThemeProvider theme={theme}>
                                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                                    <CssBaseline />
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                </ThemeProvider>
                            </CacheProvider>
                        </AppContextProvider>
                    </SubscriptionContextProvider>
                </LoginContextProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
