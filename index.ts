import dotenv from "dotenv";
import { initHttpServer } from "./server";

dotenv.config({
  path: "./.env",
}); // Load environment variables from .env file

const { NODE_ENV, PORT } = process.env; // Get NODE_ENV from environment variables
if (!NODE_ENV || !PORT) {
  console.error(
    "Missing environment variables. Please set all required variables."
  );
  process.exit(1); // Exit the process with an error code
}

// Initialize the HTTP server
initHttpServer(PORT); // Initialize the HTTP server on the specified port
