// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import dotenv from "dotenv";
// // import { connectDB } from "./config/connectDB.js";
// // dotenv.config();
// // import userRoutes from "./routes/user.routes.js";
// // import sellerRoutes from "./routes/seller.routes.js";
// // import productRoutes from "./routes/product.routes.js";
// // import cartRoutes from "./routes/cart.routes.js";
// // import addressRoutes from "./routes/address.routes.js";
// // import orderRoutes from "./routes/order.routes.js";

// // import { connectCloudinary } from "./config/cloudinary.js";

// // const app = express();

// // await connectCloudinary();
// // // allow multiple origins
// // const allowedOrigins = ["http://localhost:5173"];
// // //middlewares
// // app.use(cors({ origin: allowedOrigins, credentials: true }));
// // app.use(cookieParser());
// // app.use(express.json());

// // // Api endpoints
// // app.use("/images", express.static("uploads"));
// // app.use("/api/user", userRoutes);
// // app.use("/api/seller", sellerRoutes);
// // app.use("/api/product", productRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/address", addressRoutes);
// // app.use("/api/order", orderRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`Server is running on port ${PORT}`);
// // });

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";
// dotenv.config();
// import userRoutes from "./routes/user.routes.js";
// import sellerRoutes from "./routes/seller.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import addressRoutes from "./routes/address.routes.js";
// import orderRoutes from "./routes/order.routes.js";

// import { connectCloudinary } from "./config/cloudinary.js";

// const app = express();

// await connectCloudinary();

// // ✅ FIXED: Allow correct origin (5174)
// const allowedOrigins = ["http://localhost:5174"];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// // Api endpoints
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";
import { connectDB } from "./src/config/connectDB.js";
// import { connectCloudinary } from "./config/cloudinary.js";
import { connectCloudinary } from "./src/config/cloudinary.js";
import path from "path";

// Load environment variables
dotenv.config();

// Import Routes
import userRoutes from "./src/routes/user.routes.js";
import sellerRoutes from "./src/routes/seller.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import addressRoutes from "./src/routes/address.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

const app = express();

const __dirname = path.resolve();

// Connect to Cloudinary
await connectCloudinary();

// ✅ Allow multiple frontend origins in dev
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true, // needed for cookies/auth headers
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Serve uploaded images statically
app.use("/images", express.static("uploads"));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
});
