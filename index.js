const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
// const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const processPayloads = require("./controllers/processPayloads");
const userRouter = require("./routes/User.router");
const messageRouter = require("./routes/Message.router");
const User = require("./models/User.model");
const Message = require("./models/Message.model");
const path = require("path");


const server = http.createServer(app);

// allow the frontend origin only (set by env)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// app.use(express.static(path.resolve(__dirname,'dist')))

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
  transports: ['websocket','polling']
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.json({ok:true})
});

// console.log("Hey I am in backend...")

io.on("connection", (socket) => {
  // console.log("New connected backend",socket.id)

  socket.on(
    "sendMessage",
    async ({ toUserWaId, message, fromUserWaId, timestamp }) => {
      console.log("sendMessage event triggered in backend from frontend", socket.id, timestamp);

      try {
        const recipient = await User.findOne({ wa_id: toUserWaId });
        // console.log("recipent", recipient);
        if (recipient && recipient.socketId) {
          io.to(recipient.socketId).emit("receiveMessage", {
            message,
            fromUserWaId,
            toUserWaId,
            timestamp,
          });

          // Store the message in MongoDB
          await Message.create({
            wa_id: toUserWaId,
            from: fromUserWaId,
            to: toUserWaId,
            message,
          });

          // console.log(`Message sent from ${socket.id} to ${recipient.socketId}`);
        } else {
          // console.log("Recipient not found");
          await Message.create({
            wa_id: toUserWaId,
            from: fromUserWaId,
            to: toUserWaId,
            message,
          });
        }

        socket.emit("messageAdded",{toUserWaId, message, fromUserWaId, timestamp})
      } catch (err) {
        console.error("Error sending private message:", err);
      }
    }
  );
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main()
  .then(async () => {
    console.log("Datbase connected");
    await processPayloads();
    server.listen(process.env.PORT, () => {
      console.log(`Server runnig on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// console.log("Hey I am in backend...==================>")

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
