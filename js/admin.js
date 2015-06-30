$(function() {
    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("GXHG6fMHWBkRQPr2IwJXC5rzRHBnk7fJNXaY8Bul", "k3T2xIAFM9TS2tu7wOx0dm1YJAWzfnR0pWGgYeUI"); 
   

    //add new blog view
    var AddBlogView = Parse.View.extend({
        template: Handlebars.compile($('#add-tpl').html()),
        render: function(){
            this.$el.html(this.template());
        }
    });
    
    //log in view 
    var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        events: {
            'submit .form-signin': 'login'
        },
        login: function(e) {
            // Prevent Default Submit Event
            e.preventDefault();
     
            // Get data from the form and put them into variables
            var data = $(e.target).serializeArray(),
                username = data[0].value,
                password = data[1].value;
     
            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: function(user) {
                    var welcomeView = new WelcomeView({ model: user });
                    welcomeView.render();
                    $('.main-container').html(welcomeView.el);
                },
                // If there is an error
                error: function(user, error) {
                    console.log(error);
                }
            });
        },
        render: function(){
            this.$el.html(this.template());
        }
    }),
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        events: {
        'click .add-blog': 'add'
        },
        add: function(){
            alert(123);
            var addBlogView = new AddBlogView();
            addBlogView.render();
            $('.main-container').html(addBlogView.el);
        },
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    });
 
    //log in view
    var loginView = new LoginView();
    loginView.render();
    $('.main-container').html(loginView.el);
    
    
    
    
});
