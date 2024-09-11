import "../styles/globals.css";
import Layout from "../components/common/Layout";
import type { AppProps } from "next/app";
import type { DehydratedState } from "react-query";
import { AuthProvider } from "../components/context/auth";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <AuthProvider>
      <Layout dehydratedState={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
