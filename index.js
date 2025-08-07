const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const processPayloads = require("./controllers/processPayloads");

const app = express();
// app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main()
  .then(async () => {
    console.log("Datbase connected");
    await processPayloads();
    app.listen(process.env.PORT, () => {
      console.log(`Server runnig on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

/* mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected');
    await processPayloads(); // Process payloads on startup
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
 */
