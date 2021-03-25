const express = require('express')
const router  = express.Router()

const patientController = require("../controllers/patients.js")

router.post("/",patientController.create)
router.get("/all", patientController.all)
router.get("/:id", patientController.getOne)
router.get("/:symptoms", patientController.allSymps)
router.get("/delete/:id", patientController.deleteOne)
router.put("/update/:id",patientController.updateOne)
module.exports = router
