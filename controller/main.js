var crypto = require('crypto'),
    User = require('../model/user');
var test = require('../test2')

module.exports = {
    index: function*(){
        var data = yield test;
        console.log(data)
    },
    login:function* (){
        yield this.render('login',{title:"login page"});
    },
    reg:function* (){
        yield this.render('reg',{title:'reg page'});
    },
    logout:function* (){

    },
    saveUser:function* (){

    }
}