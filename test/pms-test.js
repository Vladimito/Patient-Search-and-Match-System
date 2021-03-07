var assert = require('assert');
const Patient = require('../models/patient.js');
const request = require('request');
const mongo = require('../utils/database');

var db;

before(async function() {

    db = await mongo.connectToDB();

});


after(async function() {
    console.log("dropping collection");
    const patients = db.collection('patients');
    patients.drop
    await mongo.closeDBConnection();
});

describe('Testing the Patient API', async function(){
    describe('Testing the Patient Model - Simple cases', async function(){
        let id = 'b132f06d-2836-0e70-b691-f67b381fcfb0';
        let bday = '2019-08-09';
        let dday = " ";
        let ssn = '999-75-3876';
        let drivers = " ";
        let passport = " ";
        let prefix = " ";
        let first = 'Merna69';
        let last = 'Howell11947';
        let suffix =  " ";
        let maiden = " ";
        let marital = " ";
        let race = 'white';
        let ethnicity = 'nonhispanic';
        let gender = 'F';
        let birthplace = 'Winthrop  Massachusetts  US';
        let address = '345 Simonis Approach Apt 98';
        let city = 'Malden';
        let state = 'Massachusetts';
        let county ='Middlesex';
        let zip = '02155';
        let lat = 42;
        let low = 71;
        let healthExpenses = 44232;
        let healthCoverage = 1033;
        it('Success 1 - Test the insertion of a valid patient(Patient.save) Success Msg test', async function(){
            let patient1 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,low,healthExpenses,healthCoverage);
            savePromise = patient1.save(db);
            await savePromise.then(result =>  assert.strictEqual(result, "Patient added correctly"))
            .catch(result => console.log("Error: " + result))
        });
        it('Success 2 - Test the insertion of an invalid patient(Patient.save) Success Msg test', async function(){
            let newZip = '021556';
            let patient2 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,newZip,last,low,healthExpenses,healthCoverage);
            savePromise = patient2.save(db);
            await savePromise.then(result => console.log(result))
            .catch(result => assert.strictEqual(result,"Cannot insert an invalid patient into the database"));
            
        });

    });
});