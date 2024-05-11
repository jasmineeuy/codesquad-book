//add connection to database to connect to mongoose
//require mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
//await mongoose.connect("");

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Mongodb is connected");
}
