/**
 * Created by wb-chm174910 on 2016/8/18.
 */
var util = require('../public/common/util'),
    markdown = require('markdown').markdown;


function Post(name,title,post){
    this.name = name;
    this.title = title;
    this.post = post;
}

module.exports = Post;

Post.prototype.save = function* (){
    var time = util.date.getCurrentTime('yyyy-MM-dd hh:mm:ss'),
        post = {
            name:this.name,
            time:time,
            title:this.title,
            post:this.post
        };
    return !!(yield util.mysql.sql('insert into post(name,title,post,time) values(?,?,?,?)',[post.name,post.title,post.post,post.time]));
}
Post.getPostByUserName = function* (name){
    var dbPost = yield util.mysql.sql('select * from post  where name=?',name);
    if(dbPost.length !== 0){
        dbPost.forEach(function(post){
            post.time = util.date.format(post.time,'yyyy-MM-dd hh:mm:ss');
            post.post = markdown.toHTML(post.post);
            post.post = post.post.replace(/\n/g,'<br/>');
        })
        return dbPost;
    }else{
        return null;
    }
}
Post.getAll = function* (){
    var dbPost = yield util.mysql.sql('select * from post?');
    if(dbPost.length !== 0){
        dbPost.forEach(function(post){
            post.time = util.date.format(post.time,'yyyy-MM-dd hh:mm:ss');
            post.post = markdown.toHTML(post.post);
        })
        return dbPost;
    }else{
        return null;
    }
}

