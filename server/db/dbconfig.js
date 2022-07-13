module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "VSCODE",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "ORACLE",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/orclpdb",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
  