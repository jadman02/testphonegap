var refreshIntervalId;

var desktoparray = ['media/dateicon.png','media/duckicon.png','media/datetongue.png','media/dateorducklogo.png']

function doSomething() {

var i = Math.floor(Math.random() * 4) + 0; 
  $(".desktopimage").attr("src", desktoparray[i]);


}




var myFunction = function() {
        doSomething();
        var rand = Math.round(Math.random() * (1000 - 700)) + 700; 
        refreshIntervalId = setTimeout(myFunction, rand);
    }
    myFunction();

var mobile = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {mobile = 1;}
else{
mobile = 0;


$('.login-loader').hide();

$('.dateduckdesktop').append('<div style="clear:both;width:100%;text-align:center;border-top:1px solid #ccc;margin-top:10px;"><p>Meet people nearby for a date or a <strike>fu**</strike>  duck.</br></br>Open on your phone.</p></div>');




}


//if (mobile===1){



try {
  // try to use localStorage
  localStorage.test = 2;        
} catch (e) {
  // there was an error so...
  alert('You are in Privacy Mode\nPlease deactivate Privacy Mode and then reload the page.');
}





// Initialize your app
var myApp = new Framework7({dynamicNavbar: true,init: false,showBarsOnPageScrollEnd:false});

// Export selectors engine
var $$ = Dom7;

var view1, view2, view3, view4;
var updatecontinuously = false;

var initialload = false;
var allowedchange = true;
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
var myMessages, myMessagebar, f_description,existingchatnotifications, message_history = false, message_historyon, datealertvar = false, datealert = false, latitudep, longitudep, incommondate, incommonduck,f_uid,f_name,f_first,f_gender,f_age,f_email,f_image,f_token, f_upper, f_lower, f_interested,sexuality;
var f_to_date = [],f_to_duck = [],f_date_me = [],f_duck_me = [],f_date_match = [],f_duck_match = [],f_date_match_data = [],f_duck_match_data = [];
var f_auth_id;
var blocklist;
var lastkey;
var pickerDescribe,pickerDescribe2, pickerCustomToolbar;
var existingmessages;
var additions = 0;
var myPhotoBrowser;
var singlePhotoBrowser;
var calendarInline;
var keepopen;
var userpref;
var loadpref= false;
var loadpref2= false;
var loaded = false;
var myList;
var myphotosarray;
var matcheslistener;
var noresultstimeout;
var timeoutactive = false;
var radiussize,sortby,offsounds;
var industry_u,status_u,politics_u,eyes_u,body_u,religion_u,zodiac_u,ethnicity_u,height_u,weight_u;
var descriptionslist = [];
var nameslist = [];
var fdateicon = '<img src="media/dateicon.png" style="width:28px;margin-right:5px;">';
var fduckicon = '<img src="media/duckicon.png" style="width:28px;margin-right:5px;">';
var notifcount;
var swiperPhotos;
  var swiperQuestions;
var myswiperphotos;
var flargedateicon = '<img src="media/dateicon.png" style="width:60px;">';
var flargeduckicon = '<img src="media/duckicon.png" style="width:60px;">';
var mySwiper;
myApp.init();
var f_projectid;
var canloadchat;
var viewphotos = false;     
var viewscroll = false;

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var firebaseinit;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        
               
    

        // Add views
view1 = myApp.addView('#view-1');
view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
view3 = myApp.addView('#view-3');
view4 = myApp.addView('#view-4');
       



    
    
//authstatechanged user only
 
 firebase.auth().onAuthStateChanged(function(user) {
  

  
  if (user) {
      
      
f_projectid = firebase.auth().currentUser.toJSON().authDomain.substr(0, firebase.auth().currentUser.toJSON().authDomain.indexOf('.'));




       f_uid = user.providerData[0].uid;
       f_auth_id = user.uid;
        f_name = user.providerData[0].displayName;

        
         f_first = f_name.substr(0,f_name.indexOf(' '));
         f_email = user.providerData[0].email;
          f_image = user.providerData[0].photoURL;
                 
   
   $( ".userimagetoolbar" ).css("background-image","url(\'https://graph.facebook.com/"+f_uid+"/picture?type=normal\')");
   

   
  
   
  
   
   $( "#profilepic" ).empty();
   $( "#profilepic" ).append('<div style="float:left;height:70px;width:70px;border-radius:50%;margin:0 auto;background-size:cover;background-position:50% 50%;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?type=normal\');"></div>');

firebase.database().ref('users/' + f_uid).update({
    auth_id : f_auth_id
  }).then(function() {getPreferences();});




   
    
    
  
    
    
    
    
  } else {
      

      
      $( ".ploader" ).show();
      $( ".loginbutton" ).show();
      $( ".login-loader" ).hide();

   
    // No user is signed in.
  }
});
 
        

        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {}

};

