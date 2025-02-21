const Doctor = require("../models/doctor.models");
const Appointment = require("../models/appointment.models");
const moment = require("moment");


exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getDoctorSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointments = await Appointment.find({
      doctorId: id,
      date: { $gte: new Date(date), $lt: new Date(date + "T23:59:59.999Z") },
    });

    const startTime = moment(doctor.workingHours.start, "HH:mm");
    const endTime = moment(doctor.workingHours.end, "HH:mm");
    const slots = [];

    while (startTime.isBefore(endTime)) {
      let slotEnd = moment(startTime).add(1, "hour");
      if (slotEnd.isAfter(endTime)) break;

      const isBooked = appointments.some((appt) =>
        moment(appt.date).isBetween(startTime, slotEnd, null, "[)")
      );

      if (!isBooked) {
        slots.push({
          start: startTime.format("HH:mm"),
          end: slotEnd.format("HH:mm"),
        });
      }
      startTime.add(1, "hour");
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
