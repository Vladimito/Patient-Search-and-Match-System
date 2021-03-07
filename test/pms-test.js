var assert = require('assert');
const Patient = require('../models/patient.js');
const request = require('request');
const mongo = require('../utils/database');

var db;

before(async function() {

    db = await mongo.connectToDB();

});


after(async function() {
    //clears the db after every test
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
        let lon = 71;
        let healthExpenses = 44232;
        let healthCoverage = 1033;
        it('Test the insertion of a valid patient(Patient.save)', async function(){
            let patient1 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage);
            savePromise = patient1.save(db);
            await savePromise.then(result =>  assert.strictEqual(result, "Patient added correctly"))
            .catch(result => console.log("Error: " + result))
        });
        it('Test the insertion of an invalid patient(Patient.save)', async function(){
            let newZip = '021556';
            let patient2 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,newZip,last,lon,healthExpenses,healthCoverage);
            savePromise = patient2.save(db);
            await savePromise.then(result => console.log(result))
            .catch(result => assert.strictEqual(result,"Cannot insert an invalid patient into the database"));      
        });
        it('Testing the insertion of a patient with the same ID as an existing one(Patient.save)', async function(){
            let bday = '2014-08-11';
            let dday = ' ';
            let ssn = '999-85-3751';
            let drivers = ' ';
            let passport = ' ';
            let prefix = ' ';
            let first = 'Jimmy858';
            let last = 'Ledner144';
            let suffix = ' ';
            let maiden = ' ';
            let marital = ' ';
            let race = 'white';
            let ethnicity = 'nonhispanic';
            let gender = 'M';
            let birthplace = 'East Brookfield  Massachusetts  US';
            let address = '580 Quitzon Avenue Suite 58';
            let city = 'Concord';
            let state = 'Massachusetts';
            let county = 'Middlesex';
            let zip = '02342';
            let lat = 42;
            let lon

            let patient3 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage);
            savePromise = patient3.save(db);
            await savePromise.then(result => assert.strictEqual(result, "Patient added correctly"))
            .catch(result => console.log("Error: " + result))
        });
        let nid = '09fae2f3e-576e-2c57-c4c5-f62b6e19da3';
        let newHealthExpen = 23593;
        let newAdd = '580 Quitzon Avenue Suite 58';
        let newCity = 'Concord';
        let newZip2 = '56773';
        it('Testing the update of patient 1 ',async function(){
            updatePromise = Patient.update(db,id,nid,bday,ssn,first,last,race,ethnicity,gender,birthplace,newAdd,newCity,county,newZip2,lat,lon,newHealthExpen,healthCoverage);
            await updatePromise.then(result => assert.strictEqual(result,"{msg: 'Document was correctly updated'}"))
            .catch(result => console.log("Error: " + result))
        });
    });
});