import AppProvider from "client/src/components/providers/AppProvider";
import { isErrorProps } from "client/src/infrastructure/ssr/errorProps";
import type { AppProps } from "next/app";
import Error from "next/error";

function MyApp({ Component, pageProps }: AppProps) {
  if (isErrorProps(pageProps)) {
    return (
      <AppProvider>
        <Error
          statusCode={pageProps.error.status}
          title={pageProps.error.message}
        />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
