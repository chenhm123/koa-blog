var mainCtrl = require('../controller/main'),
    auth = require('../middlewares/auth');
module.exports = function(app){
    //首页
    app.get('/',mainCtrl.index)
        .get('/login',mainCtrl.login)
        .get('/reg',mainCtrl.reg)
        .get('/logout',mainCtrl.logout);
};