const Appointment = require("../models/appointment.models");
const Doctor = require("../models/doctor.models");
const moment = require("moment");


exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("doctorId");
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};




exports.createAppointment = async (req, res) => {
    try {
      const { doctorId, date, appointmentType, patientName, notes } = req.body;
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });


      const appointmentDate = moment(date, "YYYY-MM-DD").toISOString(); 
    //   const endTime = moment(appointmentDate).add(60, "minutes").toISOString();
      
  
      const existingAppointments = await Appointment.find({
        doctorId,
        $or: [
          {
            date: { $gte: appointmentDate },
          },
        ],
      });
  
      if (existingAppointments.length > 0) {
        return res.status(400).json({ error: "Time slot not available" });
      }
  
      const newAppointment = new Appointment({
        doctorId,
        date: appointmentDate, 
        duration: 60,
        appointmentType,
        patientName,
        notes,
      });
  
      await newAppointment.save();
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

  


exports.updateAppointment = async (req, res) => {
  try {
    const { date, appointmentType, patientName, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.date = date || appointment.date;
    appointment.appointmentType = appointmentType || appointment.appointmentType;
    appointment.patientName = patientName || appointment.patientName;
    appointment.notes = notes || appointment.notes;

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
