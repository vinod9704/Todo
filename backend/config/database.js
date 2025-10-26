const mongoose = require("mongoose");
const URI = "mongodb+srv://sunandvemavarapu_db_user:HM86RZ1re9g2mQpg@todos.vidxu9x.mongodb.net/";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
// HM86RZ1re9g2mQpg
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
