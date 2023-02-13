import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';

import { Provider } from 'react-redux';
import { selectedTickerStore } from '../store/store';

import Heading from '../components/heading';
import getDate from '../lib/getDate';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const todayDateStrYMD = getDate(); //get today's date
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={selectedTickerStore}>
        <Head>
          <title>Ocean Impact Score</title>
          <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Container maxWidth="md" >
            <Heading todayDateStrYMD={todayDateStrYMD} />
            <Component {...pageProps } />
          </Container>  
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}