const mongoose = require("mongoose");
const initData = require("./kidsData.js");
const Data = require("../models/Kids.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}

const initDB = async () => {
  try {
    await Data.deleteMany({});
    await Data.insertMany(initData.data);
    console.log("data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();
