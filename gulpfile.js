var gulp = require('gulp'),
	//文件操作模块
	fs = require('fs'),
	// 连接本地服务器模块
	connect = require('gulp-connect'),
	// 本地服务器编译响应
	respond = require('gulp-respond'),
	//压缩js
	uglify = require('gulp-uglify'),
	//合并js
	concat = require('gulp-concat'),
	//编译sass
	sass = require('gulp-ruby-sass'),
	//压缩html
	minifyHTML = require('gulp-minify-html'),
	//压缩链接文件
	Annotate = require('gulp-ng-annotate'),
	//md5加密
	rev = require('gulp-rev'),
	//替换加密后的js文件
	revCollector = require('gulp-rev-collector'),
	//压缩合并angularjs代码
	ngmin = require('gulp-ngmin'),
	//将压缩后的文件重命名
	rename=require('gulp-rename'),
	//清空压缩文件之外的文件
	clean=require('gulp-clean');

//连接gulp服务器
gulp.task('connect',function(){
	connect.server({//启动本地server
		root:['src','./bower_components'],//需要访问的静态资源目录
		port:3001,//端口号
		livereload:true,//实现页面自动刷新
		middleware:function(){//本地server中间件,完成本地动态编译
			return [function(req,res,next){//响应 请求 回调
				console.log("开始操作")//回调函数执行前操作
				next()
			},function(req,res){
				var path=req.url.split("?").shift();//得到文件路径
				path=path=='/' ? '/build/home.html' :path;
				url="src"+path;
				if(!fs.existsSync(url)){//判断一个文件是否存在
					url='bower_components'+path;
				}
				gulp.src(url)//src方法是指定需要处理的源文件的路径
					.pipe(respond(res))//响应
			}]
		}
	})
})

//清除上一次压缩过的js文件
gulp.task('clean',function(){
	return gulp.src(['./src/js/app/build'/*,'./src/build'*/])
			   .pipe(clean())
})

//压缩js文件
gulp.task('build',['clean'],function(){//同步
	return gulp.src([
		'src/js/app/app.js',
		'src/js/app/config.js',
		'src/js/app/controller.js',
		'src/js/app/directive.js',
		'src/js/app/apiService.js'
		])
		.pipe(Annotate())
		.pipe(ngmin())
		.pipe(uglify())
		.pipe(concat('ng.js'))
		.pipe(rename(function(path){
			path.basename+=".min"
			path.extname='.js'
		}))
		.pipe(rev())
		.pipe(gulp.dest('./src/js/app/build/'))
		.pipe(rev.manifest())//生成json
		.pipe(gulp.dest('./src/'))
})

//压缩html文件
gulp.task('index',['build'],function(){
	return  gulp.src('./src/index.html')
				.pipe(rename(function(path){
					path.basename = 'home'
					path.extname = '.html'
				}))
				.pipe(minifyHTML())
				.pipe(gulp.dest('./src/build/'))
})

//md5加密
gulp.task('rev',['index'],function(){
   return gulp.src(['./src/rev-manifest.json','./src/build/home.html'])
				.pipe(revCollector())
				.pipe(gulp.dest('./src/build/'))
})

//编译sass文件
gulp.task("sass",function(){
	return sass("src/css/*.scss").pipe(gulp.dest("src/css/"));
})

//刷新html
gulp.task("reloadhtml",["rev"],function(){
	//console.log("这是html")
	gulp.src('src/build/index.html')
		.pipe(connect.reload());
})

//监听
var pathFile=["src/js/app/*.js","src/css/*.scss","src/*.html"];
gulp.task("watch",function(){//需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字
	gulp.watch(pathFile,/*["build","sass","reloadhtml"]*/["reloadhtml","sass"]);
})

//执行任务
gulp.task('server',['sass','rev'/*,'reloadhtml'*/,'connect','watch']);

//加密文件名过长怎么办==》改源码==》找到gulp-rev index.js 找到filename rev-path rev-hash
//编译sass文件
/*gulp.task("sass",function(){
	gulp.src("src/css/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("src/css/"))
})*/

//监听
/*gulp.task('watch',function(){
	gulp.task('reloadHtml',function(){
	gulp.reloadHtml('src/index.html')
		.pipe(connect.reload())
	})
	gulp.watch('src/js/app/*.js',['build','reloadHtml'])
	gulp.watch('src/css/*.scss',['scss'])
})*/

