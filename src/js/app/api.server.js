function fun($http,$rootScope,$location){
	function jsonData(data){
		var str='',arr=[]
		for(i in data){
			str=i+'='+data[i]
			arr.push(str)
		}
		return arr.join("&")	
	}

    // 解析地址栏中的参数
    function getParam(){
        var url=location.href;
        if(!url)return false;
        url=url.substr(1);
       // console.log(url)
        // city_id=143&city_name=%E5%8E%A6%E9%97%A8
        var params=url.split("&"),arr,param={};
        params.forEach(function(obj){
             arr=obj.split("=");
           // param[arr[0]]=decodeURI(arr[1]);
            param[arr[0]]=arr[1];
        })
        return param;
    }

	function getData(url,data,method){
        method = method.toUpperCase();
        if(method == 'GET'){
            var datas = jsonData(data);
            var param = getParam();
            return $http.get(url+'?'+data).success(function(res){
            	//console.log(param)
            })  
        }else if(method == 'JSONP'){
        	return $http.jsonp(url).success(function(res){
                // console.log(res)
            })
        }else{
            return $http.post(url,data).success(function(res){
                //console.log(res)
            })
        }
    }

    this.getInfo = function(url,data,method){
		return getData(url,data,method)
	}
}
angular.module("myapp")
	   .service('apiService',fun)
