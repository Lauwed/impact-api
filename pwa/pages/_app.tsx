import type { AppProps } from "next/app";
import type { DehydratedState } from "react-query";
import Layout from "../components/common/Layout";
import { AuthProvider } from "../components/context/auth";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <AuthProvider>
      <Layout dehydratedState={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
