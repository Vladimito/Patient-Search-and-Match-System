//
const Validator = require("validatorjs");
//const ctoj = require("csvtojson/v2"); //imports to convert csv dataset into json
//const csvPath = 'csv/patient.csv';

async function _get_patients_collection (db){
    try{
        return await db.collection('patients');
    }catch(err){
        throw err;
    }
};

const options = {
    projection: {_id:0,id:1, bday:1,dday:1, ssn:1,drivers:1,passport:1,prefix:1,first:1,last:1,maiden:1,marital:1,race:1,ethnicity:1,gender:1,birthplace:1,address:1,city:1,state:1,county:1,zip:1,lat:1,lon:1,healthExpenses:1,healthCoverage:1},
};

//Generates a random patient ID
function patientIDGen() {
    var len = 36;
    const hex = '0123456789abcdef';
    let PID = '';
    for(let i =0;i < len;++i){
        if(i===9||i===14||i===19||i===24){
            PID += '-';
        }else if(i<=13 || i<=18 || i <= 36){
            PID += hex.charAt(Math.floor(Math.random() * hex.length));
        }
    }
    return PID;
}


function _isStringified(str) {
    try{
        JSON.parse(str);
    }catch(e){
        console.log("Not valid JSON string");
        return false;
    }
    console.log("Valid JSON string");
    return true;
}
//This function will read patients.csv and convert it into a JSON array
//Then it will load it into the database
//Unused at the moment, will implement fully if needed
async function _loadDB(db){
    let jsonArray = await ctoj().fromFile(csvPath); //converts contents to jsonArray
    let collection = await _get_patients_collection(db); //gets the patientcollection
    //for each that will iterate throughout the jsonArray
    //for each element in the array it will insert it into the mongodb
    jsonArray.forEach(element => {
        collection.insertOne(element, (err,obj) =>{
            if(err) reject(err);
            //The two console logs are mainly for debugging
            console.log("Inserting.."); 
            console.log('A document was inserted in the database');
            resolve("{msg: 'Document correctly inserted into database'}")
        });
    });
}

class Patient {
    constructor(id, bday,dday, ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage) {
        this.id = id
        this.bday = bday
        this.dday = dday
        this.ssn = ssn
        this.drivers = drivers
        this.passport = passport
        this.prefix = prefix
        this.first = first
        this.last = last
        this.suffix = suffix
        this.maiden = maiden
        this.marital = marital
        this.race = race
        this.ethnicity = ethnicity
        this.gender = gender
        this.birthplace = birthplace
        this.address = address
        this.city = city
        this.state = state
        this.county = county
        this.zip = zip
        this.lat = lat
        this.lon = lon
        this.healthExpenses = healthExpenses
        this.healthCoverage = healthCoverage
    }



    isValid(){
        const rules = {
            id: 'required|string',
            bday: 'required|string',
            dday: 'string',
            ssn: 'required|string',
            drivers: 'string',
            passport: 'string',
            prefix: 'string',
            first: 'required|string',
            last: 'required|string',
            suffix: 'string',
            maiden: 'string',
            marital: 'string',
            race: 'required|string',
            ethnicity: 'required|string',
            gender: 'required|string|max:1',
            birthplace: 'required|string',
            address: 'required|string',
            city: 'required|string',
            state: 'required|string',
            county: 'required|string',
            zip: 'required|string|max:5',
            lat: 'numeric',
            lon: 'numeric',
            healthExpenses: 'numeric',
            healthCoverage: 'numeric'

        }
        const validation = new Validator(this, rules);
        return validation.passes();
    };

    
    //Method that saves a patient into the database
    //takes the data from the patient object that calls the method
    //and the places it inside the patient database
    async save(db) {
        var patient = this;

        //console.log('patient.id: ' + patient.id);
        return new Promise(async function(resolve, reject) {
            let collection = await _get_patients_collection(db);
            //console.log("collection: " + collection); //debug line
            if(patient.isValid() === true){ //checks if the patient is valid
                let findP = await collection.findOne({id:patient.id},options); //checks if there already exists a patient with that ID
                if(await findP === null || await findP === undefined){ //if there doesn't exist a patient with that id insert
                    
                    await collection.insertOne(patient, (err,obj) =>{
                        if(err) reject(err);
                        console.log("Inserting.."); //lets the server that a book is being inserted
                        console.log("server-side: A document was inserted in the database"); 
                        resolve({msg: 'client-side: The patient was correctly inserted in the database'});
                    });
                }else{
                    console.log("server-side: Same ID detected, assigning new ID"); //debug line
                    let newId = patientIDGen(); //generates a new id if there already exists an id
                    patient.id = newId;
                    //console.log('patient.id after changing' + patient.id);
                    
                    await collection.insertOne(patient,(err,obj)=>{
                        if(err) reject(err);
                        console.log("Inserting..");
                        console.log("server-side: A document was inserted in the database");
                        resolve(JSON.stringify({msg: 'Patient assigned new ID added correctly'}))
                    });
                }
            }else{
                reject({msg: 'client-side: patient was not inserted'})
            }
        });
    }

