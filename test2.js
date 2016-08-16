/**
 * Created by wb-chm174910 on 2016/8/16.
 */
var db = require('./test')

exports.test = function* test(){
    var sql = 'select * from test';
    var result = yield db.db.sql(sql);

    return result;
}
