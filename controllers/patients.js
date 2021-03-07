const Patient = require("../models/patient.js");

const create = async (req, res) => {
	const new_patient = new Patient(req.body.id,req.body.bday='',req.body.dday='',req.body.ssn,req.body.drivers='',req.body.passport='',req.body.prefix='',req.body.first,req.body.last,req.body.suffix='',req.body.maiden='',req.body.martial='',req.body.race,req.body.ethnicity,req.body.gender,req.body.birthplace='',req.body.address,req.body.city,req.body.county,req.body.zip='',req.body.lat=0,req.body.lon=0,parseInt(req.body.healthExpenses=0),parseInt(req.body.healthCoverage=0));
	if(new_patient.isValid()) {
		let db = req.db;
		try{
			let msg = await new_patient.save(db);
			res.send(msg);
		}catch(err){
			res.send('There was an error while saving the patient. (err:'+err+')');
			throw new Error(err);
		}
	} else {
		res.send('client-side: The Patient data you entered is invalid')
	}
}


const getOne = async(req,res) =>{
	const patientToGet = req.params.id;
	let db = req.db;
	try{
		let obj = await Patient.getPatientByID(db,patientToGet);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the patient. (err:'+err+')');
		throw new Error(err);
	}
}

const updateOne = async(req, res) =>{
	const pUpdate = req.body
	const patientID = req.params.id
	let db = req.db;
	try{
		let msg = await Patient.update(db,patientID,pUpdate.bday,pUpdate.dday,pUpdate.ssn,pUpdate.passport,pUpdate.prefix,pUpdate.first,pUpdate.last,pUpdate.suffix,pUpdate.maiden,pUpdate.marital,pUpdate.race,ethnicity,pUpdate.gender,pUpdate.birthplace,pUpdate.address,pUpdate.city,pUpdate.county,pUpdate.zip,pUpdate.lat,pUpdate.lon,pUpdate.healthExpenses,pUpdate.healthCoverage);
		res.send(msg);
	}catch(err){
		res.send('There was an error while updating that patient\'s information. (err:'+err+')');
		throw new Error(err);
	}
}

const deleteOne = async (req, res) => {
	const patientID = req.params.id;
	let db = req.db;
	try{
		let msg = await Patient.delete(db, book_id);
		res.send(msg);	
	}catch(err){
		res.send('There was an error while deleting your Book. (err:'+err+')');
		throw new Error(err);
	}		
}

const all = async(req,res) =>{
	let db = req.db;
	try{
		let obj = await Patient.getPatients(db);
		console.log('server-side: ' + obj.PATIENT_DATABASE.length+' patient(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Patients. (err:'+err+')');
		throw new Error(err);
	}
}

module.exports = {
	create,
	getOne,
	updateOne,
	deleteOne,
	all
}
