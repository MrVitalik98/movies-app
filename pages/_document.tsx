import { FC } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document<FC> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Here you can easily watch movies of all genres." />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
        </Head>
        <body>
          <Main />
          <NextScript />

          <script defer src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument