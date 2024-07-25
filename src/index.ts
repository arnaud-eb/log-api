// loads the environment variables from the .env file
// and makes them available in the process.env object.
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config/index.ts";

import app from "./server.ts";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
