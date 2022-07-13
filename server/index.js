// server/index.js
const express = require("express");
const dbconfig = require("./db/dbconfig.js");
const oracledb = require("oracledb");
const libPath = "C:\\oracle\\instantclient_21_6";
const fs = require("fs");
const PORT = process.env.PORT || 4000;
const app = express();
const db = require("./db/dbuse.js");


app.get("/create", async (req, res) => {
  db.insertToDB(3, "gabriel", 22);
  res.send("ok");
});

app.get ("/read", async (req, res) => {
  db.readFromDB(6);
  res.send("ok");
});

app.get ("/readAll", async (req, res) => {
  db.readAllfromDB();
  res.send("ok");
});

app.get("/update", async (req, res) => {
  db.updateDB(6, "gabriel", 20);
  res.send("ok");
});

app.get("/delete", async (req, res) => {
  db.deleteFromDB(3);
  res.send("ok");
});

app.get("/api", (req, res) => {

  db.run().then((data) => {
    res.send(data);
  } ).catch((err) => {
    console.error(err);
  }
  );
  // run().then(result => {
  //   console.log(result);
  //   res.send(result);
  // });
});
  // estoy mamando aquí
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


async function setupBf(connection) {

  try {

    const stmts = [

      `ALTER SESSION SET nls_date_format = 'YYYY-MM-DD HH24:MI:SS'`,

      `CREATE TABLE PRUEBA (
         id       NUMBER NOT NULL,
         name   VARCHAR2(40),
         age   NUMBER
       )`,

      `INSERT INTO PRUEBA VALUES (1, 'Juan', 20)`,
      `INSERT INTO PRUEBA VALUES (2, 'Pedro', 30)`,
      `INSERT INTO PRUEBA VALUES (3, 'Maria', 40)`,

    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch (e) {
        if (e.errorNum != 942)
          throw (e);
      }
    }
    await connection.commit();

  } catch (err) {
    console.error(err);
  }
}