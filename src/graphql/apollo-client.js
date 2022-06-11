//import { split, HttpLink } from '@apollo/client';
//import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
//import { setContext } from '@apollo/client/link/context';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, split, concat } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
//import WebSocket from 'ws'; Eu vou nas duas 

const getToken = () => {
  if(typeof window !== "undefined") {
    const token = localStorage.getItem('__product-feedback-app-token');

    if(token === null) return "";

    try {
      const acessToken = JSON.parse(token).token;
      return acessToken;
    } catch(e) { return ""; }
  }
  return "";
};

const httpLink = new HttpLink({
  uri: "https:deserted-flaxen-reaction.glitch.me/graphql",//'http://localhost:5000/graphql',
  //credentials: "include",
  //headers: {
    //authorization: getToken(),
 // }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getToken()
    }
  }));

  return forward(operation);
})

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "wss://deserted-flaxen-reaction.glitch.me/graphql", //"ws://localhost:5000/graphql"
                    connectionParams: {
                      authToken: getToken(),
                      authorization: getToken(),
                      credentials: "include",
                      headers: { authorization: getToken() }
                    },
                    
                })
          )
        : null;
  const splitLink = typeof window !== "undefined" ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    concat(authMiddleware, httpLink),
  ) : null;

/*const authLink = setContext(( prevContext, headers ) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  console.log(prevContext)
  console.log(headers)
  // return the headers to the context so httpLink can read them
  //console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});*/

/*const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
  webSocketImpl: WebSocket
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
/*const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);*/

/*if(wsLink !== null)
wsLink.request = operation => {
  const token = localStorage.getItem('__product-feedback-app-token') || "";
  // return the headers to the context so httpLink can read them
  console.log("token111", token)
  operation.setContext({
    headers: {
      authorization: `JWT ${token}`
    }
  });
};*/

const client = new ApolloClient({
  link: splitLink,
  uri: "https:deserted-flaxen-reaction.glitch.me/graphql",//"http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

//client.


export default client;