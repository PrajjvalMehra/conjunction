const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
connectDB();

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const PORT = process.env.PORT || 4000;  

const  app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

// app.use(cors({origin: 'http://localhost:3000', credentials: true}));
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});




