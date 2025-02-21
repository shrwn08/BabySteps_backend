
const express = require("express");
const { getDoctors, getDoctorSlots, createDoctor} = require("../controllers/doctor.controllers");
const router = express.Router();

router.get("/", getDoctors);

router.post("/", createDoctor);

router.get("/:id/slots", getDoctorSlots);

module.exports = router;
