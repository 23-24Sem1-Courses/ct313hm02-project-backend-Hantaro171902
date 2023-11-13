require("dotenv").config();

const app = require("./src/app");

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
