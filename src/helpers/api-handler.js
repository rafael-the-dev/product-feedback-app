const { createMongoDBConnection } = require("src/connections");

let dbConfig = { 
    db: null,
    isConnected: false 
};

const apiHandler = async (resolver) => {
    if(!dbConfig.isConnected) {
        await createMongoDBConnection({ dbConfigObj: dbConfig });
    }

    //try {
        return resolver;
    //} catch(err) {
        //console.error("handler error", err);
        //res.status(500).json({ message: "Internal server error", err });
    //}
};

module.exports = { apiHandler };