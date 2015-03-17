		var express = require("express");
		var app     = express();
		var path    = require("path");
		var bodyParser = require('body-parser') ;
		var multer = require('multer') ;
var done = false ; 


/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


		//app.use(bodyParser()) ; 
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
		  extended: true
		}));


		app.get('/',function(req,res){
		  res.sendFile(path.join(__dirname+'/index.html'));
		  //__dirname : It will resolve to your project folder.
		});

		app.get('/about',function(req,res){
		res.sendFile(path.join(__dirname+'/about.html'))
		});

		app.post('/about',function(req,res){
		
		res.sendFile(path.join(__dirname+'/about.html')) ;

		 if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
				});


		app.listen(5000);

		console.log("Running at Port 5000");
