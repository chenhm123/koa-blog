/**
 * Created by wb-chm174910 on 2016/8/16.
 */
var db = require('mysql-promise')();

db.configure({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "blog",
    "port":"3306"
});


db.sql = function(query, params) {
    //console.log(query + params);
    return db.query(query, params).then(function(data) {
        return data[0];
    }, function(e) {
        var error = new Error(e);
        error.message += '\nSql:' + query + '\nParams:' + JSON.stringify(params);
        throw error;
        return error;
    });
};

exports.db = db;