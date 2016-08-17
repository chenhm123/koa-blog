var mongodb = require('./db');
var util = require('../public/common/util');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function* (){
    var user = {
        name:this.name,
        password:this.password,
        email:this.email
    };

    var isExist = yield util.mysql.sql('select * from users  where name=?',user.name);
    if(isExist.length !== 0){
        return false;
    }else{
        var user = yield util.mysql.sql('insert into users(name,password,email) values(?,?,?)',[user.name,user.password,user.email]);
        return user;
    }
};
User.get = function* (name){
    mongodb.open(function(err,db){
        if(err){
            return err;
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return err;
            }
            collection.findOne({
                name:name
            },function(err,user){
                mongodb.close();
                if(err){
                    return err;
                }else{
                    console.log(123)
                    return user;
                }
            })
        })
    })
}
