const express = require('express')
const router  = express.Router()

const patientController = require("../controllers/patients.js")

router.post("/",patientController.create)
router.get("/all", patientController.all)
router.get("/:id", patientController.getOne)
router.get("/symptoms/:symptoms", patientController.allSymps)
router.delete("/:id", patientController.deleteOne)
router.put("/:id",patientController.updateOne)
module.exports = router
