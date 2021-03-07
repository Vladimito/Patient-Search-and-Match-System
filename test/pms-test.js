var assert = require('assert');
const Patient = require('../models/patient.js');
const request = require('request');
const mongo = require('../utils/database');
const { interfaces } = require('mocha');

var db;

before(async function() {

    db = await mongo.connectToDB();

});


after(async function() {
    //clears the db after every test
    //Mainly used for debugging
    console.log("removing patients");
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
        it('Test the insertion of a valid patient(Patient.save)', async function(){
            let patient1 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage);
            savePromise = patient1.save(db);
            await savePromise.then(result =>  assert.strictEqual(result, "Patient added correctly"))
            .catch(result => console.log("Error: " + result))
        });
        it('Test the insertion of an invalid patient(Patient.save)', async function(){
            let newZip = '02155674';
            let patient2 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,newZip,last,lon,healthExpenses,healthCoverage);
            savePromise = patient2.save(db);
            await savePromise.then(result => console.log(result))
            .catch(result => assert.strictEqual(result,"Cannot insert an invalid patient into the database"));      
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
            let lon

            let patient3 = new Patient(id,bday,dday,ssn,drivers,passport,prefix,first,last,suffix,maiden,marital,race,ethnicity,gender,birthplace,address,city,state,county,zip,lat,lon,healthExpenses,healthCoverage);
            savePromise = patient3.save(db);
            await savePromise.then(result => assert.strictEqual(result, "Patient assigned new ID added correctly"))
            .catch(result => console.log("Error: " + result))
        });
        let ogid = 'b132f06d-2836-0e70-b691-f67b381fcfb0';
        let nid = '09fae2f3e-576e-2c57-c4c5-f62b6e19da3';
        let newHealthExpen = 23593;
        let newAdd = '580 Quitzon Avenue Suite 58';
        let newCity = 'Concord';
        let newZip2 = '56773';
        it('Testing the update of patient 1\'s information ',async function(){
            updatePromise = Patient.update(db,ogid,nid,bday,ssn,first,last,race,ethnicity,gender,birthplace,newAdd,newCity,county,newZip2,lat,lon,newHealthExpen,healthCoverage);
            await updatePromise.then(result => assert.strictEqual(result,"{msg: 'Document was correctly updated'}"))
            .catch(result => console.log("Error: " + result))
        });
        it('Testing if Patient.update() will reject an invalid ID', async function(){
            let pupId = '7951157f4-374b-64fa-8e2e-b12c19cb077';
            updatePromise = Patient.update(db,ogid,pupId,bday,ssn,first,last,race,ethnicity,gender,birthplace,newAdd,newCity,county,newZip2,lat,lon,newHealthExpen,healthCoverage);
            await updatePromise.then(result => console.log("Result: " + result))
            .catch(result => assert.strictEqual(result, "{msg: 'Cannot update document that doesn't exist'}"))
        });
        it('Testing Patient.getPatientByID() - should properly send success message',async function(){
            let expected = '[{"id":"09fae2f3e-576e-2c57-c4c5-f62b6e19da3","bday":"2019-08-09","dday":"999-75-3876","ssn":"Merna69","drivers":"Howell11947","passport":"white","prefix":"nonhispanic","first":"F","last":"Winthrop  Massachusetts  US","maiden":"Concord","marital":"Middlesex","race":"56773","ethnicity":42,"gender":71,"birthplace":23593,"address":1033,"city":null,"state":"Massachusetts","county":null,"zip":null,"lat":0,"lon":0,"healthExpenses":0,"healthCoverage":0}]';
            getByIDProm = Patient.getPatientByID(db,nid);
            await getByIDProm.then(result => assert.strictEqual(result, expected))
            .catch(result => console.log("Error: " + result));
        })

        it('Testing deletion of patient from database Patient.delete()', async function(){
            deleteProm = Patient.delete(db,ogid);
            await deleteProm.then(result => assert.strictEqual(result, "{msg: 'The patient was deleted from the database'}"))
            .catch(result => console.log("Error: " + result))
        });
        it('Testing rejection of nonexistant ID when attempting to use Patient.delete() on patient', async function(){
            deleteProm = Patient.delete(db,ogid);
            await deleteProm.then(result => console.log(result))
            .catch(result => assert.strictEqual(result, "{msg: 'Could not find a patient with that ID'}"))
        });
        it('Testing output of all patients in a db with Patient.getPatients()',async function(){
            let expected = '[{"id":"09fae2f3e-576e-2c57-c4c5-f62b6e19da3","bday":"2019-08-09","dday":"999-75-3876","ssn":"Merna69","drivers":"Howell11947","passport":"white","prefix":"nonhispanic","first":"F","last":"Winthrop  Massachusetts  US","maiden":"Concord","marital":"Middlesex","race":"56773","ethnicity":42,"gender":71,"birthplace":23593,"address":1033,"city":null,"state":"Massachusetts","county":null,"zip":null,"lat":0,"lon":0,"healthExpenses":0,"healthCoverage":0},{"id":"75e8836e5-7b10-0ac8-7e79-db06532cc01","bday":"2014-08-11","dday":" ","ssn":"999-85-3751","drivers":" ","passport":" ","prefix":" ","first":"Jimmy858","last":"Ledner144","maiden":" ","marital":" ","race":"white","ethnicity":"nonhispanic","gender":"M","birthplace":"East Brookfield  Massachusetts  US","address":"580 Quitzon Avenue Suite 58","city":"Concord","state":"Massachusetts","county":"Middlesex","zip":"02342","lat":42,"lon":null,"healthExpenses":44232,"healthCoverage":1033}]';
            getAllProm = Patient.getPatients(db);
            await getAllProm.then(result => assert.strictEqual(result, expected))
            .catch(result => console.log(result))
        })
    });
});