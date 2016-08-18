//未登录跳转到登录页面
exports.checkLogin = function* (next){
    if (!this.session && !this.session.user) {
        return this.redirect('/login');
    }
    yield next;
};
//登录的无法进入注册和login页面
exports.checkNotLogin = function* (next){
    if (this.session && this.session.user) {
        return this.redirect('back');//返回之前的页面
    }
    yield next;
}