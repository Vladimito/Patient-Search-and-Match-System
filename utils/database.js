const MongoClient = require("mongodb").MongoClient
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db;

// Establish a connection to the database
async function connectToDB() {
    try {
        await client.connect();
        db = client.db('PATIENT_DATABASE');
		var dbo = client.db("PATIENT_DATABASE");
		 dbo.collection("patients").find({}).toArray(function(err, result) {
		if (err) throw err;
 });  
        console.log("Connected successfully to mongoDB"); 		
    } catch (err) {
        throw err;
    } 
}

async function getDb() {
    return db;
}

async function closeDBConnection(){
    await client.close();
};


module.exports = {connectToDB, getDb, closeDBConnection}
