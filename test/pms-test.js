var assert = require('assert');
var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;
const Patient = require('../models/patient.js');
const request = require('request');
const mongo = require('../utils/database');
const { interfaces } = require('mocha');


var db;

//json schema to cross reference with json strings/objects
before(async function() {

    db = await mongo.connectToDB();

});


after(async function() {
    //clears the db after every test
    //Mainly used for debugging
    console.log("removing test patients");
    const patients = db.collection('patients');
    await patients.deleteMany({});
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
        let symptoms = "fever";
        it('Test the insertion of a valid patient(Patient.save)', async function(){
            let patient1 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage,symptoms);
            savePromise = patient1.save(db);
            let pass = "client-side: The patient was correctly inserted in the database";
            
            await savePromise.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log("Error: " + result))
        });
        it('Test the insertion of an invalid patient(Patient.save)', async function(){
            let newZip = '02155674';
            let patient2 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,newZip,last,lon,healthExpenses,healthCoverage);
            savePromise = patient2.save(db);
            let fail = "client-side: cannot insert invalid patient";
            await savePromise.then(result => console.log(result))
            .catch(result => assert.strictEqual(result.msg,fail))    
        });
        it('Testing the insertion of a patient with the same ID as an existing one(Patient.save) - Patient should be inserted', async function(){
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
            let lon = 20;
            let symptoms = "chest pains";
            let patient3 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage,symptoms);
            savePromise = patient3.save(db);
            let pass = 'client-side: Patient assigned new ID added correctly and added';
            await savePromise.then(result => assert.strictEqual(result.msg, pass))
            .catch(result => console.log("Error: " + result))
        });
        let ogid = 'b132f06d-2836-0e70-b691-f67b381fcfb0';
        let newSymptoms = "chest pains, fever";
        let newAdd = "20 Wexford St.";
        let newCity = "St. John's";
        let newZip2 = "D35K87";
        let newHealthExpen = 28999;
        it('Testing the update of patient 1\'s information ',async function(){
            updatePromise = Patient.update(db,ogid,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,newAdd,newCity,county,newZip2,lat,lon,newHealthExpen,healthCoverage,newSymptoms);
            let pass = 'client-side: The patient was updated correctly';
            await updatePromise.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log("Error: " + result))
        });
        /*it('Testing if Patient.update() will reject an invalid ID', async function(){
            let pupId = '7951157f4-374b-64fa-8e2e-b12c19cb077';
            let fail = "client-side: Cannot update document that doesn\'t exist";
            updatePromise = Patient.update(db,ogid,pupId,bday,ssn,first,last,race,ethnicity,gender,birthplace,newAdd,newCity,county,newZip2,lat,lon,newHealthExpen,healthCoverage);
            await updatePromise.then(result => console.log("Result: " + result))
            .catch(result => assert.strictEqual(result.msg, fail))
        });*/
        it('Testing Patient.getPatientByID() - should properly send success message',async function(){
            let nid = "09fae2f3e-576e-2c57-c4c5-f62b6e19da3";
            let pass = "client-side: Patient correctly retrieved";
            getByIDProm = Patient.getPatientByID(db,nid);
            await getByIDProm.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log("Error: " + result))
        });
        /*it('Testing deletion of patient from database Patient.delete()', async function(){
            deleteProm = Patient.delete(db,ogid);
            let pass = 'client-side: The patient was deleted from the database';
            await deleteProm.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log(result))
        });
        it('Testing rejection of nonexistant ID when attempting to use Patient.delete() on patient', async function(){
            deleteProm = Patient.delete(db,'b132f0-2333-0e70-b691-f67b38cfb0');
            let fail = "client-side: patient was not correctly deleted";
            await deleteProm.then(result => console.log(result))
            .catch(result => assert.strictEqual(result.msg,fail))
        });*/
        it('Testing output of all patients in a db with Patient.getPatients(). ',async function(){
            getAllProm = Patient.getPatients(db);
            let pass = 'client-side: The patients were successfully retrieved'
            await getAllProm.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log(result))
        });
        it('Testing to see if getPatientBySymp() will return a patient', async function(){
            getSympProm = Patient.getPatientBySymp(db,"fever");
            let pass = "client-side: The patients were successfully retrieved by symptoms";
            await getSympProm.then(result => assert.strictEqual(result.msg,pass))
            .catch(result => console.log("Error: " + result))
        });
        /*describe('Testing Patient API - Complex Cases', function() {
            var myurl = 'http://localhost:3000';
           /*it ('Testing POST/patient, Delete/patient/:id',function(done){
                let patient1 = {
                    id: '781d9cff-b412-da29-724b-fb8e92ad3f96',
                    bday: '1999-01-25',
                    dday: ' ',
                    ssn: '999-74-6077',
                    drivers: 'S99915626',
                    passport: 'X35923685X',
                    prefix: 'Ms.',
                    first: 'Doris153',
                    last: 'Mertz280',
                    suffix: ' ',
                    maiden: ' ',
                    marital: ' ',
                    race: 'white',
                    ethnicity: 'nonhispanic',
                    gender: 'F',
                    address: '1045 Beatty Lock Suite 9',
                    city: 'Falmouth',
                    state: 'Massachusetts',
                    county: 'Barnstable',
                    zip: '2540',
                    lat: 41,
                    lon: 70,
                    healthExpenses: 454843,
                    healthCoverage: 2674  
                }

                request.post({
                    headers: {'content-type': 'application/json'},
                    url: myurl+'/patients',
                    body: JSON.stringify(patient1)
                },function(error, response, body){
                    console.log("Body: " + body);
                    if(error) console.dir(error);
                    assert.strictEqual(JSON.parse(body).msg,"Patient added correctly");
                    done();
                });
            });

        });*/
    });
});