    //Updates patient information if something is not entered it is assumed that the value of the attribute is an empty string/0
    //Current implementation is not all that efficient at the moment
    static async update(db,ogid,newid,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,county,zip,lat,lon,healthExpenses,healthCoverage){
        return new Promise(async function(resolve,reject){
            let collection = await _get_patients_collection(db);
            let findP = await collection.findOne({id:ogid},{upsert: true});
            if(findP != null || findP != undefined){
                collection.updateOne({id: ogid},
                    {$set: {"id": newid, "bday": bday,"dday": dday,"ssn":ssn,"drivers":drivers,"passport":passport,"prefix": prefix,"first": first,"last": last,"suffix": suffix,"maiden": maiden,"marital": marital,"race": race,"ethnicity":ethnicity,"gender":gender,"birthplace":birthplace,"address":address,"city":city,"county":county,"zip":zip,"lat": lat,"lon": lon,"healthExpenses": healthExpenses,"healthCoverage": healthCoverage}})
                    console.log("Document with id = " + ogid + "was updated");
                    resolve({msg: 'client-side: Document was correctly updated'})
    
            }else{
                reject({msg: 'client-side: Cannot update document that doesn\'t exist'});
            }
        });

    }   
    //Method that deletes a patient in the database
    //finds a patient based on their id and deletes them from the database
    static async delete(db,id) {
        var id_delete =id;
        return new Promise(async function(resolve,reject){
            let collection = await _get_patients_collection(db);
            collection.deleteOne({id: id_delete}, (err,obj) =>{
                if(err) reject(err);
                console.log("server-side: The patient with id = " + id_delete + ' was correctly deleted');
                resolve({msg: 'client-side: The patient was deleted from the database'})
            });
        });
    }

    //Method that finds a patient with a specific id
	//finds a patient based on their id and returns their information
    static async getPatientByID(db, id) {
        var id_get = id;
        return new Promise(async function(resolve, reject){
            var err,obj;
            let collection = await _get_patients_collection(db);
            let matchedPatient = await collection.find({id: id_get},options).toArray((err,obj));
            //console.log("matchedPatient before first stringify: " + matchedPatient); //debugging line
            if(matchedPatient != null || matchedPatient != undefined){
                //console.log("Found patient: " + JSON.stringify(matchedPatient));
                resolve(JSON.stringify(matchedPatient))
            }else{
                console.log("server-side: Could not find a patient with that ID");
                reject({msg: 'client-side: Could not find a patient with that ID'})
            }
        });
    }

    //Method that returns a list of all patients
    static async getPatients(db) {
        return new Promise(async function(resolve, reject){
            var patientList = [];
            let collection = await _get_patients_collection(db);
            let count = await collection.countDocuments({});
            if(count != null || count != undefined || count != 0){
                await collection.find({},options).forEach(function(patient){
                    //console.log("Patient: " + patient); //debug line
                    patientList.push(patient);
                })
                //console.log("patientList: " + JSON.stringify(patientList));
                resolve(JSON.stringify(patientList));
           }else{
               console.log("Database is empty");
               reject({msg: 'Cannot locate documents in an empty database'})
           }
        });
    }




}

module.exports = Patient;

