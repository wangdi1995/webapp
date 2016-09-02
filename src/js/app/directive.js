function creatDom(){
			return{
				link:function(scope,element){//指令（即函数名）放在哪，element就指的什么
					$('.f-list').on("click","li",function(){
						var idx=$(this).index();
		    			element.css({
		    				"left":idx*20+"%",
		    				"transition":"left 0.3s"
		    			})
					})
				}
			}
}

function keyUp(){
			return{
				link:function(scope,element){//指令（即函数名）放在哪，element就指的什么
					element.on("propertychange",function(){
						console.log(0)
					})
				}
			}
}
		angular.module("myapp")
	    .directive('creatDom',creatDom)
	    .directive('keyUp',keyUp)
