var crypto = require('crypto'),
    Post = require('../model/post'),
    User = require('../model/user');

module.exports = {
    index: function*(){
        var data ;
        if(this.session.user&&this.session.user.name){
            data = yield Post.getPostByUserName(this.session.user.name);
        }else{
            data = yield Post.getAll();
        }
        yield this.render('main',{title:"index page",user:this.session.user,posts:data});
    },
    login:function* (){
        yield this.render('login',{title:"login page"});
    },
    post:function* (){
      yield this.render('post',{title:'post page'});
    },
    reg:function* (){
        yield this.render('reg',{title:'reg page'});
    },
    logout:function* (){
        this.session.user = null;
        this.redirect('/')
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

        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');

        var newUser = new User({
            name:name,
            password:password,
            email:email
        });

        if((yield newUser.save())){
            this.session.user = result;
            this.redirect('/');
        }else{
            this.redirect('/reg');
        }
    },
    toLogin:function* (){
        var postBody = this.request.body,
            name = postBody.name,
            password = postBody.password;

        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');

        var dbUser = yield User.get(name);
        if(dbUser){
            if(dbUser.password === password){
                this.session.user = dbUser;
                return this.redirect('/');
            }
        }
        this .redirect('/login');
    },
    publishPost:function* (){
        var postBody = this.request.body,
            title = postBody.title,
            post = postBody.post,
            name = this.session.user.name;

        if(title&&post&&name&&name){
            var post = new Post(name,title,post);
            var result = yield post.save();
            if(result){
                this.redirect('/');
            }else{
                throw Error('rr')
            }
        }

    }
}