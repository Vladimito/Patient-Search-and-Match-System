const Patient = require("../models/patient.js");

const create = async (req, res) => {
	const new_patient = new Patient(req.body.id,req.body.bday='',req.body.dday='',req.body.ssn,req.body.drivers='',req.body.passport='',req.body.prefix='',req.body.first,req.body.last,req.body.suffix='',req.body.maiden='',req.body.martial='',req.body.race,req.body.ethnicity,req.body.gender,req.body.birthplace='',req.body.address,req.body.city,req.body.county,req.body.zip='',req.body.lat=0,req.body.low=0,parseInt(req.body.healthExpenses=0),parseInt(req.body.healthCoverage=0));
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