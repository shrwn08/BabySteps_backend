const appointmentModel = require("../models/appointment.models");
const moment = require("moment");

async function isSlotAvailable (doctor_id, date, duration){

    const existingAppointments = await appointmentModel.find({doctor_id,date :{$gte : date} });

  return existingAppointments.every((app)=>{
    const endTime = moment(app.date).add(app.duration, 'minutes');
    return moment(date).add(duration, 'minutes').isBefore(app.date) || moment(date).isAfter(endTime)
  })
}

module.exports = isSlotAvailable;