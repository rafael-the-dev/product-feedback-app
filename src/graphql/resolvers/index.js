//import { apiHandler } from 'src/helpers/api-handler'
const { createMongoDBConnection } = require("src/connections");

let dbConfig = { 
    db: null,
    isConnected: false 
};

if(!dbConfig.isConnected) {
    createMongoDBConnection({ dbConfigObj: dbConfig });
}

export const resolvers = {
    Query: {
        feedbacks() {
            return [];
        }
    }
};