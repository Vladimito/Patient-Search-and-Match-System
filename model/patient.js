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

//This function will read patients.csv and convert it into a JSON array
//Then it will load it into the database
//As of now it does not send the json into the mongodb due to attribute differences
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
    constructor(id, name, gender, age, height, weight, location, symptoms, conditions, illness) {
        this.id = id
        this.name = name
        this.gender = gender
        this.age = age
        this.height = height
        this.weight = weight
        this.location = location
        this.symptoms = symptoms
        this.conditions = conditions
        this.illness = illness
    }



    isValid(){
        const rules = {
            id: 'required|integer',
            name: 'required|string',
            gender: 'required|string',
            age: 'required|integer',
            height: 'required|integer',
            weight: 'required|integer',
            location: 'required|string',
            symptoms: 'required|array',
            conditions: 'requires|array',
            illness: 'required|array'
        }
        const validation = new Validator(this, rules);
        return validation.passes();
    };

    async save(db) {
        var patient = this;
        return new Promise(async function (resolve, reject){
            if (patient.isValid()) {
                let collection = await _get_patients_collection(db);
                collection.insertOne(patient, function(err) {
                    if (err) throw err;
                    resolve("Patient added correctly");
                });
            }else{
                reject("Data invalid; patient was not added");
            }
        });
    }
}

module.exports = Patient;

