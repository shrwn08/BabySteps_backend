const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: Date, required: true },
  duration: { type: Number, default: 60 }, 
  appointmentType: { type: String, required: true },
  patientName: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
