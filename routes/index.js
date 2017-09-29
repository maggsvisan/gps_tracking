var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Navigation Real Time Map' });
});

router.get('/themap',function(req,res){
	res.render('map', { title: 'the map' });
});

router.get('/homepage',function(req,res){
	res.render('homepage', { title: 'Navigation Tracking System' });
});

router.get('/future',function(req,res){
	res.render('future', { title: 'Navigation Tracking System' });
});

router.get('/mapnotes',function(req,res){
	res.render('mapnotes', { title: 'Navigation Tracking System' });
});

router.get('/thelist', function(req, res){
	var MongoClient= mongodb.MongoClient;
	var url= 'mongodb://localhost:27017/sampsite';

	MongoClient.connect(url, function(err,db){
		if (err){
			console.log('Unable to connect to the server',err);
		}

		else{
			console.log("Connection Established");

			var collection= db.collection('students');

			collection.find({}).toArray(function(err,result){
			
			if (err){
				res.send(err);
			}
			else if (result.length){
				res.render('studentlist',{"studentlist" :result});
			}
			else{
				res.send('No documents found');
			}

			db.close();

			});
		}
	});
});


router.get('/gpsReadings', function(req, res){
	var MongoClient= mongodb.MongoClient;
	var url= 'mongodb://localhost:27017/sampsite';

	MongoClient.connect(url, function(err,db){
		if (err){
			console.log('Unable to connect to the server',err);
		}

		else{
			console.log("Connection Established");

			var collection= db.collection('mygps');

			collection.find({}).toArray(function(err,result) {
				console.log(result);
				console.log("RESULT");
				return res.send(result);

				if (err){
					res.send(err);
				}
				else if (result.length){
					res.render('gpslist',{"gpslist" :result});
				}
				else{
					res.send('No documents found');
				}

				db.close();

			});
		}
	});
});


router.get('/collisions', function(req, res){
	var MongoClient= mongodb.MongoClient;
	var url= 'mongodb://localhost:27017/sampsite';

	MongoClient.connect(url, function(err,db){
		if (err){
			console.log('Unable to connect to the server',err);
		}

		else{
			console.log("Connection Established");

			var collection= db.collection('collisions');

			collection.find({}).toArray(function(err,result){
			
			if (err){
				res.send(err);
			}
			else if (result.length){
				res.render('coList',{"coList" :result});
			}
			else{
				res.send('No documents found');
			}

			db.close();

			});
		}
	});
});

router.get('/newstudent', function(req,res){
	res.render('newstudent',{title:'Add Student'});
});

router.post('/addstudent',function(req,res){
	var MongoClient= mongodb.MongoClient;
	var url= 'mongodb://localhost:27017/sampsite';

	MongoClient.connect(url, function(err,db){
		if(err){
			console.log("Unable to connect to server",err)
		}
		else{
			console.log("Connect to server");

			var collection= db.collection('students');
			var student1={student: req.body.student, age: req.body.age};
		
			        // Insert the student data into the database
        collection.insert([student1], function (err, result){
          
          if (err) {
            console.log(err);
          } 
          else {
            // Redirect to the updated student list
            res.redirect("thelist");
          }
 
          // Close the database
          db.close();
        });

		}
	});

});



module.exports = router;
