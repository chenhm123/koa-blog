var crypto = require('crypto'),
    User = require('../model/user');
var test2 = require('../test2');

module.exports = {
    index: function*(){
        yield this.render('main',{title:"index page",user:this.session.user});
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
        var postBody = this.request.body,
            name = postBody.name,
            email = postBody.email,
            password_re = postBody['password-repeat'],
            password = postBody.password;

        if(password !== password_re){
            return this.redirect('/reg');
        }

        var md5 = crypto.createHash('md5'),
            password = md5.update(password).digest('hex');

        var newUser = new User({
            name:name,
            password:password,
            email:email
        });

        var result = yield newUser.save()

        if(result){
            this.session.user = result;
            this.redirect('/');
        }else{
            this.redirect('/reg');
        }

    }
}