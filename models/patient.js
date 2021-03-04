const Validator = require("validatorjs");
const ctoj = require("csvtojson/v2"); //imports to convert csv dataset into json
const csvPath = 'csv/patient.csv';

async function _get_patients_collection (db){
    try{
        return await db.collection('patients');
    }catch(err){
        throw err;
    }
};

const options = {
    projection: {_id:0,id:1, bday:1,dday:1, ssn:1,drivers:1,passport:1,prefix:1,first:1,last:1,maiden:1,martial:1,race:1,ethnicity:1,gender:1,birthplace:1,address:1,city:1,state:1,county:1,zip:1,lat:1,low:1,healthExpenses:1,healthCoverage:1},
};


function patientIDGen() {
    var len = 36;
    const hex = '0123456789abcdef';
    let PID = '';
    for(let i =0;i < len;++i){
        if(i===9||i===14||i===19||i===24){
            PID += '-';
        }else if(i<=13 || i<=18){
            PID += hex.charAt(Math.floor(Math.random() * hex.length));
        }else{
            PID += hex.charAt(Math.floor(Math.random() * hex.length));
        }
    }
    return PID;
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
            resolve("{msg: 'Document correctlyed inserted into database'}")
        });
    });
}

class Patient {
    constructor(id, bday,dday, ssn,drivers,passport,prefix,first,last,suffix,maiden,martial,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,low,healthExpenses,healthCoverage) {
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
        this.martial = martial
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
        this.low = low
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
            county: 'required|string',
            zip: 'required|string|max:9',
            lat: 'integer',
            low: 'integer',
            healthExpenses: 'integer',
            healthCoverage: 'integer'

        }
        const validation = new Validator(this, rules);
        return validation.passes();
    };

    
    //Method that saves a patient into the database
    //takes the data from the patient object that calls the method
    //and the places it inside the patient database
    async save(db) {
        var patient = this;
        return new Promise(async function (resolve, reject){
            let collection = await _get_patients_collection(db); 
            let findP = await collection.findOne({id:id},{upsert:true}); //check if there's a patient with that ID
            if (patient.isValid()) { //check if the patient's entered attributes are valid
                if(findP === null || findP === undefined){ //if the patient is valid enter them into the database
                    collection.insertOne(patient, function(err) {
                        if (err) throw err;
                        resolve("Patient added correctly");
                    });
                }else{
                    //Otherwise generate a new id and change the id 
                    newId = patientIDGen();
                    patient.id = newId;
                    //after changing the id enter the patient
                    collection.insertOne(patient, function(err) {
                        if (err) throw err;
                        resolve("Patient added correctly");
                    });
            }
        }else{
            reject("Entered patient is not valid")
        }
        });
    }

    static async update(db,id,bday,dday='',ssn='',passport,prefix='',first,last,suffix='',maiden='',marital='',race,ethnicity,gender,birthplace='',address,city,county,zip,lat=0,low=0,healthExpenses=0,healthCoverage=0){
        return new Promise(async function(resolve,reject){
            let collection = await _get_patients_collection(db);
            let findP = await collection.findOne({id:id},{upsert: true});
            if(findP != null || findP != undefined){
                collection.updateOne({id: id},
                    {$set: {"id": id, "bday": bday,"dday": dday,"ssn":ssn,"passport":passport,first,last,race,ethnicity,gender,address,city,county,zip}})
                    console.log("Document with id = " + id + "was updated");
                    resolve("{msg: 'Document was correctly updated'}")
    
            }else{
                reject("{msg: 'Cannot update document that doesn't exist'}");
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
                console.log("The patient with id = " + id_delete + ' was correctly deleted');
                resolve("{msg: 'The patient was deleted from the database'}")
            });
        });
    }

    static async getPatientByID(db, id) {
        var id_get = id;
        return new Promise(async function(resolve, reject){
            var err,obj;
            let collection = await _get_patients_collection(db);
            let matchedPatient = await collection.find({id: id_get},options).toArray((err,obj));
            console.log("matchedPatient before first stringify: " + matchedPatient); //debugging line
            if(matchedPatient != null || matchedPatient != undefined){
                console.log("Found patient: " + JSON.stringify(matchedPatient));
                resolve(JSON.stringify(matchedPatient))
            }else{
                console.log("Could not find a patient with that ID");
                reject("{msg: 'Could not find a patient with that ID'}")
            }
        });
    }

    static async getPatients(db) {
        return new Promise(async function(resolve, reject){
            var patientList = [];
            let collection = await _get_patients_collection(db);
            let count = await collection.countDocuments({});
            if(count != null || count != undefined || count != 0){
                await collection.find({},options).forEach(function(patient){
                    console.log("Patient: " + patient);
                    patientList.push(patient);
                })
                console.log("patientList: " + patientList);
                resolve(JSON.stringify(patientList));
           }else{
               console.log("Database is empty");
               reject("{msg: 'Cannot locate documents in an empty database'}")
           }
        });
    }




}

module.exports = Patient;

