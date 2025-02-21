const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const doctorRoutes = require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

console.log()

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
