
const express = require("express");
const { getDoctors, getDoctorSlots, } = require("../controllers/doctor.controllers");
const router = express.Router();

router.get("/", getDoctors);

router.get("/:id/slots", getDoctorSlots);

module.exports = router;
