//dependencies
const oracledb = require("oracledb");
const fs = require("fs");
const dbconfig = require("./dbconfig.js");

// container
const lib = {};
const libPath = "C:\\oracle\\instantclient_21_6";

if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}

// Insert data into db
lib.insertToDB = async function insertToDB(id, name, age) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const result = await connection.execute(
      `INSERT INTO PRUEBA (id, name, age) VALUES (${id}, '${name}', ${age})`
    );
    await connection.commit();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Read data from db
lib.readFromDB = async function readFromDB(id) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `SELECT * FROM PRUEBA WHERE id = ${id}`
        );
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

lib.readAllfromDB = async function readAllfromDB() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `SELECT * FROM PRUEBA`
        );
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

// Update data in db
lib.updateDB = async function updateDB(id, name, age) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `UPDATE PRUEBA SET name = '${name}', age = ${age} WHERE id = ${id}`
        );
        await connection.commit();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

// Delete data from db
lib.deleteFromDB = async function deleteFromDB(id) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `DELETE FROM PRUEBA WHERE id = ${id}`
        );
        await connection.commit();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}



lib.run = async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const result = await connection.execute(`SELECT * FROM PRUEBA`);
    console.log(result);

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
};

module.exports = lib;
