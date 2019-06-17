import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ApolloProvider } from 'react-apollo';

// import withData from "../lib/apollo";
import withApolloClient from '../lib/with-apollo-client';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    // const { Component, pageProps } = this.props;
    const { Component, pageProps, apolloClient } = this.props
    return (
      <>
        <Container>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Container>
      </>
    );
  }
}

export default withApolloClient(MyApp);