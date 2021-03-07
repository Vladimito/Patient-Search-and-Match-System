const MongoClient = require("mongodb").MongoClient
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;

// Establish a connection to the database
async function connectToDB() {
    try {
        //Connect client to server
        await client.connect();
        //Name db patients
        let db = client.db('patients');
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
