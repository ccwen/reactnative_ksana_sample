var kfs = require('NativeModules').KsanaFileSystem; 
global.kfs=kfs;
console.log("testing kdb!!!")
var kde=require("ksana-database");


var copykdb=function(){
	kde.open("cbeta",function(err,db){
		setTimeout(function(){
			console.log(err,db)
			console.log(db.get("meta"));

		},500)
	});
}

var test=function() {
	copykdb();
}
copykdb();
module.exports=test;