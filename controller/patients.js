const Patient = require("../models/patient.js");

const create = async (req, res) => {
	const new_patient = new Patient(parseInt(req.body.id), req.body.name, req.body.gender, parseInt(req.body.age), parseInt(req.body.height), parseInt(req.body.weight), req.body.location, req.body.symptoms, req.body.conditions, req.body.illness);
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