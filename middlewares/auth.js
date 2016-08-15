module.exports = function* (next){
    if(!this.session || !this.session.user){
        this.redirect('/login');
        return
    }
    yield next;
}