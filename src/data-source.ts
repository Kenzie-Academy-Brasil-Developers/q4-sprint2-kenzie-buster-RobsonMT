import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "migrations/**/*.{ts,js}")],
});
