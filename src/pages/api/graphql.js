import { typeDefs } from 'src/graphql/schemas'
import { resolvers } from 'src/graphql/resolvers'
//import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'; // 
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const express = require('express');
const { createMongoDBConnection, dbConfig } = require("src/connections");

export const config = {
    api: {
        bodyParser: false
    }
};

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

const app = express();
//const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    path: "/api/graphql",
    server: apolloServer
});

const PORT = 3000;
export default cors(async (req, res) => {
    if(!dbConfig.isConnected) {
        await createMongoDBConnection();
    }
    
    if(req.method === "OPTIONS") {
        res.end();
        return false;
    }

    
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({ 
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ apolloServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }
        ]
    });

    await server.start();
    server.applyMiddleware({ app });
    //};
    
    //func();
    
    wsServer.on("connection", () => {
        console.log("connected")
    })
    
    
    /*pubsub.publish('POST_CREATED', {
        postCreated: {
          author: 'Ali Baba',
          comment: 'Open sesame'
        }
    });*/
    //console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`)
    //httpServer.listen(PORT, () => {
        //console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`)
    //})
    //return handler()
    await startServer;
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});


/**
 * import { typeDefs } from 'src/graphql/schemas'
import { resolvers } from 'src/graphql/resolvers'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'; // 
const { createMongoDBConnection, dbConfig } = require("src/connections");

export const config = {
    api: {
        bodyParser: false
    }
};

const cors = Cors();
let apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default cors(async (req, res) => {
    if(!dbConfig.isConnected) {
        await createMongoDBConnection();
    }
    
    if(req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
    //return handler()
});

//export default apolloServer.createHandler({ path: "/api/graphql" });;

 * 
 */
