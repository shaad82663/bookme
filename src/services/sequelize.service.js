// src/services/sequelize.service.js
import sequelize from "../config/database"; // ← Import the instance directly
import fs from "fs";

const modelFiles = fs
  .readdirSync(__dirname + "/../models/")
  .filter((file) => file.endsWith(".js"));

const sequelizeService = {
  init: async () => {
    try {
      // Use the already-created instance
      const connection = sequelize;

      // Load and initialize models
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        if (model.default.init) {
          model.default.init(connection);
        }
      }

      // Setup associations
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        if (model.default.associate) {
          model.default.associate(connection.models);
        }
      }

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
  getInstance: () => sequelize, // Optional: for transactions
};

export default sequelizeService;
