const Validator = require("validatorjs");

async function _get_patients_collection (db){
    try{
        return await db.collection('patients');
    }catch(err){
        throw err;
    }
};

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
};