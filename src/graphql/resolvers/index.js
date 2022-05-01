//import { apiHandler } from 'src/helpers/api-handler'
const { dbConfig } = require("src/connections");


export const resolvers = {
    Query: {
        async feedbacks() {
            const { db }  = dbConfig;
            if(db === null) throw new Error("DB not set");

            const feedbacks = await db.find({ }).toArray();
            return feedbacks;
        }
    }
};