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

var date = {};
date.getCurrentTime = function(format){
    return date.format(new Date(),format)
}

date.format = function (date,format) {
    var year = date.getFullYear(),
        month = date.getMonth() +1 < 10? '0'+(date.getMonth()+1):(date.getMonth()+1),
        day = date.getDate() < 10 ? '0'+date.getDate():date.getDate(),
        hours = date.getHours() < 10? '0'+date.getHours():date.getHours(),
        minutes = date.getMinutes() < 10? '0'+date.getMinutes():date.getMinutes(),
        seconds = date.getSeconds() < 10? '0'+date.getSeconds():date.getSeconds();

    format = format.replace(/yyyy/,year).replace(/MM/,month).replace(/dd/,day).replace(/hh/,hours)
        .replace(/mm/,minutes).replace(/ss/,seconds);
    return format
}

exports.date = date;