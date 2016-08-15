var config = require('../config/config'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(config.db, new Server(config.host, config.dbPort),
    {safe: true});