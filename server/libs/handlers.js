// request handlers

//dependencies
const oracledb = require("oracledb");
const fs = require("fs");
const dbconfig = require("./dbconfig.js");
const { Console } = require("console");
const { type } = require("os");
const libPath = "C:\\oracle\\instantclient_21_6";

if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}

// Define all handlers
const handlers = {};

// DB use
handlers.crud = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._crud[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the CRUD methods
handlers._crud = {};

handlers._crud.post = async function (data, callback) {
  var name =
    typeof data.payload.name == "string" && data.payload.name.trim().length > 0
      ? data.payload.name.trim()
      : false;
  var age =
    typeof data.payload.age == "number" &&
    data.payload.age % 1 === 0 &&
    data.payload.age >= 0
      ? data.payload.age
      : false;

  if (name && age) {
    var connection;
    try {
      connection = await oracledb.getConnection(dbconfig);
      var result = await connection.execute(
        `INSERT INTO PRUEBA (name, age) VALUES ('${name}', ${age})`
      );
      await connection.commit();

      callback(200, result.rowsAffected);
    } catch (err) {
      console.error(err);
      callback(500, { error: "Could not insert into the DB" });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    callback(400, { error: "Missing required fields" });
  }
};

handlers._crud.get = async function (data, callback) {
  var name =
    typeof data.queryStringObject.name == "string" &&
    data.queryStringObject.name.trim().length > 0
      ? data.queryStringObject.name.trim()
      : false;
  if (name) {
    var connection;
    try {
      connection = await oracledb.getConnection(dbconfig);
      var result = await connection.execute(
        `SELECT * FROM PRUEBA WHERE name = '${name}'`
      );
      await connection.commit();

      callback(200, result.rows);
    } catch (err) {
      console.error(err);
      callback(500, { error: "Could not get from the DB" });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    callback(400, { error: "Missing required fields" });
  }
}


handlers._crud.put = async function (data, callback) {
  var id = parseInt(data.payload.id);
  var name =
    typeof data.payload.name == "string" && data.payload.name.trim().length > 0
      ? data.payload.name.trim()
      : false;
  var age =
    typeof data.payload.age == "number" &&
    data.payload.age % 1 === 0 &&
    data.payload.age >= 0
      ? data.payload.age
      : false;

  if (id && name && age) {
    var connection;
    try {
      connection = await oracledb.getConnection(dbconfig);
      var result = await connection.execute(
        `UPDATE PRUEBA SET name = '${name}', age = ${age} WHERE id = ${id}`
      );
      await connection.commit();

      callback(200, result.rowsAffected);
    } catch (err) {
      console.error(err);
      callback(500, { error: "Could not update the DB" });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    callback(400, { error: "Missing required fields" });
  }
}

handlers._crud.delete = async function (data, callback) {
  console.log(data.payload.id);
  var id = parseInt(data.payload.id);
  if (id) {
    var connection;
    try {
      connection = await oracledb.getConnection(dbconfig);
      var result = await connection.execute(
        `DELETE FROM PRUEBA WHERE id = ${id}`
      );
      await connection.commit();

      callback(200, result.rowsAffected);
    } catch (err) {
      console.error(err);
      callback(500, { error: "Could not delete from the DB" });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    callback(400, { error: "Missing required fields" });
  }
}


// Ping handler
handlers.ping = function (data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;
