import CssBaseline from "@mui/material/CssBaseline";
// next
import Head from "next/head";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />;
    </>
  );
};

export default MyApp;
