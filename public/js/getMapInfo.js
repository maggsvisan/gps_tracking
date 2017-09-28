function initMap(data){
    
    var options={
        zoom:20,
        center:{lat:25.650576,lng:-100.288675}
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
                iconImage:'/images/man.png',
                content:'<h1> Camión </h1> <ul>list1</ul>'
                
            };
        }

        else {

            markers[k]=
        {   
            //coords:{ lat: parseFloat(data[k].LAT), lon:parseFloat(data[k].LON)},
            coords:{lat: parseFloat(value1),lng: parseFloat(value2)},
            iconImage:'/images/truck.png',
            content:'<h1> Operador </h1> <ul>list1</ul>'
            
        };
        }
        
        //Array of markers
    }

//    console.log(markers);

    //new map
    var map= new google.maps.Map(document.getElementById('map'),options);
/*
    //Loop throught markers
    for (var i=0; i<markers.length; i++){
        addMarker(markers[i],i);
    }
*/  
  addMarker(markers[6]);
  //addMarker(markers[2]);
   // addMarker(markers[0]);
 /*   addMarker(markers[1]);
  
    addMarker(markers[3]);
    addMarker(markers[4]);
    addMarker(markers[5]);
  
    addMarker(markers[7]);
*/
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
};


function getMapData(){
    var response;
    fetch('/gpsReadings')
        .then(function(res) {
            //console.log(res);
            return res.json();
        }).then(function(data) {
            //console.log(data);
            initMap(data);
        });
};


