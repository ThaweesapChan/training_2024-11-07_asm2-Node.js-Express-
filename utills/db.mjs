import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:Wjc-jp005@localhost:5432/bockpostApp",
});

export { pool };