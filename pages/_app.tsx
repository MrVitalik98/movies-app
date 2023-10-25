import { useEffect } from 'react';
import { useRouter } from 'next/router';
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import "../styles/globals.scss"
import Layout from '../components/Layout'
import store from '../store'

declare global {
  interface Window {
    dataLayer: any[];
  }
}

config.autoAddCss = false


const MyApp:FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  // Listen for route changes to ensure GTM reloads on page navigation
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Replace 'GTM-KHGWKWGL' with your GTM Container ID
      window.dataLayer.push({ event: 'pageview', page: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);


  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
