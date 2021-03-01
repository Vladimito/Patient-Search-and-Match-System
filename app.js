const express = require("express")
const port = 3000
const system_router = require("./router/router.js")
const mongo = require('./utils/db');


var db;
async function loadDBClient() {
    try {
        db = await mongo.connectToDB();
    }catch(err){
        throw new Error('Could not connect to the Mongo DB');
    }
};
loadDBClient();

const app = express()

app.use((req, res, next) => {
	req.db = db;	
	next();
});
app.use(express.json())

app.use("/system", system_router)

server = app.listen(port, () => {
	console.log('Example app listening at http://localhost:%d', port);
});
  
process.on('SIGINT', () => {
	console.info('SIGINT signal received.');
	console.log('Closing Mongo Client.');
	mongo.closeDBConnection();
	server.close(() => {
	  console.log('Http server closed.');
	});
 });