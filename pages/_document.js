import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head >
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
                    rel="stylesheet"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"></meta>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