$$('.panel-right').on('panel:opened', function () {

leftPanel();

});

$$('.panel-right').on('panel:open', function () {
    
    $( ".upgradeli" ).slideDown();
   
   
    
});




$$('.panel-right').on('panel:closed', function () {
    
myList.deleteAllItems();
myList.clearCache();

//firebase.database().ref('notifications/' + f_uid).off('value', notificationlist);
   
    
});


function compare(a,b) {
  if (a.chat_expire < b.chat_expire)
    return -1;
  if (a.chat_expire > b.chat_expire)
    return 1;
  return 0;
}

$$('.panel-left').on('panel:closed', function () {
$(".timeline").empty();
    
    
});






$$('.panel-left').on('panel:open', function () {
    rightPanel();
    
    
   
    
});

$$('.panel-right').on('panel:closed', function () {
    
    $( ".upgradeli" ).hide();
   
    
});




// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content-1');
 


// Add 'refresh' listener on it
ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    //loaded = false;
    getPreferences();
    setTimeout(function () {
        // Random image
     
        myApp.pullToRefreshDone();
    }, 1000);
});

// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content-2');
 
// Add 'refresh' listener on it
ptrContent.on('ptr:refresh', function (e) {

myList.deleteAllItems();
myList.clearCache();




    setTimeout(function () {
        // Random image
     leftPanel();
        myApp.pullToRefreshDone();
    }, 1000);
});

var onSuccess = function(position) {
    latitudep = position.coords.latitude;
longitudep = position.coords.longitude;

//alert(latitudep);
//alert(longitudep);

updateGeo();

   
   

$( ".age-header" ).remove();
    $( ".swiper-container-loaded" ).remove();
 
    };


  function onError(error) {
       
       if (error.code == '1'){
 
      
       jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCAqd15w-_K31IUyLWNlmkHNmZU5YLSg6c", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .done(function() {
      //alert('done');
  })
.fail(function(err) {
     myApp.alert('You must share your location on date or duck', 'Oops we cannot find you');
  });
       
      
      
      }
       
       
       
       
       
       
       
      
       if ((error.code == '2') || (error.code == '3')){
           jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCAqd15w-_K31IUyLWNlmkHNmZU5YLSg6c", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .done(function() {
      //alert('done');
  })
.fail(function(err) {
     myApp.alert('There has been an error.', 'Oops we cannot find you');
  });
       
      
            
       
       }

    }

function getWifilocation(){



navigator.geolocation.getCurrentPosition(onSuccess, onError);



}

var apiGeolocationSuccess = function(position) {

latitudep = position.coords.latitude;
longitudep = position.coords.longitude;

//alert(latitudep);
//alert(longitudep);

updateGeo();

    $( ".age-header" ).remove();
    $( ".swiper-container-loaded" ).remove();
   




};



function mainLoaded(id){
$( ".iconpos_" + id ).show();
$( ".default_" + id ).hide();

var indivNotif = firebase.database().ref('notifications/' + f_uid + '/' + id);
indivNotif.once('value', function(snapshot) {

if (snapshot.val()){
var obj = snapshot.val();


if (obj.new_message_count >0 && obj.to_uid == f_uid && obj.received =='N'){$(  ".arrowdivhome_" + id ).empty();$( ".arrowdivhome_" + id ).append('<span class="badge" style="background-color:rgb(255, 208, 0);color:black;margin-top:5px;margin-left:-5px;">'+obj.new_message_count+'</span>');}
else{$(  ".arrowdivhome_" + id ).empty();}


}
});

}


var all_matches_photos=[];
var new_all = [];
var main_all = [];


