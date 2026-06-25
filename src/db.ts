import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql_harsimran",
  database: "garden_with_us",
});

export default pool;
