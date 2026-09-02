require("dotenv").config();

// console.log({
//   cloudName:
//     process.env.CLOUDINARY_CLOUD_NAME,

//   apiKey:
//     process.env.CLOUDINARY_API_KEY,

//   apiSecretExists:
//     !!process.env.CLOUDINARY_API_SECRET,
// });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer()