const express = require('express')
const router  = express.Router()

const book_controller = require("../controllers/patients.js")

router.get("/", book_controller.all)
router.get("/:id", book_controller.getOne)
router.get('/delete/:id', book_controller.deleteOne)

module.exports = router
