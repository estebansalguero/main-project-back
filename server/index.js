// server/index.js
const express = require("express");
const dbconfig = require("./db/dbconfig.js");
const oracledb = require("oracledb");
const libPath = "C:\\oracle\\instantclient_21_6";
const fs = require("fs");
const PORT = process.env.PORT || 4000;
const app = express();

if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    //await setupBf(connection);
    const result = await connection.execute(`SELECT * FROM BF`);
    console.log(result.rows);
    return result.rows;

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.get("/api", (req, res) => {
  run().then(result => {
    res.send(result);
  });
});
  // estoy mamando aquí
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
