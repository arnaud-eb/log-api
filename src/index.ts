// loads the environment variables from the .env file
// and makes them available in the process.env object.
import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
