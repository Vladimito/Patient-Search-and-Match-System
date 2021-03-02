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
    constructor(id, bday,dday, ssn,drivers,passport,prefix,first,last,maiden,martial,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,low,healthExpenses,healthCoverage) {
        this.id = id
        this.bday = bday
        this.dday = dday
        this.ssn = ssn
        this.drivers = drivers
        this.passport = passport
        this.prefix = prefix
        this.first = first
        this.last = last
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
            maiden: 'string',
            martial: 'string',
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


    static async delete(db,id) {
        var id_delete =id;
        return new Promise(async function(resolve,reject){
            let collection = await _get_patients_collection(db);
            
        })
    }


}

module.exports = Patient;

