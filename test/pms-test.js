var assert = require('assert');
const Patient = require('../models/patient.js');
const request = require('request');
const mongo = require('../utils/database');

var db;

before(async function() {
    try{
        db = await mongo.connectToDB();
    }catch(err) {
        throw err;
    }
});

after(async function() {
    try{
        mongo.closeDBConnection();
    }catch(err){
        throw err;
    }
});


describe('Testing the Patient API', async function(){
    describe('Testing the Patient Model - Simple cases', function(){
        
    })
})