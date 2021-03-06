const MongoClient = require("mongodb").MongoClient
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;

// Establish a connection to the database
async function connectToDB() {
    try {
        await client.connect();
        let db = client.db('pmsDev');
        console.log("Connected successfully to mongoDB"); 		
        return db;
    } catch (err) {
        throw err;
    } 
}

async function getDb() {
    return db;
}

async function closeDBConnection(){
    try{
        await client.close();
    }catch(err){
        throw err;
    }
};


module.exports = {connectToDB, getDb, closeDBConnection}
