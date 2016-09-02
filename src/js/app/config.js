function config($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
	$urlRouterProvider.otherwise('/login')
	$stateProvider
	.state('public',{
		url : "/public",
		templateUrl : "views/public.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/public.css']}
					   ])
			}
		},
		controller:publicPage
	})
	.state('public.shopping',{
		url : '/shopping?id&name',
		templateUrl : "views/shopping.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/swiper-3.3.1.min.css','css/bootstrap.min.css','css/shopping.css']}
						])
			} 
		},
		controller:shoppingPage
	})
	.state('public.good',{
		url : "/good?id&name",
		templateUrl : "views/good.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/good.css','css/bootstrap.min.css','css/swiper-3.3.1.min.css']}
						])
			}
		},
		controller:goodPage
	})
	.state('public.inspiration',{
		url : "/inspiration?id&name",
		templateUrl : "views/inspiration.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/swiper-3.3.1.min.css','css/bootstrap.min.css','css/inspiration.css']}
						])
			}
		},
		controller:inspirationPage
	})
	.state('public.chat',{
		url : "/chat?id&name",
		templateUrl : "views/chat.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/chat.css']}
						])
			}
		},
		controller:chatPage
	})
	.state('public.myself',{
		url : '/myself?id&name',
		templateUrl : "views/myself.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/swiper-3.3.1.min.css','css/bootstrap.min.css','css/myself.css']}
						])
			} 
		},
		controller:myselfPage
	})
	.state('setPage',{
		url : "/setPage",
		templateUrl : "views/setPage.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/reset.css','css/setPage.css']}
					   ])
			}
		},
		controller:setPage
	})	
	.state('signUp',{
		url : "/signUp",
		templateUrl : "views/signUp.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/signUp.css']}
					   ])
			}
		}
	})	
	.state('login',{
		url : "/login",
		templateUrl : "views/login.html",
		resolve : {
			loacPligin : function($ocLazyLoad){
				return $ocLazyLoad.load([
							{files:['css/reset.css','css/login.css']}
					   ])
			}
		},
		controller:loginPage
	})	
}

angular.module("myapp")
	   .config(config)