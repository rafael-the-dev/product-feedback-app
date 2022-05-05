//import { split, HttpLink } from '@apollo/client';
//import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createClient } from 'graphql-ws';
//import WebSocket from 'ws';

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "ws://localhost:5000/graphql",
                })
          )
        : null;

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

const client = new ApolloClient({
  link: wsLink,
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

export default client;