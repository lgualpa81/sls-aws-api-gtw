import { DataSource } from "typeorm";
import { User } from "../shared/entities/User";

export const dbDS = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  synchronize: true, //OJO para prod deshabilitar
  entities: [User],
  //logging: true,
  migrations: [],
});
