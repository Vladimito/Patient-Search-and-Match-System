const express = require('express')
const router  = express.Router()

const patientController = require("../controllers/patients.js")

router.get("/", patientController.all)
router.get("/:id", patientController.getOne)
router.get('/delete/:id', patientController.deleteOne)
router.post('/patients',patientController.create)
module.exports = router
