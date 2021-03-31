const Patient = require("../models/patient.js");


const create = async(req,res) =>{
	console.log("Running create");
	const new_patient = new Patient(req.body.id,req.body.bday,req.body.dday,req.body.ssn,req.body.drivers,req.body.passport,req.body.prefix,req.body.first,req.body.last,req.body.suffix,req.body.maiden,req.body.marital,req.body.race,req.body.ethnicity,req.body.gender,req.body.birthplace,req.body.address,req.body.city,req.body.state,req.body.county,req.body.zip,req.body.lat,req.body.lon,req.body.healthExpenses,req.body.healthCoverage,req.body.symptoms);
	//console.log("new_Patient: " + JSON.stringify(new_patient));
	let db = req.db;
	new_patient.save(db).then(obj =>{
		res.send(obj.msg);
	}).catch(obj => {
		res.send(obj.msg);
	})
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
		let msg = await Patient.delete(db, patientID);
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
		console.log('server-side: ' + obj.patients.length+' patient(s) were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Patients. (err:'+err+')');
		console.log("err: " + err);
		throw new Error(err);
	}
}
const allSymps = async(req,res) =>{
	let db = req.db;
	const sympToUse = req.params.symptoms;
	try{
		let obj = await Patient.getPatientBySymp(db,sympToUse);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the patients. (err:'+err+')');
		throw new Error(err);
	}
}
module.exports = {
	create,
	deleteOne,
	updateOne,
	getOne,
	all,
	allSymps
}