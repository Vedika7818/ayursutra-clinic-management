const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/patients", require("./routes/patient"));
app.use("/api/consultations", require("./routes/consultation"));
app.use("/api/therapy", require("./routes/therapy"));
app.use("/api/reception", require("./routes/reception"));
app.use("/api/billing", require("./routes/billing"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
