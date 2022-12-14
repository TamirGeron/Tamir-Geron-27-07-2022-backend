const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();
const http = require("http").createServer(app);

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const chatRoutes = require("./api/chat/chat.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Test endpoint for check system is up
app.get("/", async (req, res) => {
  res.send("Server is ready");
});

app.get("/**", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");

const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
