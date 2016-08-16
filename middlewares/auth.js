module.exports = function* (next){
    if(!this.session || !this.session.user){
        return this.redirect('/login');
    }
    yield next;
}