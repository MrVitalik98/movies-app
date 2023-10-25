import { FC } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document<FC> {
  render() {
    return (
      <Html lang="en">
        <Head>
           {/* Add your GTM code here */}
           <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({ 'gtm.start': new Date().getTime(), event:'gtm.js' });
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KHGWKWGL');`,
            }}
          />

          <meta name="description" content="Here you can easily watch movies of all genres." />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
        </Head>
        <body>
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-KHGWKWGL"
              height="0" 
              width="0" 
              style={{display:"none", visibility:"hidden"}}>
            </iframe>
          </noscript>

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