function getMatches(){



//can put any ads here
if ((initialload === false) && (availarray.length === 0)){



}

initialload = true;

if (updatecontinuously){}
else {setInterval(function(){ justGeo(); }, 599000);updatecontinuously=true;}

new_all = [];


    if (timeoutactive === true) {clearTimeout(noresultstimeout);}
    
    timeoutactive = true;
    
    



firebase.auth().currentUser.getToken().then(function(idToken) {








$.post( "locations.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,upper:f_upper,lower:f_lower,radius:radiussize,sexuality:sexuality,sortby:sortby,latitudep:latitudep,longitudep:longitudep} )
  .done(function( data ) {

var result = JSON.parse(data); 

console.log(data);
console.log(result);

 for (var i = f_lower; i <= f_upper; i++) {}

var slidewidth = $( document ).width() / 1.7;
    var halfwidth = -Math.abs(slidewidth / 2.23);
     
   //  var rownumber;
  //  var calcrownumber = f_upper-f_lower;
    
   // var columnslides;
  //  var specialstyles;
  //  if (calcrownumber == 0){rownumber = 3;columnslides=9;}
   // if (calcrownumber > 0){rownumber = 1;columnslides=1;}

    var  slide_number = 0;
    for (var i = f_lower; i <= f_upper; i++) {
        
     

        all_matches_photos[i] = [];
    $( ".content-here" ).append(
   
   // '<span class="badge age-header header_'+i+'" style="display:none;text-align:left;float:left;width:100%;border-radius:0px;background-color:white;color:black;">'+i+'</span>'+
      '  <div class="swiper-container swiper-container-loaded swiper-'+i+'" style="display:none;height:'+slidewidth+'px;clear:both;background-color:white;">'+
       '<div class="blockleft_'+i+'" style="display:none;color:white;padding:3px;height:20px;width:20px;-webkit-border-top-right-radius: 50%;-webkit-border-bottom-right-radius: 50%;background-color:#2196f3;position:absolute;left:0;top:50%;z-index:9999;margin-top:-10px;"><div style="float:left;"><i  class="pe-7s-angle-left pe-lg" style="margin-left:-9px;color:white;float:left;margin-top:3px"></i><span style="float:left;font-size:12px;margin-left:-5px;margin-top:2px;">'+i+'</span></div></div>'+
              '<div class="blockright_'+i+' multiple_'+i+'" style="display:none;margin-top:-10px;color:white;padding:3px;height:20px;width:20px;-webkit-border-top-left-radius: 50%;-webkit-border-bottom-left-radius: 50%;background-color:#2196f3;position:absolute;right:0px;top:50%;z-index:9999;margin-top:-7.5px;"><div style="float:right;"><i  class="pe-7s-angle-right pe-lg" style="margin-right:-9px;color:white;float:right;margin-top:3px"></i><span style="float:right;font-size:12px;margin-right:-5px;margin-top:2px;">'+i+'</span></div></div>'+
              '<div class="blockright_'+i+' single_'+i+'" style="margin-top:-10px;color:white;padding:3px;height:20px;width:20px;border-radius:50%;margin-right:5px;background-color:#2196f3;position:absolute;right:0px;top:50%;z-index:9999;margin-top:-7.5px;"><div style="float:right;"><span style="float:right;font-size:12px;margin-right:2px;margin-top:2px;">'+i+'</span></div></div>'+
    '<div class="swiper-wrapper wrapper_'+i+'">'+

   // '<div class="swiper-slide"><div style="background-color:white;height:50%;width:50%;margin-top:50%;margin-left:25%;"></div></div>'+
    '</div>'+

'</div>'
        
        );
        


    
    
myApp.swiper('.swiper-' + i, {
    slidesPerView:1.7,
    freeMode:true,
    //slidesOffsetBefore:halfwidth,
    slidesOffsetAfter:12,
        preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
   //centeredSlides: true,
    watchSlidesVisibility:true,
    watchSlidesProgress: true,

onSlideChangeEnd:function(swiper){

var firstclasslist = $(swiper.slides[0]).attr("class").split(' ');
 var currentswiper = firstclasslist[0].replace("age_", "");
var swiperslideslength = swiper.slides.length;



if (swiper.activeIndex === 0){$('.blockright_' + currentswiper).show();$('.blockleft_' + currentswiper).hide();
}
else {
if (swiper.activeIndex > 0){
//if(swiper.isEnd){console.log('going to start');swiper.slideTo(0);}
if (swiper.activeIndex == swiperslideslength-2 || swiper.activeIndex == swiperslideslength-1){
$('.blockright_' + currentswiper).hide();$('.blockleft_' + currentswiper).show();}

else{

$('.blockright_' + currentswiper).hide();$('.blockleft_' + currentswiper).hide();}


}



}






},

    onClick:function(swiper, event) {

var ageswiper = swiper.clickedSlide.classList[0].replace("age_", "");

    photoBrowser(swiper.clickedIndex,ageswiper);}
    //pagination:'.swiper-pagination'
  });
  
  slide_number++;
    
 }



descriptionslist = [];
nameslist = [];

   
   
   
   $( ".results-loader" ).hide();
   
   if (result == 77 ||(result.length ===1 && result[0].uid == f_uid ) ){
   
   
   
    $( ".results-loader" ).hide();
    $('.content-here').append(
    '<div class="no-results-div" style="text-align:center;margin:0 auto;width:300px;position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-70px;">'+
    
    '<img src="media/datetongue.png" style="width:80px;margin:0 auto;">'+
    
   '<h3>No one is nearby</h3><p style="padding-top:0px;margin-top:-10px;">Try changing your search radius, </br>age range or filters.</p></br>'+


   

    '</div>');
   
   
   }
   else {
 

 var tonight = new Date();
tonight.setHours(22,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);

   for (i = 0; i < result.length; i++) { 
    
    
var photosstringarray =[];
var photocount;
var photostring;
var blocked = 0;
var subtract = result[i].age;
var laston = result[i].timestamp;

var industry_d = result[i].industry;
var status_d = result[i].status;
var politics_d = result[i].politics;
var eyes_d = result[i].eyes;
var body_d = result[i].body;
var religion_d = result[i].religion;
var zodiac_d = result[i].zodiac;
var ethnicity_d = result[i].ethnicity;
var height_d = result[i].height;
var weight_d = result[i].weight;



var namescount = result[i].displayname.split(' ').length;
var matchname;
var minphotowidth = $( document ).width();

var imagestyle;
imagestyle='width:100%;max-height:' + slidewidth + 'px;overflow:hidden;';

var availarraystring='';


var availnotexpired = false;


if(result[i].availstring && (result[i].availstring != '[]') && (result[i].uid != f_uid)){

console.log(result[i].availstring);
  var availablearrayindividual = JSON.parse(result[i].availstring);

console.log(availablearrayindividual);

 for (k = 0; k < availablearrayindividual.length; k++) { 
if (availablearrayindividual[k].id >= tonight_timestamp){availnotexpired = true;}

}  

if (availnotexpired){availarraystring = result[i].availstring;}



}
var profilepicstring;
var photoarrayuserlarge;
var photoarrayusersmall;
if(result[i].largeurl){



var heightarray = result[i].heightslides.split(",");
var widtharray = result[i].widthslides.split(",");

console.log(heightarray[0]);
console.log(widtharray[0]);

if (heightarray[0] > widtharray[0]) {imagestyle = 'width:100%;max-height:' + slidewidth + 'px;overflow:hidden;'}
if (widtharray[0] > heightarray[0]) {imagestyle = 'height:100%;max-width:' + slidewidth + 'px;overflow:hidden;'}



photostring = '<div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical" style="height:100%;"><img data-src="' + result[i].largeurl + '" class="swiper-lazy"></div></div>';



photocount = result[i].largeurl.split(",").length;
photoarrayuserlarge = result[i].largeurl.split(",");
photoarrayusersmall = result[i].smallurl.split(",");



profilepicstringlarge = photoarrayuserlarge[0];
profilepicstringsmall = photoarrayusersmall[0];


photostring=photostring.replace(/,/g, '" class="swiper-lazy" style="height:100%;"></div></div><div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical"><img data-src="')



}
else{

photostring = '<div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical"><img data-src="https://graph.facebook.com/'+result[i].uid+'/picture?width=828" class="swiper-lazy" style="height:100%;"></div></div>';

profilepicstringlarge = 'https://graph.facebook.com/'+result[i].uid+'/picture?width=828&height=828';
profilepicstringsmall = 'https://graph.facebook.com/'+result[i].uid+'/picture?width=368&height=368';


photocount = 1;
}


//console.log(photostring);

if(namescount === 1){matchname = result[i].displayname;}
else {matchname = result[i].name.substr(0,result[i].displayname.indexOf(' '));}
var matchdescription = result[i].description;


  var swipernumber = subtract - f_lower; 
  var curswiper = $$('.swiper-container')[swipernumber].swiper;
  var graphid = result[i].uid;
var distance = parseFloat(result[i].distance).toFixed(1);
var distancerounded = parseFloat(result[i].distance).toFixed(0);
if ((distance >= 0) && (distance <0.1)) {distancestring = 'Less than 100 m <span style="font-size:13px;">(328 ft.)</span>'}
if ((distance >= 0.1) && (distance <0.2)) {distancestring = 'Less than 200 m <span style="font-size:13px;">(656 ft.)</span>'}
if ((distance >= 0.2) && (distance <0.3)) {distancestring = 'Less than 300 m <span style="font-size:13px;">(984 ft.)</span>'}
if ((distance >= 0.3) && (distance <0.4)) {distancestring = 'Less than 400 m <span style="font-size:13px;">(1312 ft.)</span>'}
if ((distance >= 0.4) && (distance <0.5)) {distancestring = 'Less than 500 m <span style="font-size:13px;">(1640 ft.)</span>'}
if ((distance >= 0.5) && (distance <0.6)) {distancestring = 'Less than 600 m <span style="font-size:13px;">(1968 ft.)</span>'}
if ((distance >= 0.6) && (distance <0.7)) {distancestring = 'Less than 700 m <span style="font-size:13px;">(2296 ft.)</span>'}
if ((distance >= 0.7) && (distance <0.8)) {distancestring = 'Less than 800 m <span style="font-size:13px;">(2624 ft.)</span>'}
if ((distance >= 0.8) && (distance <0.9)) {distancestring = 'Less than 900 m <span style="font-size:13px;">(2953 ft.)</span>'}
if ((distance >= 0.9) && (distance <1.0)) {distancestring = 'Less than 1 km <span style="font-size:13px;">(3280 ft.)</span>'}
if ((distance >= 1.0) && (distance <1.609344)) {distancestring = 'Less than '+distancerounded+ ' km <span style="font-size:13px;">(' + Math.round(distance * 3280.84) + ' ft.)</span>'}

if (distance > 1.609344){distancestring = 'Less than '+distancerounded+ ' km <span style="font-size:13px;">(' + Math.round(distance * 0.621371) + ' mi.)</span>'}

var zz = new Date();
var mmn = zz.getTimezoneOffset();


console.log(result[i].timestamp);

var timestampyear = result[i].timestamp.substring(0,4);
var timestampmonth = result[i].timestamp.substring(5,7);
var timestampday = result[i].timestamp.substring(8,10);



var timestamphour = result[i].timestamp.substring(11,13);
var timestampminute = result[i].timestamp.substring(14,16);
var timestampsecond = result[i].timestamp.substring(17,20);






var timestampunix=(new Date(timestampmonth + '/' + timestampday + '/' + timestampyear + ' ' + timestamphour + ':' + timestampminute + ':' + timestampsecond)).getTime() / 1000 + 64800;


 var d_unix = Math.round(+new Date()/1000);

var diff = (d_unix - timestampunix)/60;





var activecircle;


if (diff<11){activecircle = '<span style="position:absolute;left:10px;height:10px;width:10px;border-radius:50%;bottom:10px;background-color:#4cd964"></span>';}
else{activecircle = '<span style="position:absolute;left:10px;bottom:10px;height:10px;width:10px;border-radius:50%;background-color:transparent;border:1px solid #ccc;"></span>';}
if ($('.slide_' + graphid).length){
  

  
   var classremove = $('.slide_' + graphid).attr("class").split(' ');
  
 var agej = classremove[0].replace("age_", "");
  
  for (var k = 0; i <= all_matches_photos[agej].length; k++) {
     

      
      if (all_matches_photos[agej][k].url == 'https://graph.facebook.com/'+graphid+'/picture?type=large'){all_matches_photos[agej].splice(k, 1);}
      
  }

  
  
  $('.slide_' + graphid).remove();

var slidesleft = $(".age_" + agej ).length;


if (slidesleft === 0) {
    
     $('.swiper-' + agej).hide();
      $('.header_' + agej).hide();
}




}

  
  if (graphid != f_uid){
  
  $('.swiper-' + subtract).show();
      $('.header_' + subtract).show();
}
  



  var blockedid = blocklist.indexOf(graphid);
  


  
  //Do not show the users profile to themselves, and do not show profiles older than 1 month
  if ((graphid != f_uid) && (blockedid < 0) && (diff < 43800)){
      

     
var index1 = f_date_match.indexOf(graphid);
var index2 = f_duck_match.indexOf(graphid);
var index3 = f_duck_me.indexOf(graphid);
var index4 = f_date_me.indexOf(graphid);







var slidecontent;
if (index1 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+graphid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#2196f3;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\');" style="display:none;'+imagestyle+'-webkit-filter:none;overflow:hidden;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/datefaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;">'+matchname+'</p></div></div>';   
}

else if (index2 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+graphid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#2196f3;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:none;display:none;overflow:hidden;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/duckfaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;">'+matchname+'</p></div></div>';    

} 



else if (index3 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+graphid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;-webkit-filter:grayscale(1%);display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/duckfaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;">'+matchname+'</p></div></div>';           
} 


else if (index4 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+graphid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="float" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;-webkit-filter:grayscale(1%);display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/datefaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;">'+matchname+'</p></div></div>';      
} 


else {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+graphid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-top:-30px;color:white;font-size:15px;text-align:left;float:left;margin-left:23px;">'+matchname+'</p></div></div>';    

}









if(


all_matches_photos[subtract].length === 0){curswiper.appendSlide(slidecontent);
all_matches_photos[subtract].push({widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancenumber:distance,distancestring:distancestring,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});
}
else {


if(sortby=='random'){



var insertindex = Math.floor(Math.random() * all_matches_photos[subtract].length) +0;
insertAfterNthChild($('.wrapper_' + subtract), insertindex, slidecontent); 
all_matches_photos[subtract].splice(insertindex, 0, {widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancestring:distancestring,distancenumber:distance,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});
}


if(sortby=='distance' || sortby == 'activity'){
curswiper.appendSlide(slidecontent);
all_matches_photos[subtract].push({widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancestring:distancestring,distancenumber:distance,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});

}


}



    




  

//curswiper.slideNext();
 //console.log('herenext');  


if (all_matches_photos[subtract][0].id == graphid || all_matches_photos[subtract][1].id == graphid || all_matches_photos[subtract][2].id == graphid){
   

  $(".photo_"+graphid).attr("src", profilepicstringsmall); 

}






  
 // all_matches_photos[subtract].push({url:'https://graph.facebook.com/'+graphid+'/picture?type=large',caption:'...'});      

  
  //all_matches_photos[subtract].push({url:'https://graph.facebook.com/'+graphid+'/picture?type=large',caption:'...'});
  //all_matches_photos[subtract].unshift({url:'https://graph.facebook.com/'+graphid+'/picture?type=large',caption:'...'});


  
  
  
  

  }




}
}
   


   
var swiperselector=0;   
   for (var i = f_lower; i <= f_upper; i++) {

console.log(all_matches_photos[i].length);

if (all_matches_photos[i].length >1){$('.single_'+i).hide();$('.multiple_'+i).show();}else{$('.single_'+i).show();$('.multiple_'+i).hide();}
if (all_matches_photos[i].length ===0){$( ".swiper-"+i ).hide();}





$$('.swiper-container')[swiperselector].swiper.updateContainerSize();
  $$('.swiper-container')[swiperselector].swiper.updateProgress(); 
$$('.swiper-container')[swiperselector].swiper.updateSlidesSize();
$$('.swiper-container')[swiperselector].swiper.updateClasses();
//$$('.swiper-container')[swiperselector].swiper.slideTo(0);




//$('.swiper-container')[swiperselector].swiper.appendSlide('<div style="width:'+slidewidth+'px;"><img src="media/datetongue.png" style="width:50px;left:50%;top:50%;margin-left:-25px;margin-top:-25px;"></div>')



  
  
swiperselector ++;
for (var j = 0; j < all_matches_photos[i].length; j++) {
new_all.push(all_matches_photos[i][j]);





}



}
 
   
  if (new_all.length === 0){

    $( ".results-loader" ).hide();
    $('.content-here').append(
    '<div class="no-results-div" style="text-align:center;margin:0 auto;width:300px;position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-70px;">'+
    
    '<img src="media/datetongue.png" style="width:80px;margin:0 auto;">'+
    
   '<h3>No one is nearby</h3><p style="padding-top:0px;margin-top:-10px;">Try changing your search radius, </br>age range or filters.</p></br>'+


   

    '</div>');
} 
   
    
    });
    
    
   

 
   

    //here is the id token call
    
    }).catch(function(error) {
  // Handle error
});
   
    
    
    $( ".ploader" ).hide();
    
    $( ".toolbar" ).show();
    $( ".loginbutton" ).show();
$( ".login-loader" ).hide();
    

 $('.no-results-div').empty();

clearInterval(refreshIntervalId);


deletePhotos();




}



function justGeo(){

firebase.auth().currentUser.getToken().then(function(idToken) {   
$.post( "updatelocation.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,latitude:latitudep,longitude:longitudep} )

  .done(function( data ) {
  
console.log('updatedtimestamp');
  
 
  
  });


    }).catch(function(error) {
  // Handle error
});
    
}

function updateGeo(){
firebase.auth().currentUser.getToken().then(function(idToken) {  
$.post( "updatelocation.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,latitude:latitudep,longitude:longitudep} )
//$.post( "updatelocation.php", { uid:f_uid,latitude:latitudep,longitude:longitudep} )
  .done(function( data ) {
  console.log('update lcoation'+data);
  getMatches();
  
 
  
  });
      }).catch(function(error) {
  // Handle error
});

//var matchesRef = firebase.database().ref(sexuality + '/'+ f_age);
//var geoFire = new GeoFire(matchesRef);
//geoFire.set(f_uid + '*' + f_age + '*' + f_first, [latitudep, longitudep]).then(function() {

 
  
//}, function(error) {

//});


    
}



function getPreferences(){

// Test if user exists



if(userpref) {firebase.database().ref('users/' + f_uid).off('value', userpref);}

userpref = firebase.database().ref('users/' + f_uid).on("value",function(snapshot) {
    var userexists = snapshot.child('lower').exists(); // true
    

    
    if (userexists) { 
    

    
        
    
  //  var matchessetting = firebase.database().ref("users/" + f_uid).on("value",function(snapshot) {
        
   //    if (!snapshot.child("to_date").val()) {f_to_date = [];}
   //     else{f_to_date = snapshot.child("to_date").val();}
        
   

        
        
      //  if (!snapshot.child("to_duck").val()) {f_to_duck = [];}
      //  else{f_to_duck = snapshot.child("to_duck").val();}
        
       // if (!snapshot.child("date_me").val()) {f_date_me = [];}
      //  else{f_date_me = snapshot.child("date_me").val();}
        
       // if (!snapshot.child("duck_me").val()) {f_duck_me=[];}
      //  else{f_duck_me = snapshot.child("duck_me").val();}
        
       //  incommondate = f_to_date.filter(function(n) {
   // return f_date_me.indexOf(n) != -1;
//});

//incommonduck = f_to_duck.filter(function(n) {
//    return f_duck_me.indexOf(n) != -1;
//});  
        
  //  });

industry_u = snapshot.child("industry").val();
status_u = snapshot.child("status").val();
politics_u = snapshot.child("politics").val();
eyes_u = snapshot.child("eyes").val();
body_u = snapshot.child("body").val();
religion_u = snapshot.child("religion").val();
zodiac_u = snapshot.child("zodiac").val();
ethnicity_u = snapshot.child("ethnicity").val();
height_u = snapshot.child("height").val();
weight_u = snapshot.child("weight").val();

    
sortby = snapshot.child("sort").val();
if (snapshot.child("offsounds").val()){offsounds = snapshot.child("offsounds").val();}
if (snapshot.child("availstring").val()){ availarray = JSON.parse(snapshot.child("availstring").val());}
f_description = snapshot.child("description").val(); 
        f_lower = snapshot.child("lower").val(); 
         radiussize = snapshot.child("radius").val(); 
f_token = snapshot.child("token").val();
        f_upper = snapshot.child("upper").val(); 
        f_interested = snapshot.child("interested").val(); 
        f_gender = snapshot.child("gender").val();
f_age = snapshot.child("age").val();
if (f_gender == 'Male' && f_interested == 'Men') {sexuality = 'gay';}
if (f_gender == 'Male' && f_interested == 'Women') {sexuality = 'male';}
if (f_gender == 'Female' && f_interested == 'Women') {sexuality = 'lesbian';}
if (f_gender == 'Female' && f_interested == 'Men') {sexuality = 'female';}
       
   if (loadpref=== false){
 loadpref = true;
 establishNotif();

     }  
        
        matchesListener();
 
}



    else if (!userexists) {
    
    addUser();
    
    if (loadpref=== false){
    
    firebase.database().ref('users/' + f_uid).once("value",function(snapshot) {
    f_token = snapshot.child("token").val();
   console.log('got here');
    swipePopup(2);
    });
    
    
    //preferencesPopup();
    }
        
    loadpref = true;
    }

  });

}

function matchesListener(){



if (loaded === true){

  firebase.database().ref("matches/" + f_uid).off('value', matcheslistener);
 }


matcheslistener = firebase.database().ref("matches/" + f_uid).on("value",function(snapshot) {



f_to_date = [],f_to_duck = [],f_date_me = [],f_duck_me = [],f_date_match = [],f_duck_match = [],f_date_match_data = [],f_duck_match_data = [];
blocklist = [];


if (snapshot.val()){

var objs = snapshot.val();

$.each(objs, function(i, obj) {

if ((obj.first_number == f_uid) && (obj.firstnumberblock == 'Y' || obj.secondnumberblock == 'Y')) {blocklist.push(obj.second_number);}
if ((obj.second_number == f_uid) && (obj.firstnumberblock == 'Y' || obj.secondnumberblock == 'Y')) {blocklist.push(obj.first_number);}

if(obj.firstnumberdate){

//f_to_date

if ((obj.first_number == f_uid) && (obj.firstnumberdate == 'Y')) {f_to_date.push(obj.second_number);}



//f_date_me

if ((obj.first_number != f_uid) && (obj.firstnumberdate == 'Y')) {f_date_me.push(obj.first_number);}


}

if(obj.firstnumberduck){

//f_duck_me

if ((obj.first_number != f_uid) && (obj.firstnumberduck == 'Y')) {f_duck_me.push(obj.first_number);}    

//f_to_duck

if ((obj.first_number == f_uid) && (obj.firstnumberduck == 'Y')) {f_to_duck.push(obj.second_number);}   
    
}


if(obj.secondnumberdate){
//f_to_date

if ((obj.second_number == f_uid) && (obj.secondnumberdate == 'Y')) {f_to_date.push(obj.first_number);}

//f_date_me

if ((obj.second_number != f_uid) && (obj.secondnumberdate == 'Y')) {f_date_me.push(obj.second_number);}
}


if(obj.secondnumberduck){

//f_to_duck

if ((obj.second_number == f_uid) && (obj.secondnumberduck == 'Y')) {f_to_duck.push(obj.first_number);}
    
//f_duck_me

if ((obj.second_number != f_uid) && (obj.secondnumberduck == 'Y')) {f_duck_me.push(obj.second_number);}
}

if(obj.firstnumberdate && obj.secondnumberdate){
    
//f_date_match

if(((obj.first_number != f_uid) && (obj.firstnumberdate == 'Y')) && ((obj.second_number == f_uid) && (obj.secondnumberdate == 'Y'))){f_date_match.push(obj.first_number);f_date_match_data.push({uid:obj.first_number,name:obj.first_name});}

if(((obj.second_number != f_uid) && (obj.secondnumberdate == 'Y')) && ((obj.first_number == f_uid) && (obj.firstnumberdate == 'Y'))){f_date_match.push(obj.second_number);f_date_match_data.push({uid:obj.second_number,name:obj.second_name});}
 
}


if(obj.firstnumberduck && obj.secondnumberduck){
//f_duck_match

if(((obj.first_number != f_uid) && (obj.firstnumberduck == 'Y')) && ((obj.second_number == f_uid) && (obj.secondnumberduck == 'Y'))){f_duck_match.push(obj.first_number);f_duck_match_data.push({uid:obj.first_number,name:obj.first_name});}

if(((obj.second_number != f_uid) && (obj.secondnumberduck == 'Y')) && ((obj.first_number == f_uid) && (obj.firstnumberduck == 'Y'))){f_duck_match.push(obj.second_number);f_duck_match_data.push({uid:obj.second_number,name:obj.second_name});}
}
    


    
});    


           updatePhotos();

    
 loaded = true;   

}
    
  else{


              updatePhotos();

 loaded = true;   
      
  }
    
 
   

   
});

$( ".content-here" ).empty();            
$( ".results-loader" ).show();            
getWifilocation();
    


    
}

function addUser() {
  if (f_token){firebase.database().ref('users/' + f_uid).update({
    name: f_name,
    email: f_email,
    image_url : f_image,
    uid:f_uid,
    token:f_token,
    auth_id : f_auth_id
  });}
  else{
  firebase.database().ref('users/' + f_uid).update({
    name: f_name,
    email: f_email,
    image_url : f_image,
    uid:f_uid,
    auth_id : f_auth_id
  });
  }
  

  
  
}

function processUpdate(){

$( '.donechange' ).show();
$( '.doneunchange' ).hide();
 
    

}

function processDupdate(){
var unixnow = Math.round(+new Date()/1000);

   
var middaystamp = new Date();
middaystamp.setHours(12,00,00,000);
var middaystamp_timestamp = Math.round(middaystamp/1000);

var threestamp = new Date();
threestamp.setHours(12,00,00,000);
var threestamp_timestamp = Math.round(threestamp/1000);

var fivestamp = new Date();
fivestamp.setHours(17,00,00,000);
var fivestamp_timestamp = Math.round(fivestamp/1000);



    if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Morning') && (unixnow>middaystamp_timestamp)){myApp.alert('You must choose a time in the future', pickerCustomToolbar.cols[1].displayValue +' has past!');pickerCustomToolbar.cols[1].setValue('');return false;}
        if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Mid-day') && (unixnow>threestamp_timestamp)){myApp.alert('You must choose a time in the future', pickerCustomToolbar.cols[1].displayValue +' has past!');pickerCustomToolbar.cols[1].setValue('');return false;}
                if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Afternoon') && (unixnow>fivestamp_timestamp)){myApp.alert('You must choose a time in the future', pickerCustomToolbar.cols[1].displayValue +' has past!');pickerCustomToolbar.cols[1].setValue('');return false;}




if (d_chat_expire){

var datemessageq = $( '#datemessageq' ).val();

var interestnewarray = [];

$( ".interestbutton" ).each(function() {
  

if ($( this ).hasClass( "interestchosen" )) {
   
   var classList = $(this).attr("class").split(' ');
    var interestadd = classList[1].split('_')[0];
    interestnewarray.push(interestadd);
}
    
});

var comparedinterest;
var compareninterest;

if (d_interest != null) {
comparedinterest = d_interest.toString();
}
else {comparedinterest = '';}





if (typeof interestnewarray == 'undefined' && interestnewarray.length === 0){compareninterest = '';}else{compareninterest = interestnewarray.toString();}




if ((d_day == pickerCustomToolbar.cols[0].displayValue) && (d_time ==pickerCustomToolbar.cols[1].displayValue) && (datemessageq == '' ) && (compareninterest == comparedinterest))
{

if (d_response=='Y'){noChange();}
else if (d_response=="W"){reverseRequest();dateConfirmationPage();}

}
else{dateRequest();}


   

}

else {dateRequest();}

}
