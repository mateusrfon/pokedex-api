const dotenv = require('dotenv');

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });
} else {
  dotenv.config();
}

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js"
  },
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};