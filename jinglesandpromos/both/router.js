Router.configure({
	layoutTemplate: "layout"
})

Router.route('/', function(){
	this.render('landingPage')
}, {
	name:'landingPage'
});

Router.route('/demos', function(){
	this.render('demos')
},{
	name: 'demos'
})