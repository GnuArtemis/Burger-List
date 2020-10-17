const connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

const orm = {
    selectAll: function (table, callback) {
        const queryString = "SELECT * FROM ?? ;";
        connection.query(queryString, [table], function (err, result) {
            if (err) throw err;
            callback(result);
        })
    },

    //Takes the table to be inserted, all columns as an array of strings, all vals as an array of strings, and a callback function.
    insertOne: function (table, cols, vals, callback) {
        // const queryString = `INSERT INTO ?? (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;

        // vals.unshift(table);

        // console.log(queryString);
        // console.log(vals);
        
        // connection.query(queryString,vals, function(err, result) {
        //     if (err) throw err;

        //     callback(result);
        // })

        var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
    },

    //Takes the table to be updated, updates as an object, the ID of the entry to be updated, and a callback function.
    updateOne: function (table, colValsObj, condition, callback) {
        const queryString = `Update ?? SET ${objToSql(colValsObj)} WHERE id = ?`;

        connection.query(queryString, [table, condition], function(err, result){
            if (err) throw err;

            callback(result);
        })
    },

    //Takes the table to be deleted from, the ID of the entry to be updated, and a callback function.
    delete: function(table, condition, callback) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += "id = "+ condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          console.log("error here")
          throw err;
        }
  
        callback(result);
      });
    }
}

module.exports = orm;