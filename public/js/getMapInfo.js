var mongodb=require('mongodb');

function initMap(data){
    
    var options={
        zoom:20,
        center:{lat:25.652050,lng:-100.292239}

    }
/*
    var markers=[
            {   coords:{lat:25.650576,lng:-100.288675},
                iconImage:'/images/man.png',
                content:'<h1> Operador1 </h1>'
            },

            {   coords:{lat:25.650423,lng:-100.288406},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>'
            },


            {   coords:{lat:25.6504166,lng:-100.2882685},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>'
            },

            {  coords:{lat:25.6505492,lng:-100.2892259},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>'
            },


            {  coords:{lat:25.6505492,lng:-100.2892259},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>',
            },

            {  coords:{lat:25.6505492,lng:-100.2892259},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>'
            },

            {  coords:{lat:25.6505492,lng:-100.2892259},
                iconImage:'/images/truck.png',
                content:'<h1> Camión1 </h1> <ul>list1</ul>'
            }

        ];
*/
   // console.log(markers);

   var value1;
   var value2;
   var type;
   var markers=[];

   // console.log(data);
    for(var k in data) {
        value1 = data[k].LAT;
        value2 = data[k].LON;
        type = data[k].ID;

       // console.log(type);

        //aqui quedaria poner un if que dependiendo el ID que tengas es la sticker que te toca:)

        if (type == 6 || type == 7) {
            markers[k]=
            {   
                //coords:{ lat: parseFloat(data[k].LAT), lon:parseFloat(data[k].LON)},
                coords:{lat: parseFloat(value1),lng: parseFloat(value2)},
                iconImage:'/images/truck.png',
                content:'<h1> Camión </h1> <ul>list1</ul>'
                
            };
        }

        else {

            markers[k]=
        {   
            //coords:{ lat: parseFloat(data[k].LAT), lon:parseFloat(data[k].LON)},
            coords:{lat: parseFloat(value1),lng: parseFloat(value2)},
            iconImage:'/images/man.png',
            content:'<h1> Operador </h1> <ul>list1</ul>'
            
        };
        }
        
        //Array of markers
    }

   console.log(markers);

    //new map
    var map= new google.maps.Map(document.getElementById('map'),options);

    //Loop throught markers
    for (var i=0; i<markers.length; i++){
        addMarker(markers[i],i);
    }

    //Add marker function
    function addMarker(props){
        console.log(props);
        var marker= new google.maps.Marker({
        position: props.coords,
        map:map,
        icon:props.iconImage
        });

        if (props.iconImage){
            marker.setIcon(props.iconImage);
        }

        if (props.content){
            var infoWindow = new google.maps.InfoWindow({content:props.content
            });

            marker.addListener('click',function(){
            infoWindow.open(map,marker);
        });

        }
    }

    checkPossibleCollision(data);
    //function checkPossibleCollision(data){
function checkPossibleCollision(data){
    
    var riskDistance = 0.00005; //Security radio for each object in security area

    var collisions = [];
    var distances = [];
    var possibleCollisions = [];
    var distance = 0.0;

    for(i = 0; i < data.length; i++) {
        console.log("comparison: ",i)
        if (i < data.length-1){
            for(j = i; j < data.length; j++) {
                if (i != j){
                    distance = Math.sqrt(Math.pow(data[i].LAT-data[j].LAT,2)+Math.pow(data[i].LON-data[j].LON,2));
                    distances.push(
                        {
                            ID1 : data[i].ID,
                            ID2 : data[j].ID,
                            DIST : distance,
                            DATETIME : data[i].DATETIME
                        });
                    console.log(data[i].ID,data[j].ID,distance);
                }
            }
        }
        
    }
    console.log("Possible collisions: ");
    for(var i in distances)
    {
        if(distances[i].DIST <= riskDistance)
        {
            possibleCollisions.push(distances[i]);
            console.log(distances[i]);
        }

    }
            console.log(possibleCollisions);        
    
    //insertCollisionDB(possibleCollisions);
    //return possibleCollisions;
    }


    function insertCollisionDB(collision){
        var MongoClient= mongodb.MongoClient;
        var url= 'mongodb://localhost:27017/sampsite';

        MongoClient.connect(url, function(err,db){
            if(err){
                console.log("Unable to connect to server",err)
            }
            else{
                console.log("Connect to server");

                var collection= db.collection('collisions');
                var collision1={DATETIME: possibleCollisions[0],ID1: possibleCollisions[1], ID2 : possibleCollisions[2],DIST: possibleCollisions[3] };
               
                        // Insert the student data into the database
            collection.insert([collision1], function (err, result){
                  
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

    }


};//cierra toda la función 


function getMapData(){
    var response;
    fetch('/gpsReadings')
        .then(function(res) {
            console.log(res);
            return res.json();
        }).then(function(data) {
            console.log(data);
            initMap(data);
        });
};


