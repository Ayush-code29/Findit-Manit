import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import connectDB from "./db/db.js";

import userRoutes from "./routes/user.routes.js";
import lostItemRoutes from "./routes/lostItem.routes.js";
import foundItemRoutes from "./routes/foundItem.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dns from 'dns';
dns.setServers(["1.1.1.1","8.8.8.8"]);



connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/lost-items",
  lostItemRoutes
);

app.use(
  "/api/found-items",
  foundItemRoutes
);
app.use(
  "/api/claims",
  claimRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.listen(
  process.env.PORT || 5000,
  () =>
    console.log(
      "Server Running"
    )
);