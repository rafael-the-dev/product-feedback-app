import { typeDefs } from 'src/graphql/schemas'
import { resolvers } from 'src/graphql/resolvers'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'; // 

export const config = {
    api: {
        bodyParser: false
    }
};

const cors = Cors();
let apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default cors(async (req, res) => {
    if(req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
    //return handler()
});

//export default apolloServer.createHandler({ path: "/api/graphql" });;
