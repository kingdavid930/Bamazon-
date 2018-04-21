const fs = require('fs');
const mysql = require("mysql");

const connection = mysql.createConnection({

    host: "localhost",
    user:"root",
    password: ""
    
    
    });

const readFile = (path) => {
  return fs.readFile(path, "utf8", (err, data) => {
    if (err) throw err;
    let arr = data.split(";")
    arr = arr.splice(0, arr.length - 1)
    connection.connect()
    arr.forEach(statement => connection.query(statement, (err, res) => {
      if (err) throw err;
    }))
    connection.end()
  })
}

readFile("seed.sql");