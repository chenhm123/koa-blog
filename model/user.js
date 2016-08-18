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
    if(!(yield User.get(user.name))){
        return !!(yield util.mysql.sql('insert into users(name,password,email) values(?,?,?)',[user.name,user.password,user.email]));
    }
};
User.get = function* (name){
    var dbUser = yield util.mysql.sql('select * from users  where name=?',name);
    if(dbUser.length !== 0){
        return dbUser[0];
    }else{
        return null;
    }
}
