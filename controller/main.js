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

    }
}