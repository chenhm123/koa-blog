var crypto = require('crypto'),
    User = require('../model/user');

module.exports = {
    index: function*(){
        yield this.render('main',{"title":"koa demo"});
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
        var ctx = this;
        var postBody = this.request.body,
            name = postBody.name,
            password = postBody.password,
            password_re = postBody['password-repeat'];

        if(password_re != password){
            return ctx.redirect('/reg')
        }
        var md5 = crypto.createHash('md5'),
            email = postBody.email,
            password = md5.update(password).digest('hex');
        var newUser = new User({
            name:name,
            password:password,
            email:email
        });
        User.get(newUser.name,function(err,user){
            if(err){
                return ctx.redirect('/');
            }
            if(user){
                return ctx.redirect('/reg');
            }
            newUser.save(function(err,user){
                if(err){
                    return res.redirect('/reg');
                }
                this.req.session.user = user;
                ctx.redirect('/');
            })
        })
    }
}