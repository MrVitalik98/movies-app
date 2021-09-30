import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import "../styles/globals.scss"
import Layout from '../components/Layout'
import store from '../store'


config.autoAddCss = false


const MyApp:FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
