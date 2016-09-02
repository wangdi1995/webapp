function publicPage($scope,$rootScope,apiService,$location){
	$scope.navArr = [
		{"name":"购物","sref":"public.shopping({'id':1,name:'shoppingPage'})","id":0,"class":"iconfont icon-shop","flag":true},
		{"name":"良品","sref":"public.good({'id':2,name:'goodPage'})","id":1,"class":"iconfont icon-zuanshi","flag":false},
		{"name":"灵感","sref":"public.inspiration({'id':3,name:'inspirationPage'})","id":2,"class":"iconfont icon-liaotian","flag":false},
		{"name":"聊天","sref":"public.chat({'id':4,name:'chatPage'})","id":3,"class":"iconfont icon-wode","flag":false},
		{"name":"我的","sref":"public.myself({'id':5,name:'myselfPage'})","id":4,"class":"iconfont icon-linggan-copy","flag":false}
	]
	$rootScope.name = $location.search().name;
	$scope.showAlertBox = function($event){
		console.log(event.target)
	}
	$scope.toggle=function(idx){
		/*if(idx==$scope.navArr[idx].id){
			 $scope.navArr[idx].flag = true;
		}*/
       for(i in $scope.navArr){
       		$scope.navArr[i].flag = false;  		
       }
       $scope.navArr[this.$index].flag = true;
    }
    $scope.set = function(){
    	//location.href = "views/setPage.html";
    	$location.path('setPage');
    }
	apiService.getInfo('data/data.json',{},'get')
	.success(function(data){
		$rootScope.datas=data;
		$rootScope.insHot = data.inspirationPage.hot;
		$rootScope.insRec = data.inspirationPage.recommend; 
		$rootScope.insAtt = data.inspirationPage.attention; 
		$rootScope.insLive = data.inspirationPage.liveStreaming;
		$rootScope.gShop = data.goodPage.gShop; 
		$rootScope.gCloth = data.goodPage.gCloth;
	})
}
function shoppingPage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	$rootScope.flag1 = true;
	$rootScope.flag2 = false;
	$rootScope.flag3 = false;
	$rootScope.flag4 = true;
	$rootScope.flag5 = false;
	$rootScope.flag6 = true;
	$rootScope.flag7 = false;
	$rootScope.flag8 = false;
	$rootScope.flag9 = false;
	$rootScope.flag = false;
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false
    });
}
function goodPage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	$rootScope.flag1 = false;
	$rootScope.flag2 = true;
	$rootScope.flag3 = false;
	$rootScope.flag4 = false;
	$rootScope.flag5 = false;
	$rootScope.flag6 = true;
	$rootScope.flag7 = false;
	$rootScope.flag8 = false;
	$rootScope.flag9 = false;
	$rootScope.title = "良品";
	$rootScope.flag = false;
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false
    });
}
function inspirationPage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	$rootScope.flag1 = false;
	$rootScope.flag2 = false;
	$rootScope.flag3 = false;
	$rootScope.flag4 = false;
	$rootScope.flag5 = true;
	$rootScope.flag6 = false;
	$rootScope.flag7 = false;
	$rootScope.flag8 = false;
	$rootScope.flag9 = false;
	$rootScope.flag = false;
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false
    });
	$scope.changeShow = function(showMode){
		$scope.showMode = showMode;
	}
}
function chatPage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	$rootScope.flag1 = false;
	$rootScope.flag2 = false;
	$rootScope.flag3 = true;
	$rootScope.flag4 = false;
	$rootScope.flag5 = false;
	$rootScope.flag6 = false;
	$rootScope.flag7 = true;
	$rootScope.flag8 = false;
	$rootScope.flag9 = false;
	$rootScope.title = "聊天";
	$rootScope.flag = false;
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false
    });
}
function myselfPage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	$rootScope.flag1 = false;
	$rootScope.flag2 = false;
	$rootScope.flag3 = false;
	$rootScope.flag4 = false;
	$rootScope.flag5 = false;
	$rootScope.flag6 = false;
	$rootScope.flag7 = false;
	$rootScope.flag8 = true;
	$rootScope.flag9 = false;
	$rootScope.flag = true;
}


function homePage($scope,$rootScope){
	$scope.aClass = 'fadeInLeft';
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false
    });
    $scope.showAlertBox=function(element){
    	console.log(element)
    }
}

function setPage($scope,$rootScope,$location){
	$scope.aClass = 'fadeInLeft';
    $scope.sExit=function(){
    	console.log(0)
    	$location.path('login');
    }
}

function loginPage($scope,apiService,$state){
	$scope.aClass = 'bouncleInLeft';
	
	$scope.loginBtn = function(){
		apiService
	      .getInfo("http://localhost:3000/res?callback=JSON_CALLBACK",{},"jsonp")
	      .success(function(e){
	       e.forEach(function(v){
	           if($scope.name == v.uName && $scope.psw == v.uPwd){
	              $state.go('public.myself');
	              alert("登录成功")
	          }
	        })
	      })
	}
}
angular.module("myapp")
	   .controller(publicPage)
	   .controller(shoppingPage)
	   .controller(goodPage)
	   .controller(inspirationPage)
	   .controller(chatPage)
	   .controller(myselfPage)
	   .controller(setPage)
	   .controller(loginPage)

