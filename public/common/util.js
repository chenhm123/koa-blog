/**
 * Created by wb-chm174910 on 2016/8/17.
 */
var mysql = require('mysql-promise')();

mysql.configure({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "blog",
    "port":"3306"
});


mysql.sql = function(query, params) {
    return mysql.query(query, params).then(function(data) {
        return data[0];
    }, function(e) {
        var error = new Error(e);
        error.message += '\nSql:' + query + '\nParams:' + JSON.stringify(params);
        throw error;
    });
};

exports.mysql = mysql;