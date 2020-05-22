const mongoose = require("mongoose");
const { Profile } = require("../models");

function connectDb() {
  return mongoose.connect(process.env.MONGODB_URI, { useFindAndModify: false });
}

const dbInit = async () => {
  return await connectDb().then(async () => {
    if (process.env.NODE_ENV !== "prod") {
      await Promise.all([
        Profile.deleteMany({})
      ])
    }
  })
}

module.exports = dbInit;
