var mainCtrl = require('../controller/main'),
    auth = require('../middlewares/auth');
module.exports = function(app){
    //首页
    app.get('/',mainCtrl.index)
        .get('/login',auth.checkNotLogin,mainCtrl.login)
        .get('/reg',auth.checkNotLogin,mainCtrl.reg)
        .get('/post',auth.checkLogin,mainCtrl.post)
        .get('/logout',auth.checkLogin,mainCtrl.logout);

    app.post('/reg',mainCtrl.saveUser)
        .post('/post',mainCtrl.publishPost)
        .post('/login',mainCtrl.toLogin);
};