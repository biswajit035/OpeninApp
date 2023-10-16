const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  try {
      const conn = await mongoose
        .connect(
          `mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASS}@cluster0.4m23f.mongodb.net/openinapp?retryWrites=true&w=majority`,
          { useNewUrlParser: true }
        )
        .then(() => {
          console.log("successfully connected with mongo atlas");
        })
        .catch((err) => {
          console.log(err);
        });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
