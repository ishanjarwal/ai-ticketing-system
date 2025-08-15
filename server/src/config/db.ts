import mongoose from "mongoose";

async function db(): Promise<void> {
  try {
    await mongoose.connect(
      process.env.DB_URI as string,
      {
        dbName: "ai-ticketing-system",
        bufferCommands: true,
      } as mongoose.ConnectOptions
    );

    console.log("database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

export default db;
