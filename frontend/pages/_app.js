import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../lib/with-apollo-client';
import Layout from "../components/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const pagePropsTask = Component.getInitialProps
      ? Component.getInitialProps(ctx)
      : {};
    const layoutPropsTask = Layout.getInitialProps
      ? Layout.getInitialProps(ctx)
      : {};

    const [pageProps, layoutProps] = await Promise.all([
      pagePropsTask,
      layoutPropsTask
    ]);

    return { pageProps, layoutProps };
  }

  render() {
    const {
      Component,
      pageProps,
      layoutProps,
      apolloClient,
      router,
      isAuthenticated,
      ctx
    } = this.props;

    return (
      <Container>
        <Layout {...layoutProps}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} router={router} />
          </ApolloProvider>
        </Layout>

        <style jsx global>
          {`
            a {
              color: white !important;
            }
            a:link {
              text-decoration: none !important;
              color: white !important;
            }
            a:hover {
              color: white;
            }
            .card {
              display: inline-block !important;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);