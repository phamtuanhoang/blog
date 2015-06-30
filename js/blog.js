$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("GXHG6fMHWBkRQPr2IwJXC5rzRHBnk7fJNXaY8Bul", "k3T2xIAFM9TS2tu7wOx0dm1YJAWzfnR0pWGgYeUI"); 
    //var TestObject = Parse.Object.extend("TestObject");
    //var testObject = new TestObject();
    //testObject.save({foo: "bar"}).then(function(object) {
    //  alert("yay! it worked");
    //});
    //extend blog class
    var Blog = Parse.Object.extend("Blog");
    var Blogs = Parse.Collection.extend({
        model: Blog
        });
    var blogs = new Blogs();
     //blog view class
    var BlogsView =  Parse.View.extend({
        template: Handlebars.compile($('#blogs-tpl').html()),
        render: function(){ 
            var collection = { blog: this.collection.toJSON() };
            this.$el.html(this.template(collection));
    }
    });
    //fetch all blogs
    blogs.fetch({
       success:function(blogs){
            var blogsView = new BlogsView({ collection: blogs });
            blogsView.render();
            $('.main-container').html(blogsView.el);
        },
        error: function(blogs,error){
            console.log(error)
        }
    });
   
});