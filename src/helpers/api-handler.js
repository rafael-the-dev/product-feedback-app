const { createMongoDBConnection } = require("src/connections/mongoDB");

let dbConfig = { 
    db: null,
    isConnected: false 
};

const apiHandler = (handler) => {
    return async (req, res) => {

        if(!dbConfig.isConnected) {
            await createMongoDBConnection({ dbConfigObj: dbConfig });
        }

        try {
            await handler(req, res, dbConfig.db);
            //res.send({ todos: []})
            //return;
        } catch(err) {
            console.error("handler error", err);
            res.status(500).json({ message: "Internal server error", err });
        }
    }
};

module.exports = { apiHandler };