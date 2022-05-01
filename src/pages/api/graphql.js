import { typeDefs } from 'src/graphql/schemas'
import { resolvers } from 'src/graphql/resolvers'
import { ApolloServer } from 'apollo-server-micro'

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
