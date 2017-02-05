
var myMessages, myMessagebar, message_history = false, message_historyon, datealertvar = false, datealert = false, latitudep, longitudep, incommondate, incommonduck,f_uid,f_name,f_first,f_gender,f_age,f_email,f_image,f_token, f_upper, f_lower, f_interested,sexuality;
var f_to_date,f_to_duck,f_date_me,f_duck_me;
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
var myApp;
var $$;
var view1, view2, view3, view4;

// Export selectors engine




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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        alert('Received Event: ' + id);
     //  myApp.init();
        
        // Initialize your app
myApp = new Framework7({init: false});
$$ = Dom7;

        // Add views
view1 = myApp.addView('#view-1');
view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
view3 = myApp.addView('#view-3');
view4 = myApp.addView('#view-4');
        myApp.init();

 var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>Popup created dynamically.</p>'+
                      '<p><a href="#" class="close-popup">Close me</a></p>'+
                    '</div>'+
                  '</div>'
  myApp.popup(popupHTML);


$$('.panel-left').on('panel:opened', function () {

leftPanel();

});

$$('.panel-left').on('panel:open', function () {
    
    $( ".upgradeli" ).slideDown();
   
   
    
});

function leftPanel(){



if(!myList){

myList = myApp.virtualList('.virtual-notifications', {
    // Array with plain HTML items
    items: [],
    height:70,
    renderItem: function (index, item) {
        
        if(item.from_uid == f_uid){
        
        
 
        
        return '<li class="item-content" onclick="'+item.func+'('+item.targetid+',\''+item.targetname+'\')">' +
                  '<div class="item-media"><img src="' + item.picture + '" style="height:29px;border-radius:5px;"></div>' +
                  '<div class="item-inner" style="margin-left:10px;" >' +
                     '<div class="item-title-row" >'+
                  '<div class="item-title" style="font-size:14px">'+item.targetname+'</div>'+
                  '<div class="item-after"></div>'+
                  '</div>'+
                '<div class="item-text">' + item.icon +  item.title + ' </div>' +

                  '</div>' +
               '</li>';
        }
        
        else{
        
//onclick="singleBrowser('+item.targetid+')"
        
         return '<li class="item-content" onclick="'+item.func+'('+item.targetid+',\''+item.targetname+'\')">' +
                  '<div class="item-media" ><img src="' + item.picture + '" style="height:29px;border-radius:5px;"></div>' +
                  '<div class="item-inner" style="margin-left:10px;" >' +
                     '<div class="item-title-row" >'+
'<div class="item-title" style="font-size:14px">'+item.targetname+'</div>'+
'<div class="item-after">'+item.colordot+'</div>'+
                  '</div>'+
                '<div class="item-text" style="color:black;">' + item.icon +  item.title + ' </div>' +

                  '</div>' +
               '</li>';
        
        }
               
               
    }
});
}

var notificationlist = firebase.database().ref('notifications/' + f_uid).once('value', function(snapshot) {

console.log(snapshot);

var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){



$.each(objs, function(i, obj) {
    
var typetype = obj.type.substring(0, 4);
    var correctimage;
    var correctname;
    var iconhtml;
    var colordot;
    var message_text;
    var func;





//need to see if a match still and then create function based on tha
    






    
   // onclick="singleBrowser('+targetid+')"
    
    if (obj.param=='message'){message_text = obj.message;  iconhtml = '<i class="pe-7s-mail" style="margin-right:5px;z-index:9999;"></i>'}
        if (obj.param=='image'){
            if (obj.from_uid == f_uid){message_text = obj.message + 'sent';}
            else {message_text = obj.message + 'received';}
            
            iconhtml = '<i class="pe-7s-camera" style="margin-right:5px;z-index:9999;"></i>';}
            
            if (obj.param=='daterequest'){
                
                if (obj.from_uid == f_uid){message_text = obj.message + ' sent';}
            else {message_text = obj.message + ' received';} 
                
                iconhtml = '<i class="pe-7s-date" style="margin-right:5px;z-index:9999;"></i>';
            }
            
             if (obj.param=='dateconfirmed'){
                
                message_text = obj.message;
                
                
                iconhtml = '<i class="pe-7f-date" style="margin-right:5px;z-index:9999;"></i>';
            }

    
    if(obj.received=='N'){colordot = '<span class="badge" style="background-color:#2196f3;margin-top:5px;">'+obj.new_message_count+'</span>';} else{colordot = '';}

 if (obj.from_uid == f_uid){correctimage = String(obj.to_uid);correctname = String(obj.to_name);colordot = '';}
    else {correctimage = String(obj.from_uid);correctname = String(obj.from_name);image_after = 'received';}
    



datemeinarray=0;
duckmeinarray=0;
datetoinarray=0;
ducktoinarray=0;






var datesto = f_to_date.indexOf(correctimage);
if (datesto > -1) {
datetoinarray=1;
}

var datesme = f_date_me.indexOf(correctimage);
if (datesme > -1) {
datemeinarray=1;
}


var duckto = f_to_duck.indexOf(correctimage);
if (duckto > -1) {
ducktoinarray=1;
}

var duckme = f_duck_me.indexOf(correctimage);
if (duckme > -1) {
duckmeinarray=1;
}


console.log(datemeinarray);
console.log(datetoinarray);



console.log(duckmeinarray);
console.log(ducktoinarray);


if ((datemeinarray==1 && datetoinarray==1) || (duckmeinarray==1 && ducktoinarray==1)) {
    
    if (typetype == 'date') {func = 'createDate1';}
     if (typetype == 'duck') {func = 'createDuck';}
    }
else{func = 'singleBrowser'}



    
    myList.prependItem({
    title: message_text,
    targetid:correctimage,
    targetname:correctname,
    picture:'http://graph.facebook.com/'+correctimage+'/picture?type=normal',
    from_name: obj.from_name,
    to_name: obj.to_name,
    from_uid: obj.from_uid,
    to_uid: obj.to_uid,
    icon:iconhtml,
    colordot:colordot,
    func:func
});
    
});


 
}

});
    
}

$$('.panel-left').on('panel:closed', function () {
    
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

$$('.panel-right').on('panel:closed', function () {
$(".timeline").empty();
    
    
});

$$('.panel-right').on('panel:open', function () {
    
    var rightdates = [];
    
    var month = [];
    month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
    
    var timelinedates = firebase.database().ref('/dates').once('value').then(function(snapshot) {
    
    var objs = snapshot.val();

if (snapshot.val() === null){
    
    $('.timeline').append('No dates scheduled.');
    
}

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {

rightdates.push(obj);

});
 
 
 
console.log(rightdates);
rightdates.sort(compare);
 
 console.log(rightdates);
 
 
 for (i = 0; i < rightdates.length; i++) { 

 var correctname;
 var correctid;
if (rightdates[i].created_uid == f_uid) {correctname = rightdates[i].received_name;correctid = rightdates[i].received_uid;}
if (rightdates[i].created_uid != f_uid) {correctname = rightdates[i].created_name;correctid = rightdates[i].created_uid;}

 var unix = Math.round(+new Date()/1000);



if ((rightdates[i].created_uid == f_uid || rightdates[i].received_uid == f_uid) && (rightdates[i].chat_expire > Number(unix)) ){

console.log(rightdates[i].chat_expire);
var d = new Date(rightdates[i].chat_expire*1000 - 3600);
var timehere;

if (rightdates[i].time) {timehere = ', ' + rightdates[i].time;}
else {timehere='';}

var datetype = rightdates[i].type.capitalize();
var datesidetitle;
var dayday = d.getDate();
var monthmonth = month[d.getMonth()];
var subtitletext,confirmtext;
if (rightdates[i].response =='Y') {
   
   
   
   if (rightdates[i].type=='date' ){datesidetitle = 'Date Details';}
   if (rightdates[i].type=='duck' ){datesidetitle = 'Duck Details';}
   
   var c = new Date(rightdates[i].time_accepted*1000);
    

var cday = weekday[c.getDay()];



var name_accepted;



if (rightdates[i].received_uid == f_uid) {name_accepted = 'you ';}
else {name_accepted = rightdates[i].received_name;}    


    subtitletext='<div style="font-family: \'Pacifico\', cursive;font-size:17px;background-color:#4cd964;-webkit-border-top-right-radius: 5px;-webkit-border-top-left-radius: 5px;color:white;width:100%;text-align:center;padding-top:5px;padding-bottom:5px;"><i class="pe-7s-check pe-2x" style="color:white"></i></br>'+datesidetitle+'</div>';
    confirmtext='Date confirmed by '+name_accepted+' on '+cday;
    
    }
if (rightdates[i].response =='W') {
    
    if (rightdates[i].created_uid == f_uid) {confirmtext = 'Waiting for '+rightdates[i].received_name+' to respond.';}
if (rightdates[i].created_uid != f_uid){confirmtext = rightdates[i].created_name + ' is waiting for your response.';}
    
     if (rightdates[i].type=='date' ){datesidetitle = 'Date Request';}
   if (rightdates[i].type=='duck' ){datesidetitle = 'Duck Request';}
    

    subtitletext='<div style="font-family: \'Pacifico\', cursive;font-size:17px;-webkit-border-top-right-radius: 5px;-webkit-border-top-left-radius: 5px;background-color:#ff9500;color:white;width:100%;text-align:center;padding-top:5px;padding-bottom:5px;"><i class="pe-7s-help1 pe-2x" style="color:white"></i></br>'+datesidetitle+'</div>';}

if ($(".time_line_" + dayday)[0]){
    
} else {
    
    $('.timeline').append('<div class="timeline-item">'+
    '<div class="timeline-item-date">'+dayday+' <small> '+monthmonth+' </small></div>'+
    '<div class="timeline-item-divider"></div>'+
    '<div class="timeline-item-content time_line_'+dayday+'">'+
    
    '</div>'+
  '</div>');
    
}


$('.time_line_'+dayday).append(
    
    '<a href="#" onclick="createDate(\''+correctid+'\',\''+correctname+'\')">'+
   
      
   subtitletext+
   '<div class="timeline-item-time" style="padding:2px;margin-top:0px;background-color:white;border-bottom:1px solid #c4c4c4;text-align:center;padding-top:10px;"><i class="pe-7s-clock pe-lg"></i> '+weekday[d.getDay()]+ timehere+'<div style="clear:both;" id="interestdatediv_'+correctid+'"></div></div>'+

    '<div class="timeline-item-inner" style="min-width:136px;padding:7px;margin-bottom:5px;-webkit-border-top-right-radius: 0px;-webkit-border-top-left-radius: 0px;">'+
   
          
                '<div class="timeline-item-title" style="color:black;margin-top:5px;text-align:center;"><div style="width:60px;height:60px;margin:0 auto;border-radius:50%;background-size:cover;background-position:50% 50%;background-image:url(\'http://graph.facebook.com/'+correctid+'/picture?type=normal\')"></div><span style="clear:both;">'+correctname+'<span></div>'+



   


      
      '<div style="padding:10px;font-size:13px;"><span style="color:#6d6d72;clear:both;padding-top:-5px;">'+confirmtext+'</span></div>'+
      
'</div>'+
'</a>'
      
    
    );



if(rightdates[i].type=='date'){
for (k = 0; k < rightdates[i].interest.length; k++) { 
    
  $( "#interestdatediv_" + correctid).append('<a href="#" style="margin-right:5px"><i class="twa twa-'+rightdates[i].interest[k]+'" style="margin-top:5px;margin-right:5px"></i></a>');  
    

    
}
}

}

}
 
}

        
    });
    

   
    
});

$$('.panel-left').on('panel:closed', function () {
    
    $( ".upgradeli" ).hide();
   
    
});

// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content-1');
 
// Add 'refresh' listener on it
ptrContent.on('ptr:refresh', function (e) {
    // Emulate 2s loading
    loaded = false;
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
        
        //firebaseauthchange
        $( document ).ready(function() {
        firebase.auth().onAuthStateChanged(function(user) {
  

  
  if (user) {
      
      
      
       
//       alert('yes user');// User is signed in.

       f_uid = user.providerData[0].uid;
        f_name = user.providerData[0].displayName;
         f_first = f_name.substr(0,f_name.indexOf(' '));
         f_email = user.providerData[0].email;
          f_image = user.providerData[0].photoURL;
                 alert('change in auth state' + f_name);
   alert(f_uid);
   
  // $( "#profilepic" ).empty();
  // $( "#profilepic" ).append('<div style="float:left;height:30px;width:30px;border-radius:5px;margin-right:5px;background-size:cover;background-position:50% 50%;background-image:url(\'http://graph.facebook.com/'+f_uid+'/picture?type=normal\');"></div>');




  var notifcount = firebase.database().ref('notifications/' +f_uid).on('value', function(snapshot) {

var notificationscount = 0;

var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {

if (obj.to_uid == f_uid) {
    
    if (obj.received =='N') {notificationscount = notificationscount + obj.new_message_count;}
    
    
    
}
    
});

$( ".notifspan" ).empty();
$( ".notifspan" ).append(notificationscount);

}


});

getPreferences();


    //console.log(user.emailVerified);
    
    
  //  if (user.emailVerified === false) {console.log('not verified');user.sendEmailVerification(); }
    
    
    
    
  } else {
      

      
      $( ".ploader" ).show();
      $( ".loginbutton" ).show();
      $( ".login-loader" ).hide();

    console.log('no user');
    // No user is signed in.
  }
});

    
       }); 
        
        
        
        
        
        
        
    

    

function startApp(){

    alert('starting');
    
    firebaseinit = localStorage.getItem('tokenStore');
    
    if (firebaseinit){
    alert(firebaseinit);
        
        
        

            
            
      var credential = firebase.auth.FacebookAuthProvider.credential(firebaseinit);
        alert('about to log ' + credential);
        
            firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          
               
        });
         
            
            

        
        
        
    }
    else {
     

    alert('no tokenStore');
    }
    
    
    
}


function createPassword(){

var email = 'jadman02@hotmail.com';
var password = '999999';

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  console.log(errorCode);
  
});
    
}

function loginFacebook(){

var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you a Facebook Access Token. You can use it to access theFacebook API.
   console.log(result);
   var token = result.credential.accessToken;
   f_token =  token;
// The signed-in user info.
  var user = result.user;
  console.log(user);
  

  

// Set the access token here


  
// ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(errorCode);
  console.log(errorMessage);
   console.log(email);

  });
    
    
}

function loginPassword(){

var email = 'jadman02@hotmail.com';
var password = '999999';

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

console.log(errorCode);

});
    
}

function logout(){

firebase.auth().signOut().then(function() {
   loaded = false; f_token = false;loadpref = false;console.log('Sign-out successful');fbLogoutUser();
}, function(error) {
  // An error happened.
});



}

function specificusercheck(){

var user = firebase.auth().currentUser;

if (user) {
  console.log('User is signed in');
} else {
  console.log('No user is signed in');

}
    
}


function fbLogoutUser() {
    FB.getLoginStatus(function(response) {
        console.log(response);
        console.log(response.status);
        if (response && response.status === 'connected') {
           FB.logout(function(response) {
               alert('logged out');
            });
        }
        else if (response.status === 'not_authorized'){
            FB.logout(function(response) {
               alert('logged out');
            });
            
        }
        
    });
}



    // onError Callback receives a PositionError object
    //
  

    


    
var onSuccess = function(position) {
    latitudep = position.coords.latitude;
longitudep = position.coords.longitude;

//alert(latitudep);
//alert(longitudep);

updateGeo();

    $( ".age-header" ).remove();
    $( ".swiper-container" ).remove();
   


getMatches();   
    };


  function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function getWifilocation(){
alert('get wifi location');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   

}






var all_matches_photos=[];


function getMatches(){
    
    //on success 
     
    
    
    for (var i = f_lower; i <= f_upper; i++) {
        
      //  alert('getting matches 2');
        
      match_number = 0;

        all_matches_photos[i] = [];
    $( ".content-here" ).append(
   
        
    '<span class="badge age-header header_'+i+'" style="display:none;text-align:left;float:left;width:100%;border-radius:0px;">'+i+'</span>'+
      '  <div class="swiper-container swiper-'+i+'" style="display:none;padding-top:10px;height:180px;clear:both;">'+
   
    '<div class="swiper-wrapper">'+
   // '<div class="swiper-slide"><div style="background-color:white;height:50%;width:50%;margin-top:50%;margin-left:25%;"></div></div>'+
    '</div>'+
'</div>'
        
        );
       // alert('getting matches 3.5');
    
    //alert(i);
    //alert('sexuality' + sexuality);

    myApp.swiper('.swiper-' + i, {
    slidesPerView:3,
    freeMode:true,
    preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
    watchSlidesVisibility:true,
   
    onClick:function(swiper, event) {

var ageswiper = swiper.clickedSlide.classList[0].replace("age_", "");

    photoBrowser(swiper.clickedIndex,ageswiper);}
    //pagination:'.swiper-pagination'
  });
    
    
   // alert(sexuality);
var findingRef = firebase.database().ref(sexuality+ '_'+ i);

var foundFire = new GeoFire(findingRef);
    var geoQuery = foundFire.query({
    center: [latitudep,longitudep],
    radius: 45000
  });
   
//alert('getting matches 3');
 
   
    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {

//alert(key);

var blocked = 0;
var subtract1 = key.substr(key.indexOf("*") + 1);
var subtract = subtract1.split('*')[0];
var matchname = subtract1.substr(subtract1.indexOf("*") + 1);
  var swipernumber = subtract - f_lower; 
  var curswiper = $$('.swiper-container')[swipernumber].swiper;
  var graphid = key.split('*')[0];


//need to remove extra id ere
  
  
if ($('.slide_' + graphid).length){
  
  alert('yass1 - pre delete');
  alert(all_matches_photos); 
  
   var classremove = $('.slide_' + graphid).attr("class").split(' ');
  
 var agej = classremove[0].replace("age_", "");
  
  for (var k = 0; i <= all_matches_photos[agej].length; k++) {
     

      
      if (all_matches_photos[agej][k].url == 'http://graph.facebook.com/'+graphid+'/picture?type=large'){console.log('try to delete from array');all_matches_photos[agej].splice(k, 1);}
      
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
  


  
  //Do not show the users profile to themselves
  if ((graphid != f_uid) && (blockedid < 0)){
      
     
      
      var index1 = incommondate.indexOf(graphid);
var index2 = incommonduck.indexOf(graphid);




if (index1 > -1) {
curswiper.prependSlide('<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;"><div class="distance_'+graphid+'" style="float:right;background-color:#2196f3;color:white;z-index:999;padding:5px;margin-right:5px;">'+distance.toFixed(1)+' km</div><div class="swiper-lazy-preloader"></div><img class="swiper-lazy pp photo_'+graphid+'" data-src="http://graph.facebook.com/'+graphid+'/picture?type=normal" style="-webkit-filter:none;height:100px;max-width:100px;overflow:hidden;margin-top:5px;"><p style="clear:both;font-weight:bold;">'+matchname+'</p></div>');    
}

else if (index2 > -1) {
curswiper.prependSlide('<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;"><div class="distance_'+graphid+'" style="float:right;background-color:#2196f3;color:white;z-index:999;padding:5px;margin-right:5px;">'+distance.toFixed(1)+' km</div><div class="swiper-lazy-preloader"></div><img class="swiper-lazy pp photo_'+graphid+'" data-src="http://graph.facebook.com/'+graphid+'/picture?type=normal" style="-webkit-filter:none;height:100px;max-width:100px;overflow:hidden;margin-top:5px;"><p style="clear:both;font-weight:bold;">'+matchname+'</p></div>');    
} 

else {curswiper.prependSlide('<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;"><div class="distance_'+graphid+'" style="float:right;background-color:#ccc;color:white;z-index:999;padding:5px;margin-right:5px;">'+distance.toFixed(1)+' km</div><div class="swiper-lazy-preloader"></div><img class="swiper-lazy pp photo_'+graphid+'" data-src="http://graph.facebook.com/'+graphid+'/picture?type=normal" style="-webkit-filter:grayscale(100%);height:100px;max-width:100px;overflow:hidden;margin-top:5px;"><p style="clear:both;font-weight:bold;">'+matchname+'</p></div>');}
      




  curswiper.updateSlidesSize();
  curswiper.slideTo(0);
  //all_matches_photos[subtract].push({url:'http://graph.facebook.com/'+graphid+'/picture?type=large',caption:'...'});
  all_matches_photos[subtract].unshift({url:'http://graph.facebook.com/'+graphid+'/picture?type=large',caption:'...'});


  
  
  
  
  
  
  
  

  }

//console.log(i + "<-" +key + " entered query at " + location + " (" + distance + " km from center)");

});

    
    
    
    }
    
    
   

     $( ".ploader" ).hide();
    myApp.closeModal();

deletePhotos();

}

function updateGeo(){




var matchesRef = firebase.database().ref(sexuality+ '_'+ f_age);
// Create a GeoFire index
var geoFire = new GeoFire(matchesRef);


geoFire.set(f_uid + '*' + f_age + '*' + f_first, [latitudep, longitudep]).then(function() {
  alert("Provided key has been added to GeoFire");
}, function(error) {
  alert("Error: " + error);
});

    
}



function getPreferences(){

// Test if user exists




userpref = firebase.database().ref("users/" + f_uid).on("value",function(snapshot) {
    var userexists = snapshot.child('lower').exists(); // true
    
    if (userexists) { 
        
        if (!snapshot.child("to_date").val()) {f_to_date = [];}
        else{f_to_date = snapshot.child("to_date").val();}
        
        if (!snapshot.child("blocklist").val()) {blocklist = [];}
        else{blocklist = snapshot.child("blocklist").val();}

        
        
        if (!snapshot.child("to_duck").val()) {f_to_duck = [];}
        else{f_to_duck = snapshot.child("to_duck").val();}
        
        if (!snapshot.child("date_me").val()) {f_date_me = [];}
        else{f_date_me = snapshot.child("date_me").val();}
        
        if (!snapshot.child("duck_me").val()) {f_duck_me=[];}
        else{f_duck_me = snapshot.child("duck_me").val();}
        
         incommondate = f_to_date.filter(function(n) {
    return f_date_me.indexOf(n) != -1;
});

incommonduck = f_to_duck.filter(function(n) {
    return f_duck_me.indexOf(n) != -1;
});


        f_lower = snapshot.child("lower").val(); 
        f_upper = snapshot.child("upper").val(); 
        f_interested = snapshot.child("interested").val(); 
        f_gender = snapshot.child("gender").val();
f_age = snapshot.child("age").val();
if (f_gender == 'Male' && f_interested == 'Men') {sexuality = 'gay';}
if (f_gender == 'Male' && f_interested == 'Women') {sexuality = 'male';}
if (f_gender == 'Female' && f_interested == 'Women') {sexuality = 'lesbian';}
if (f_gender == 'Female' && f_interested == 'Men') {sexuality = 'female';}
        
        
        if (loaded === false){alert('here2');getWifilocation();}
        else {
            
            updatePhotos();}
        //alert('1');
    
 loaded = true;   
}



    else if (!userexists) {addUser();
    
    if (loadpref=== false){preferencesPopup();}
        
    loadpref = true;
    }

  });

}

function addUser() {
  
  if (!f_token) {f_token = '';}
  
  firebase.database().ref('users/' + f_uid).set({
    name: f_name,
    email: f_email,
    image_url : f_image,
    uid:f_uid,
    token:f_token
  });
}
    
function allMatches(){
console.log(all_matches);



    
}

function preferencesclosed() {
    $( ".preferencesli" ).removeClass("disabled");
    
}


function newAm(){
    

 $( ".originalam" ).hide();
$( ".newam" ).show();
pickerDescribe.open();
}

function newMe(){


 $( ".originalme" ).hide();
$( ".newme" ).show();
pickerDescribe2.open();
    
}

function preferencesPopup(){







var popupHTML = '<div class="popup prefpop">'+

'<div class="navbar" style="background-color:#2196f3;">'+
 '   <div class="navbar-inner">'+
  '      <div class="left close-popup" onclick="preferencesclosed();"><a href="#"><i class="pe-7s-close pe-lg" style="color:white;"></i></a></div>'+
   '     <div class="center" style="color:white;">Profile</div>'+
    '    <div class="right"></div>'+
    '</div>'+
'</div>'+

'<div class="pages">'+
'<div data-page="prefpopup" class="page">'+
'<div class="page-content" style="background-color:white;padding-bottom:50px;">'+
     
     '<div style="text-align:center;padding:20px;">'+
'<img src="'+f_image+'" style="width:100px;border-radius:50%;">'+
'</div>'+
   
   '<div class="content-block-title">I am</div>'+

   
'<div class="list-block" >'+




' <ul>'+




'<li class="newam">'+
 '     <div class="item-content">'+
  '      <div class="item-inner">'+
   '       <div class="item-input">'+
    '        <input type="text" placeholder="..." readonly id="picker-describe">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+

  
  '</ul>'+
'</div>'+

'<div class="content-block-title">Interested in Meeting</div>'+

'<div class="list-block" >'+
' <ul>'+


'<li class="newme">'+
 '     <div class="item-content">'+
  '      <div class="item-inner">'+
   '       <div class="item-input">'+
    '        <input type="text" placeholder="..." readonly id="picker-describe2">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+
  '</ul>'+
'</div>'+

   '<div class="content-block-title">About Me</div>'+

'<div class="list-block" >'+
' <ul>'+
'<li class="align-top">'+
 '     <div class="item-content">'+
  '      <div class="item-inner">'+
          '  <div class="item-input">'+
 '   <textarea class="resizable" onkeyup="keyUp()" maxlength="140" id="userdescription" style="min-height:88px;" placeholder="Describe yourself and what you are looking for..."></textarea>'+
  '</div>'+
    '    </div>'+
     ' </div>'+
    '</li>'+
    '<p id="maxdescription" style="float:right;color:#ccc;font-size:14px;margin-top:5px;marin-right:5px;">0 / 140</p>'+
  

  
  '</ul>'+
'</div>'+
  '<a href="#" class="button button-big disabled savebutton" style="clear:both;margin-left:10px;margin-right:10px;margin-top:-10px;" onclick="updateUser();">Save</a>'+





'</div></div></div>'+
                  '</div>';



myApp.popup(popupHTML);
myApp.sizeNavbars();  

if (f_age) {$( ".savebutton" ).removeClass('disabled');}

if (f_age && f_gender) {$( "#picker-describe" ).val( f_gender + ", " + f_age );}



if (f_interested) {$( "#picker-describe2" ).val( f_interested + " aged between " + f_lower + ' - ' + f_upper );}



pickerDescribe = myApp.picker({
    input: '#picker-describe',
    rotateEffect: true,
onOpen:   function (p){

var gendercol = pickerDescribe.cols[0];
var agecol = pickerDescribe.cols[1];
if (f_age) {agecol.setValue(f_age);}
if (f_gender) {gendercol.setValue(f_gender);}





    
},


onChange:    function (p, value, displayValue){
        
        if (!f_age){
        var fpick = pickerDescribe.value;
        var spick = pickerDescribe2.value;
        
        if (fpick && spick) {$( ".savebutton" ).removeClass( "disabled" );}
        else {$( ".savebutton" ).addClass( "disabled" );}
        }
        
        
        
    },
formatValue: function (p, values, displayValues) {
        return displayValues[0] + ', ' + values[1];
    },    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    'About Me'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">That\'s me</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
        {
            textAlign: 'left',
            values: ('Male Female').split(' ')
        },
        {
            values: ('18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99').split(' ')
        },
    ]
});                

pickerDescribe2 = myApp.picker({
    input: '#picker-describe2',
    rotateEffect: true,
    onChange:    function (p, value, displayValue){
        
        if (!f_age){
        var fpick = pickerDescribe.value;
        var spick = pickerDescribe2.value;
        
        if (fpick && spick) {$( ".savebutton" ).removeClass( "disabled" );}
        else {$( ".savebutton" ).addClass( "disabled" );}
        }
        
        
        
    },
    onOpen:   function (p){

    var interestedcol = pickerDescribe2.cols[0];
var lowercol = pickerDescribe2.cols[1];
var uppercol = pickerDescribe2.cols[2];
if (f_interested) {interestedcol.setValue(f_interested);}
if (f_lower) {lowercol.setValue(f_lower);}
if (f_upper) {uppercol.setValue(f_upper);}

    
},


formatValue: function (p, values, displayValues) {
        
        if (values[1] > values[2]) {        return displayValues[0] + ' aged between ' + values[2] + ' - ' + values[1];}
        else {        return displayValues[0] + ' aged between ' + values[1] + ' - ' + values[2];
}
        
    },    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    'Interested in Meeting'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">That\'s right</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
        {
            textAlign: 'left',
            values: ('Men Women').split(' ')
        },
        {
            values: ('18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99').split(' ')
        },
        {
            values: ('18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99').split(' ')
        },
    ]
});           



//if (f_token) {
//$.ajax({
  //  url: "https://graph.facebook.com/" + f_uid,
  //  type: "get",
  //  data: { access_token: f_token},
    //success: function (response, textStatus, jqXHR) {
        // You can access the name of the user this way:
        // response.name
    //    console.log(response);
   //     var gendercol = pickerDescribe.cols[0];
   //     if (response.gender) {gendercol.setValue(response.gender.capitalize());}
        
  //  },
  //  error: function (jqXHR, textStatus, errorThrown) {
//    },
//    complete: function () {
//    }
//});
//}



}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function clickMe() {
pickerDescribe.open();


}

function keyUp(){
    
var inputlength = $( "#userdescription" ).val().length;    

        
$( "#maxdescription" ).empty();
$( "#maxdescription" ).append(inputlength + " / 140");



}



function updateUser(){

var newage,newinterested,newgender;

if (pickerDescribe.initialized === false) {newage = f_age;newgender = f_gender;}
else {newage = pickerDescribe.value[1];newgender = pickerDescribe.value[0];}

if (pickerDescribe2.initialized === false) {newinterested = f_interested;}
else {newinterested = pickerDescribe2.value[0];}

var userzdescription; 
if ($( "#userdescription" ).val()) {userzdescription = $( "#userdescription" ).val();}
else {userzdescription = '';}

//Need to delete old reference

if (f_age && (f_age != newage)){
firebase.database().ref(sexuality + '_' + f_age + '/' + f_uid+'*'+f_age + '*' + f_name.substr(0,f_name.indexOf(' '))).remove();
}

if (f_gender && (f_gender != newgender)){
firebase.database().ref(sexuality + '_' + f_age + '/' + f_uid+'*'+f_age + '*' + f_name.substr(0,f_name.indexOf(' '))).remove();
}

if (f_interested && (f_interested != newinterested)){
firebase.database().ref(sexuality + '_' + f_age + '/' + f_uid+'*'+f_age + '*' + f_name.substr(0,f_name.indexOf(' '))).remove();
}

if (pickerDescribe.initialized === true) {f_age = pickerDescribe.value[1];f_gender = pickerDescribe.value[0];}

if (pickerDescribe2.initialized === true) {f_interested = pickerDescribe2.value[0];}


        


if (f_gender == 'Male' && f_interested == 'Men') {sexuality = 'gay';}
if (f_gender == 'Male' && f_interested == 'Women') {sexuality = 'male';}
if (f_gender == 'Female' && f_interested == 'Women') {sexuality = 'lesbian';}
if (f_gender == 'Female' && f_interested == 'Men') {sexuality = 'female';}

var lowerage,upperage;



if (pickerDescribe2.initialized === true) {

if (pickerDescribe2.value[1] > pickerDescribe2.value[2]) {lowerage = pickerDescribe2.value[2];upperage = pickerDescribe2.value[1];}
else {lowerage = pickerDescribe2.value[1];upperage = pickerDescribe2.value[2];}

}

else {lowerage = f_lower;upperage = f_upper;}


firebase.database().ref('users/' + f_uid).update({
    gender: newgender,
    age: newage,
    interested: newinterested,
    lower: lowerage,
    upper: upperage,
    description:userzdescription
  });

f_lower = lowerage;
f_upper = upperage;


if (loadpref2===true){getWifilocation();}

loadpref2 = true;
}



function addFakey(){
userFake();    
uploadFake();    
}


function userFake(){

firebase.database().ref('users/' + 8000).set({
    gender: 'Male',
    name: 'Steve Ko',
    age: '29',
    interested: 'Men',
    lower: 18,
    upper: 27,
    email:'fakeemail@gmail.com',
    image_url:'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/15697524_10103359992998891_8428720226669333494_n.jpg?oh=c634ecc1c6309da855004df51ffbbd60&oe=58EC88C5',
    uid:'8000',
    token:'XX'
  });


}

function uploadFake(){
    
var matchesRef = firebase.database().ref('gay_29');
// Create a GeoFire index
var geoFire = new GeoFire(matchesRef);


geoFire.set('8000*29*Steve', [-37.887000, 145.006000]).then(function() {
  console.log("Provided key has been added to GeoFire");
}, function(error) {
  console.log("Error: " + error);
});

}

var targetid;
var targetname;
var targetdatearray,targetduckarray;
var targetdate,targetduck;
var match;
var targetdatelikes, targetducklikes;

function photoBrowser(openprofile,arraynumber){

//firebase.database().ref("users/" + f_uid).off('value', userpref);

console.log(myApp);
    console.log(myPhotoBrowser);
myPhotoBrowser = myApp.photoBrowser({
    zoom: 400,
    lazyLoading:true,
    lazyLoadingInPrevNext:true,
    //exposition:false,
    photos: all_matches_photos[arraynumber],
    
    toolbarTemplate:'<div class="toolbar tabbar" style="height:100px;">'+
  
   
   
   ' <div class="toolbar-inner date-template" style="display:none">'+
   '<a href="#" onclick="createDate1()" class="button link active" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Date</a>'+
      '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;"><i class="pe-7s-close pe-2x"></i></a></div>'+
  
  ' <div class="toolbar-inner duck-template" style="display:none">'+
          '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;"><i class="pe-7s-close pe-2x"></i></a>'+
    '<a href="#" onclick="createDuck()" class="button link active" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Duck</a></div>'+
 
   
   ' <div class="toolbar-inner toolbardecide">'+
'<a href="#" onclick="dateUser();" class="datebutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Date</a>'+
       ' <a href="#" class="link orlink">'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;">or</p>'+
           
       ' </a>'+
       '<a href="#" class="link loaderlink"><span class="preloader preloader-white login-loader"></span></a>'+
'<a href="#" onclick="duckUser();" class="duckbutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Duck</a>'+
       
   ' </div>'+
'</div>',
   onClose:function(photobrowser){hideProfile();
   //getPreferences();
   
   },
   swipeToClose:false,
  // onClick:function(swiper, event){showProfile();},
   
   onSlideChangeStart:function(swiper){


$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;
         var target = all_matches_photos[arraynumber][myPhotoBrowser.activeIndex].url;
        var pretarget = target.replace("http://graph.facebook.com/", ""); 
        targetid = String(pretarget.replace("/picture?type=large", ""));

return firebase.database().ref('/users/' + targetid).once('value').then(function(snapshot) {

if (!snapshot.val().date_me) {targetdatearray = [];}
        else{targetdatearray = snapshot.val().date_me;}

if (!snapshot.val().blocklist) {target_blocklist = [];}
        else{target_blocklist = snapshot.val().blocklist;}



if (!snapshot.val().duck_me) {targetduckarray = [];}
        else{targetdatearray = snapshot.val().duck_me;}

if (!snapshot.val().to_date) {targetdate = [];}
        else{targetdate = snapshot.val().to_date;}

if (!snapshot.val().to_duck) {targetduck = [];}
        else{targetduck = snapshot.val().to_duck;}

console.log('targetdate' + targetdate);

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
$( ".loaderlink" ).hide();
$( ".orlink" ).show();
$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );
var username = snapshot.val().name;
targetname =  username.substr(0,username.indexOf(' '));
$( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+username.substr(0,username.indexOf(' '))+'</span>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(snapshot.val().description);

var datesme = targetdate.indexOf(f_uid);
targetdatelikes=0;
targetducklikes=0;
if (datesme > -1) {
$( ".datebutton" ).addClass( "likesme" );
targetdatelikes = 1;
}
else {$( ".datebutton" ).removeClass( "likesme" );}

var duckme = targetduck.indexOf(f_uid);
if (duckme > -1) {
$( ".duckbutton" ).addClass( "likesme" );
targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "likesme" );}




var f_targetdatelikes=0;
var f_targetducklikes=0;





/*


if (f_to_date[0].substring) {
// do string thing
} else{

f_to_date = f_to_date.map(String);
f_to_duck = f_to_duck.map(String);
// do other thing
}

*/




var indexs = f_to_date.indexOf(targetid);
console.log(indexs);
if (indexs > -1) {
    
$( ".datebutton" ).addClass( "active" );
f_targetdatelikes = 1;
}
else{$( ".datebutton" ).removeClass( "active" );}

var index1 = f_to_duck.indexOf(targetid);
if (index1 > -1) {
    $( ".duckbutton" ).addClass( "active" );
    f_targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "active" );}

if (f_targetducklikes ==1 && targetducklikes ==1) {
    if ((f_targetducklikes ==1 && targetducklikes ==1) || (f_targetdatelikes ==1 && targetdatelikes ==1)){
    
    $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


   

}
    

}

console.log(f_to_date);
console.log(targetid);
//console.log(f_to_duck);
console.log(f_targetdatelikes);
console.log(targetdatelikes);

if (f_targetdatelikes ==1 && targetdatelikes ==1){
    
$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


}

});

    },    
    backLinkText: '',
    
    
    
    navbarTemplate: '<div class="navbar photobrowserbar">'+
   
     

   
   ' <div class="navbar-inner">'+
      '  <div class="left sliding">'+
          '  <a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
            '    <i class="icon icon-back {{iconsColorClass}}"></i> '+
            
            '<span class="badge agecat">'+arraynumber+'</span>'+
            

           ' </a>'+
       ' </div>'+
       ' <div class="center sliding nametag">'+
        //  '  <span class="photo-browser-current"></span> '+
        //  '  <span class="photo-browser-of">{{ofText}}</span> '+
        //  '  <span class="photo-browser-total"></span>'+
       ' </div>'+
       ' <div class="right" onclick="more()">' +
       '<a href="#" class="link">'+
        
        '    <i class="pe-7s-more pe-lg"></i>'+
     
       ' </a>'+
       '</div>'+
    '</div>'+
'</div>  '
});   



myPhotoBrowser.open();
var windowwidth = $( ".photo-browser-swiper-container" ).width();
//console.log(windowwidth);
 $( ".photo-browser-slide img" ).css( "width", windowwidth + "px" );
 $( ".photo-browser-slide img" ).css( "-webkit-filter","grayscale(100%)" );
 $( ".photo-browser-caption" ).css( "margin-top", "-10px" );




myPhotoBrowser.swiper.slideTo(openprofile,0);

if (openprofile ===0){


$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;
         var target = all_matches_photos[arraynumber][0].url;
        var pretarget = target.replace("http://graph.facebook.com/", ""); 
        targetid = pretarget.replace("/picture?type=large", "");

return firebase.database().ref('/users/' + targetid).once('value').then(function(snapshot) {

if (!snapshot.val().date_me) {targetdatearray = [];}
        else{targetdatearray = snapshot.val().date_me;}

if (!snapshot.val().blocklist) {target_blocklist = [];}
        else{target_blocklist = snapshot.val().blocklist;}



if (!snapshot.val().duck_me) {targetduckarray = [];}
        else{targetdatearray = snapshot.val().duck_me;}

if (!snapshot.val().to_date) {targetdate = [];}
        else{targetdate = snapshot.val().to_date;}

if (!snapshot.val().to_duck) {targetduck = [];}
        else{targetduck = snapshot.val().to_duck;}


$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
$( ".loaderlink" ).hide();
$( ".orlink" ).show();
$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );
var username = snapshot.val().name;
targetname =  username.substr(0,username.indexOf(' '));
$( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+username.substr(0,username.indexOf(' '))+'</span>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(snapshot.val().description);

var datesme = targetdate.indexOf(f_uid);
targetdatelikes=0;
targetducklikes=0;
if (datesme > -1) {
$( ".datebutton" ).addClass( "likesme" );
targetdatelikes = 1;
}
else {$( ".datebutton" ).removeClass( "likesme" );}

var duckme = targetduck.indexOf(f_uid);
if (duckme > -1) {
$( ".duckbutton" ).addClass( "likesme" );
targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "likesme" );}


/*

if (f_to_date[0].substring) {
// do string thing
} else{

f_to_date = f_to_date.map(String);
f_to_duck = f_to_duck.map(String);
// do other thing
}

*/

var f_targetdatelikes=0;
var f_targetducklikes=0;
var index = f_to_date.indexOf(targetid);
if (index > -1) {
$( ".datebutton" ).addClass( "active" );
f_targetdatelikes = 1;
}
else{$( ".datebutton" ).removeClass( "active" );}

var index1 = f_to_duck.indexOf(targetid);
if (index1 > -1) {
    $( ".duckbutton" ).addClass( "active" );
    f_targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "active" );}

if (f_targetducklikes ==1 && targetducklikes ==1) {
    if ((f_targetducklikes ==1 && targetducklikes ==1) || (f_targetdatelikes ==1 && targetdatelikes ==1)){
    
    $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


   

}
    

}

console.log(f_to_date);
console.log(targetid);
console.log(f_to_duck);
console.log(f_targetdatelikes);
console.log(targetdatelikes);

if (f_targetdatelikes ==1 && targetdatelikes ==1){
    
$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


}

});
    
    
    
}

}

function showProfile(){
$( ".profile-info" ).show();    


}

function hideProfile(){
$( ".profile-info" ).hide();    
    
}

function infoPopup(){

var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>Popup created dynamically.</p>'+
                      '<p><a href="#" class="close-popup">Close me</a></p>'+
                    '</div>'+
                  '</div>';
  myApp.popup(popupHTML);
    
}

function dateUser(){

$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );

if ($( ".duckbutton" ).hasClass( "active" )){unmatchNotif();}



if (
    
$( ".datebutton" ).hasClass( "active" )){$( ".datebutton" ).removeClass( "active" );
$( ".notifback" ).show();
$( ".mainback" ).hide();


removetoDate();



}
else{

//clicked date
$( ".datebutton" ).addClass( "active" );$( ".duckbutton" ).removeClass( "active" );
addtoDate();
}

}

function addtoDate(){

if (targetdatelikes == 1) {$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();
$( ".notifback" ).hide();
$( ".mainback" ).show();

}
else{$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();

}

var new_to_date = f_to_date.push(targetid);

var index = f_to_duck.indexOf(targetid);
if (index > -1) {
    f_to_duck.splice(index, 1);
}

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   to_date:f_to_date,
   to_duck: f_to_duck
  });

if(targetdatearray instanceof Array){

var index3 = targetdatearray.indexOf(f_uid);
if (index3 == -1) {
    targetdatearray.push(f_uid);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   date_me:targetdatearray
  });
}
}

else {
 targetdatearray = [];
     targetdatearray.push(f_uid);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   date_me:targetdatearray
  });
    
}

if(targetduckarray instanceof Array){

var index4 = targetduckarray.indexOf(f_uid);
if (index4 > -1) {
    targetduckarray.splice(index4, 1);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   duck_me:targetduckarray
  });
}
    
}
else{}


}

function removetoDate(){

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();


var index = f_to_date.indexOf(targetid);
if (index > -1) {
    f_to_date.splice(index, 1);
}

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   to_date:f_to_date
  });

//remove from date me of targetid

var index3 = targetdatearray.indexOf(f_uid);
if (index3 > -1) {
    targetdatearray.splice(index3, 1);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   date_me:targetdatearray
  });
}

unmatchNotif();

}

function duckUser(){
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
if ($( ".datebutton" ).hasClass( "active" )){unmatchNotif();}
if (
    
$( ".duckbutton" ).hasClass( "active" )){$( ".duckbutton" ).removeClass( "active" );
console.log(targetduckarray);
$( ".notifback" ).show();
$( ".mainback" ).hide();
removetoDuck();
}
else{

//clicked duck
$( ".duckbutton" ).addClass( "active" );$( ".datebutton" ).removeClass( "active" );
addtoDuck();

}
}

function removetoDuck(){

unmatchNotif();

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();


var index = f_to_duck.indexOf(targetid);
if (index > -1) {
    f_to_duck.splice(index, 1);
}

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   to_duck:f_to_duck
  });



if(targetduckarray instanceof Array){
var index3 = targetduckarray.indexOf(f_uid);
if (index3 > -1) {
    targetduckarray.splice(index3, 1);
firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   duck_me:targetduckarray
  });

}
}
else {

console.log('for some reason does not have');
    
}

}

function markMe(){

var mearray = ["4"];

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   date_me:mearray
  });
    
}
function addtoDuck(){

if (targetducklikes == 1) {$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();
$( ".notifback" ).hide();
$( ".mainback" ).show();
}
else{$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();

}

f_to_duck.push(targetid);

var index = f_to_date.indexOf(targetid);
if (index > -1) {
    f_to_date.splice(index, 1);
}

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   to_date:f_to_date,
   to_duck: f_to_duck
  });

if(targetduckarray instanceof Array){

 var index3 = targetduckarray.indexOf(f_uid);

if (index3 == -1) {
    targetduckarray.push(f_uid);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   duck_me:targetduckarray
  });
}
}

else {
 targetduckarray = [];
     targetduckarray.push(f_uid);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   duck_me:targetduckarray
  });
    
}

if(targetdatearray instanceof Array){

var index4 = targetdatearray.indexOf(f_uid);
if (index4 > -1) {
    targetdatearray.splice(index4, 1);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   date_me:targetdatearray
  });
} 
}
else{}



}

function more(){

var buttons = [
        {
            text: 'Block',
            onClick: function () {
              
              var blockindex = myPhotoBrowser.swiper.activeIndex;
              var swipertarget = $( ".agecat" ).text();
              
              

              

              
              myPhotoBrowser.swiper.removeSlide(blockindex);
            myPhotoBrowser.swiper.updateSlidesSize() ;
             // myPhotoBrowser.swiper.slideTo(blockindex);
              
  console.log(all_matches_photos[swipertarget]);
              
              all_matches_photos[swipertarget] = all_matches_photos[swipertarget].slice(0,blockindex).concat(all_matches_photos[swipertarget].slice(blockindex+1));

              console.log(all_matches_photos[swipertarget]);

              
          
              
var index3 = blocklist.indexOf(targetid);
if (index3 == -1) {
    blocklist.push(targetid);

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   blocklist:blocklist
  });
  
}
  
  var index4 = target_blocklist.indexOf(f_uid);
if (index4 == -1) {
    target_blocklist.push(f_uid);

firebase.database().ref('users/' + targetid).update({
   //add this user to my list
   blocklist:target_blocklist
  });
  
}
             
             myApp.closeModal('.actions-modal');
             myPhotoBrowser.swiper.slideNext();
             myPhotoBrowser.swiper.slidePrev();

            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
    
}

function showDecide(){

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
    
} 

function createDate(messageid,messagename){
var centerdiv;
if (messageid) {targetid = String(messageid);}
if (messagename) {targetname = messagename;}



if (messageid) {centerdiv = '<div class="center center-date" onclick="singleBrowser('+targetid+')" style="cursor:pointer;">'+targetname+'</div>';}
else{centerdiv = '<div class="center center-date close-popup" onclick="clearchatHistory();">'+targetname+'</div>';}



var popupHTML = '<div class="popup chatpop">'+



'<div class="navbar">'+
 '   <div class="navbar-inner">'+
  '      <div class="left">'+
  

  
  '<a href="#" class="link icon-only close-popup date-back" onclick="clearchatHistory();">    <i class="icon icon-back "></i>    </a>'+
      '<a href="#" class="link icon-only date-close" onclick="reverseRequest();" style="font-weight:bold;display:none;margin-left:-5px;">  <i class="pe-7s-close pe-2x"></i>  </a>'+
      '<a href="#" class="link icon-only date2-close" onclick="noChange();" style="display:none;font-weight:bold;margin-left:-5px;">  <i class="pe-7s-close pe-2x"></i>  </a>'+
      '<a href="#" class="link icon-only date1-close" onclick="reverseRequest();dateConfirmationPage();" style="display:none;font-weight:bold;margin-left:-5px;">  <i class="pe-7s-close pe-2x"></i>  </a>'+

 


  '</div>'+

   '     <span id="centerholder"></span>'+
    '    <div class="right"><a href="#" class="link icon-only date-button" onclick="noMessages();setDate();request();" style="display:none;"><i class="pe-7s-date pe-lg"></i></a></div>'+    '</div>'+
    
'</div>'+



'<div class="pages" style="margin-top:-44px;">'+
'<div data-page="datepopup" class="page">'+
'<div class="toolbar messagebar datetoolbar" style="display:none;background-color:transparent;">'+


' <div class="toolbar-inner yes-inner" style="display:none;text-align:center;padding-left:0px;padding-right:0px;">'+
                                              '<a href="#" onclick="request()" class="link" style="color:white;background-color:#2196f3;width:50%;"><span style="margin: 0 auto;">Change</span></a>'+

                       '<a href="#" onclick="acceptDate()" class="link" style="color:white;background-color:#4cd964;width:50%;"><span style="margin: 0 auto;">Confirm</span></a>'+
                       
  '</div>'+
  

  
 ' <div class="toolbar-inner sender-inner" style="padding-left:0px;padding-right:0px;display:none;text-align:center;">'+
                       '<a href="#" onclick="cancelDate()" class="link" style="color:white;background-color:#ff3b30;width:50%;"><span style="margin: 0 auto;">Delete</span></a>'+
                       '<a href="#" onclick="request()" class="link" style="color:white;background-color:#2196f3;width:50%;"><span style="margin: 0 auto;">Change</span></a>'+
  '</div>'+


 ' <div class="toolbar-inner date-inner" style="padding-left:0px;padding-right:0px;display:none;text-align:center;">'+
  '<div style="width: calc(100% - 70px); height:44px;background-color:#2196f3;padding-left:5px;padding-right:5px;" class="link"><textarea id="datemessageq" placeholder="Message (optional)" style="color:white;background-color:#2196f3;margin-top:5px;"></textarea></div>'+
  '<a href="#" class="link" style="height:44px;color:white;background-color:#2196f3;width:70px;" onclick="dateRequest();"><span style="margin: 0 auto;">Send</span></a>'+
  '</div>'+

 ' <div class="toolbar-inner message-inner" style="display:none;background-color:#2196f3;padding-left:0px;padding-right:0px;">'+
  '<a href="#" class="link icon-only" style="margin-left:-5px;"><i class="pe-7s-camera pe-lg" style="color:white;"></i></a> <input type="file" size="70" capture="camera" accept="image/*" class="dealPictureField imagenotchosen" id="takePictureField_" onchange="getPicture();" style="background-color:transparent;color:transparent;float:left;cursor: pointer;height:44px;width:40px;z-index:1;opacity:0;background-color:red;margin-top:-22px;margin-left:-40px;"><textarea id="messagearea" placeholder="Message" style="color:white;background-color:#2196f3;margin-left:5px;"></textarea><a href="#" class="link" style="color:white;margin-right:5px;" onclick="sendMessage();">Send</a>'+
  '</div>'+
'</div>'+  
  '<div class="page-content messages-content" id="messagediv">'+
                '<span class="preloader login-loader messages-loader" style="width:42px;height:42px;position:absolute;top:50%;margin-top:-21px;left:50%;margin-left:-21px;"></span>'+
    '<div class="datearea" style="text-align:center;"></div>'+
    '<div class="messages"  style="padding-top:44px;">'+








'</div></div></div>'+

'</div></div>';
myApp.popup(popupHTML);

//existingDate();
//setDate();
$( "#centerholder" ).append(centerdiv);
myApp.sizeNavbars();
//$( "#centerholder" ).remove();


if (datealertvar === false) {
datealertvar = true;
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

datealert = firebase.database().ref("dates/" + first_number+ '*'+second_number).on('value', function(snapshot) {



console.log(snapshot.val());

var dateexists = snapshot.child('chat_expire').exists(); // true
    
    if (dateexists) {
    console.log('not expired');
 var unix = Math.round(+new Date()/1000);
  if (Number(snapshot.child('chat_expire').val()) > Number(unix) ) {
      
      d_type = snapshot.child('type').val();
      d_chat_expire = snapshot.child('chat_expire').val();
       d_interest = snapshot.child('interest').val();
      d_day = snapshot.child('day').val();
      d_time = snapshot.child('time').val();
      d_response = snapshot.child('response').val();
      d_created_uid = snapshot.child('created_uid').val();
      d_timestamp = snapshot.child('timestamp').val();
      d_message = snapshot.child('message').val();
      

      
      if (d_response == 'Y') {chatShow();}
      else {
          
          noMessages();
          setDate();
          
    
          
        dateConfirmationPage();
          
       
          
      }
      
      
     
      $( ".messages-loader" ).hide();
      }
 else{
     console.log('date has expired');
     
     cancelDate();
     
         
      //  $( ".center-date" ).empty();
//$( ".center-date" ).append(targetname);
myApp.sizeNavbars();   
     $( ".messages-loader" ).hide();
     
 }
 
    }
    else{ 
         d_interest = false;
         d_chat_expire = false;
      d_day = false;
      d_time = false;
         d_response = false;
         d_message = false;
     console.log('no date has been created');
     
     
     if (keepopen === 0){myApp.closeModal('.chatpop');clearchatHistory();}
     
     noMessages();
setDate();
     //   $( ".center-date" ).empty();
//$( ".center-date" ).append(targetname);
myApp.sizeNavbars();   
$( ".messages-loader" ).hide();
//need to check if still matched


        }




//alert('triggered');

 // if (snapshot.val().response == 'W') {noMessages();
 //         setDate();dateConfirmationPage();}
 // else {chatShow();}
  

  
 //dateConfirmationPage();
  
  keepopen = 0;
  
});


}
else {console.log('datealert set');}



}

function scrollBottom(){

var objDiv = document.getElementById("messagediv");
objDiv.scrollTop = objDiv.scrollHeight;

//$("").animate({ scrollTop: $('#messagediv').prop("scrollHeight")}, 300);

}


function noMessages(){
$( ".messages" ).hide();
$( ".datearea" ).empty();
$( ".datearea" ).append(
'<div class="nomessages" style="padding-left:20px;padding-right:20px;margin:0 auto;margin-top:54px;text-align:center;">'+



'<div class="profileroundpic" style="margin:0 auto;margin-top:5px;height:70px;width:70px;border-radius:50%;background-image:url(\'http://graph.facebook.com/'+targetid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+
        '<div class="dateheader" style="display:none;background-color:#2196f3;padding:5px;text-align:center;font-size:20px;color:white;margin-top:20px;font-family: \'Pacifico\', cursive;"></div>'+


'<div class="waitingreply"></div>'+

'<a href="#" onclick="request()" class="button dr requestbutton" style="width:150px;margin: 0 auto;margin-top:10px;font-family: \'Pacifico\', cursive;font-size:20px;"></a>'+




'<div id="createdatepicker" style="clear:both;border-bottom:1px solid #c4c4c4;margin-top:10px;"></div>'+



'<div class="row date-row" style="display:none;clear:both;margin-top:5px;">'+

'   <div class="col-16.67 coffee_i interestbutton" onclick="interests(\'coffee\');" style="cursor:pointer;"><i class="twa twa-2x twa-coffee" style="margin-top:5px;"></i></div>'+
      '  <div class="col-16.67 beers_i interestbutton" onclick="interests(\'beers\');" style="cursor:pointer;"><i class="twa twa-2x twa-beers" style="margin-top:5px;"></i></div>'+
       ' <div class="col-16.67 wine-glass_i interestbutton" onclick="interests(\'wine-glass\');" style="cursor:pointer;"><i class="twa twa-2x twa-wine-glass" style="margin-top:5px;"></i></div>'+
      ' <div class="col-16.67 movie-camera_i interestbutton" onclick="interests(\'movie-camera\');" style="cursor:pointer;"><i class="twa twa-2x twa-movie-camera" style="margin-top:5px;"></i></div>'+
      ' <div class="col-16.67 tada_i interestbutton" onclick="interests(\'tada\');" style="cursor:pointer;"><i class="twa twa-2x twa-tada" style="margin-top:5px;"></i></div>'+
       ' <div class="col-16.67 fork-and-knife_i interestbutton" onclick="interests(\'fork-and-knife\');" style="cursor:pointer;"><i class="twa twa-2x twa-fork-and-knife" style="margin-top:5px;"></i></div>'+

'</div>  '+

'<div class="row duck-row" style="display:none;clear:both;margin-top:10px;">'+


        '<div class="buttons-row" style="width:100%;">'+
           ' <a href="#tab1" class="button button-big button-place button-my" onclick="duckClass(1);">My Place</a>'+
            '<a href="#tab2" class="button button-big button-place button-your" onclick="duckClass(2);">Your Place</a>'+
        '</div>'+


'</div>  '+


'<p class="dr infop" style="clear:both;">You can begin chatting once you both agree on a time to meet.</p>'+




'</div>');


if (d_type == 'date') {$( ".requestbutton" ).text('Request Date');$( ".dateheader" ).text('Let\'s Date');}
if (d_type == 'duck') {$( ".requestbutton" ).text('Request Duck');$( ".dateheader" ).text('Let\'s Duck');}
}


function setDate(){

var d = new Date();
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

var alldays_values = [];
var alldays_names = [];
var tonight = new Date();
tonight.setHours(23,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);
alldays_values.push(tonight_timestamp);
alldays_values.push(tonight_timestamp);

alldays_names.push('Now');
alldays_names.push('Today');

var tomorrow_timestamp = tonight_timestamp + 86400;
alldays_values.push(tomorrow_timestamp);
alldays_names.push('Tomorrow');

for (i = 1; i < 6; i++) { 
var newunix = tomorrow_timestamp + (86400 * i);
alldays_values.push(newunix);
var dat_number = i + 1;
var datz = new Date(Date.now() + dat_number * 24*60*60*1000);

n = weekday[datz.getDay()];
alldays_names.push(n);
}

pickerCustomToolbar = myApp.picker({
    container: '#createdatepicker',
    rotateEffect: true,
    inputReadOnly: true,
    toolbar:false,
    cols: [
        {
            displayValues: alldays_names,
              values: alldays_values,
        },
        {
            textAlign: 'left',
            values: (' Morning Afternoon Mid-day Evening').split(' ')
        },
    ]
});          

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


var ref = firebase.database().ref("dates/" + first_number+ '*'+second_number);
ref.once("value")
  .then(function(snapshot) {
  var dateexists = snapshot.child('chat_expire').exists(); // true



if (dateexists){
var timecol = pickerCustomToolbar.cols[1];
timecol.setValue(snapshot.child('time').val());
var daycol = pickerCustomToolbar.cols[0];
daycol.setValue(snapshot.child('chat_expire').val());
}

if (d_interest && d_type =='date') {

for (i = 0; i < d_interest.length; i++) { 
    
  $( "." + d_interest[i] +"_i" ).addClass('interestchosen');  
    
}
    
    
}

if (d_interest && d_type =='duck') {
    
if (d_interest == 'my' && d_created_uid == f_uid){ $( ".button-my" ).addClass("active");}
if (d_interest == 'my' && d_created_uid != f_uid){{ $( ".button-your" ).addClass("active");}}
if (d_interest == 'your' && d_created_uid == f_uid){{ $( ".button-your" ).addClass("active");}}
if (d_interest == 'your' && d_created_uid != f_uid){{ $( ".button-my" ).addClass("active");}}


}

});          




$( "#createdatepicker" ).hide();
        
    
}

function request(){

$( ".profileroundpic" ).hide();
$( ".dateheader" ).show();
 $( ".sender-inner" ).hide();
        $( ".yes-inner" ).hide();

conversation_started = false;

if (d_response == 'Y') {
    
    $( ".date-close" ).hide();
  $( ".date2-close" ).show();
  $( ".date1-close" ).hide();

}

  

if (d_response == 'W') {
 $( ".date-close" ).hide();
  $( ".date1-close" ).show();
  $( ".date2-close" ).hide(); 

}

if(!d_response){
    $( ".date-close" ).show();
  $( ".date2-close" ).hide(); 
    $( ".date1-close" ).hide();
}

$( ".messages" ).hide();
     $( ".date-button" ).hide();
 
    $( "#createdatepicker" ).show();
    $( ".dr" ).hide();
       $( ".date-back" ).hide();
       
       if (d_type == 'date') {$( ".date-row" ).show();$( ".duck-row" ).hide();}
       if (d_type == 'duck') {$( ".duck-row" ).show();$( ".date-row" ).hide();}


    $( ".waitingreply" ).empty();
     $( ".datetoolbar" ).slideDown();
      $( ".message-inner" ).hide();
      $( ".date-inner" ).show();
     //  $( ".center-date" ).empty();
       
      // if (d_type=='date') {$( ".center-date" ).append('Date Details');}
     //  if (d_type=='duck') {$( ".center-date" ).append('Duck Details');}
         
          myApp.sizeNavbars();  
    
   
    
//$( "#createdatepicker" ).focus();
    
}

function noChange(){
    
 $( ".messages" ).show();
 $( ".date-close" ).hide();
  $( ".date2-close" ).hide();
  $( ".date1-close" ).hide();
  $( ".message-inner" ).show();
      $( ".date-inner" ).hide();
     // $( ".center-date" ).empty();
      $( "#createdatepicker" ).hide();
        // $( ".center-date" ).append(targetname);
          myApp.sizeNavbars();   
          $( ".nomessages" ).hide();
          $( ".date-back" ).show();
          $( ".date-button" ).show();
          scrollBottom();
}

function reverseRequest(){

$( ".dateheader" ).hide();
$( "#createdatepicker" ).hide();
    $( ".dr" ).show();
       $( ".date-back" ).show();
    $( ".date-row" ).hide();
    $( ".duck-row" ).hide();
$( ".date-close" ).hide();

    

      $( ".date-inner" ).hide();

if (!d_day){

//$( ".center-date" ).empty();
  //        $( ".center-date" ).append(targetname);
          myApp.sizeNavbars();  
}
}

var message_count = 0;

var conversation_started = false;

function chatShow(){
    
    
 var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if (obj.from_uid == targetid){
    

    
       firebase.database().ref('notifications/' +f_uid + '/' + obj.id).update({
    received:'Y'
  });
  
  firebase.database().ref('notifications/' +targetid + '/' + obj.id).update({
    received:'Y'
  });
    
   
   }
});  
}

});


    
    message_count = 1;
        image_count = 0;

    
$( ".messages" ).show();
$( ".datearea" ).empty();
       $( ".date-back" ).show();
       $( ".date-button" ).show();
       
$( ".date-close" ).hide();
$( ".date2-close" ).hide();
     $( ".datetoolbar" ).show();
      $( ".message-inner" ).show();
      $( ".date-inner" ).hide();
     //  $( ".center-date" ).empty();
      // $( ".center-date" ).append(targetname);
          myApp.sizeNavbars();

myMessagebar = myApp.messagebar('.messagebar', {
    maxHeight: 200
}); 
myMessages = myApp.messages('.messages', {
    autoLayout: true,
    scrollMessages:true
}); 

//if (myMessages) {console.log('my mesage bar exisits');myMessages.clean();}




if (message_history === true){console.log('variable message history set');}
if (message_history === false){
console.log('variable message history not set');
message_history = true;
//do the .on call here to keep receiving messages here
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


firebase.database().ref("chats/" + first_number+ '*'+second_number).once('value').then(function(snapshot) {
  
  existingmessages = snapshot.numChildren();
  
  $( ".messages").append( '<a href="#" class="button scrollbutton" onclick="scrollBottom();" style="display:none;border:0;margin-top:10px;"><i class="pe-7s-angle-down-circle pe-2x" ></i></a>');
  
  if (snapshot.numChildren() > 10) {$( ".messages").prepend( '<a href="#" class="button previouschats" onclick="getPrevious()"  style="border:0;margin-top:10px;"><i class="pe-7s-angle-up-circle pe-2x" ></i></a>' );}
      
  
}).then(function(result) {
    
message_historyon = firebase.database().ref("chats/" + first_number+ '*'+second_number).orderByKey().limitToLast(10).on("child_added", function(snapshot) {

if (message_count ==1) {lastkey = snapshot.getKey();}

message_count ++;

var obj = snapshot.val();
//console.log(obj);

if ($(".messages").height() > $(window).height()) {$( ".scrollbutton").show();}


//my messages

var unix = Math.round(+new Date()/1000);

if (obj.from_uid == f_uid) {

if (obj.param == 'dateset'){
  $( ".messages" ).append(
    
    '<div class="list-block media-list" style="margin-top:0px;">'+
    '<ul>'+
       ' <li>'+
           ' <div class="item-content">'+
             '   <div class="item-media">'+
               '     <img src="path/to/img.jpg">'+
                '</div>'+
               ' <div class="item-inner">'+
                 '   <div class="item-title-row">'+
                   '     <div class="item-title">Date Details</div>'+
                   '     <div class="item-after">Element label</div>'+
                   ' </div>'+
                   ' <div class="item-subtitle">Subtitle</div>'+
                   ' <div class="item-text">Additional description text</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul>'+
'</div>');  
    
}

if (obj.param == 'message'){
  myMessages.addMessage({
    // Message text
    text: obj.message,
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
}


if (obj.param == 'image'){
     
   //  console.log('here0');
     
     if (obj.photo_expiry){
         
         
if (obj.photo_expiry < Number(unix)){

firebase.database().ref('photochats/' + first_number+ '*'+second_number + '/' + obj.id).remove();
firebase.database().ref('chats/' + first_number+ '*'+second_number + '/' + obj.id).remove();




}

else{
    
     myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup('+image_count+');">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

image_count ++;
    
}

}

else {
     
     
     myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup('+image_count+');">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

image_count ++;
}



}


if (conversation_started === true) {

$( ".message" ).last().remove();
$( ".message" ).last().addClass("message-last");



}

}

//received messages

if (obj.to_uid == f_uid) {

if (obj.param == 'dateset'){
    
    $( ".messages" ).append(
    
    '<div class="list-block media-list">'+
    '<ul>'+
       ' <li>'+
           ' <div class="item-content">'+
             '   <div class="item-media">'+
               '     <img src="path/to/img.jpg">'+
                '</div>'+
               ' <div class="item-inner">'+
                 '   <div class="item-title-row">'+
                   '     <div class="item-title">Element title</div>'+
                   '     <div class="item-after">Element label</div>'+
                   ' </div>'+
                   ' <div class="item-subtitle">Subtitle</div>'+
                   ' <div class="item-text">Additional description text</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul>'+
'</div>');
    

    
}

if (obj.param == 'message'){
  myMessages.addMessage({
    // Message text
    text: obj.message,
    // Random message type
    type: 'received',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: targetname
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
}

if (obj.param == 'image'){
     


if (!obj.photo_expiry){



 myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup('+image_count+');">',
    // Random message type
    type: 'received',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

image_count ++;

var seentime = Math.round(+new Date()/1000);
var expirytime = Math.round(+new Date()/1000) + 86400;

console.log(expirytime);

firebase.database().ref('chats/' + first_number+ '*'+second_number + '/' + obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });

firebase.database().ref('photos/' + obj.from_uid + '/' + obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });
  
  firebase.database().ref('photochats/' + first_number+ '*'+second_number + '/' + obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });

    
    
    
    
    
    
}

else {



if (obj.photo_expiry < Number(unix)){

firebase.database().ref('photochats/' + first_number+ '*'+second_number + '/' + obj.id).remove();
firebase.database().ref('chats/' + first_number+ '*'+second_number + '/' + obj.id).remove();




}

else{
    
    myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup('+image_count+');">',
    // Random message type
    type: 'received',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

image_count ++;
    
}
    
}


}

}



}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
    
    
});








}


//myMessages.layout();
//myMessages = myApp.messages('.messages', {
//    autoLayout: true
//}); 
//myMessages.scrollMessages();

}

function getPrevious(){
var prevarray = [];
message_count = 0;  
additions ++;
$(".previouschats").remove();



var left2load = existingmessages - (additions * 10); 
var letsload;
if (left2load > 10) {letsload = 10;} else {letsload = left2load;}



var first_number,second_number;


if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


var newmessage_history = firebase.database().ref("chats/" + first_number+ '*'+second_number).orderByKey().limitToLast(letsload).endAt(lastkey).on("child_added", function(snapshot) {



message_count ++;

if (message_count ==1) {lastkey = snapshot.getKey();}

var obj = snapshot.val();
console.log(obj);


//my messages

if (obj.from_uid == f_uid) {

if (obj.param == 'message'){
    
    prevarray.push({
    // Message text
    text: obj.message,
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
    

}


if (obj.param == 'image'){
      prevarray.push({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup();">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

}

}

//received messages

if (obj.to_uid == f_uid) {

if (obj.param == 'message'){
  prevarray.push({
    // Message text
    text: obj.message,
    // Random message type
    type: 'received',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: targetname
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
}

if (obj.param == 'image'){
      prevarray.push({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup();">',
    // Random message type
    type: 'received',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

}

}

if (message_count == letsload) {
    

    
myMessages.addMessages(prevarray.slice(0, -1), 'prepend');
    

    
$(".scrollbutton").remove();
$(".messages").prepend('<a href="#" class="button scrollbutton" onclick="scrollBottom();" style="border:0;margin-top:10px;"><i class="pe-7s-angle-down-circle pe-2x" ></i></a>');


if (message_count == 10){$( ".messages").prepend( '<a href="#" class="button previouschats" onclick="getPrevious()"  style="border:0;margin-top:10px;"><i class="pe-7s-angle-up-circle pe-2x" ></i></a>' );}
}


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});




}
function dateRequest(){

$( ".dateheader" ).hide();
$( ".date-close" ).hide();
$( ".date-button" ).hide();

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var ref = firebase.database().ref();

var datemessageq = $( '#datemessageq' ).val();

var unix = Math.round(+new Date()/1000);
var day = pickerCustomToolbar.cols[0].displayValue;
var time = pickerCustomToolbar.cols[1].value;
var chat_expire = pickerCustomToolbar.cols[0].value;

var interestarray = [];

if (d_type == 'date'){

$( ".interestbutton" ).each(function() {
  

if ($( this ).hasClass( "interestchosen" )) {
   
   var classList = $(this).attr("class").split(' ');
    var interestadd = classList[1].split('_')[0];
    interestarray.push(interestadd);
}
    
});

console.log(interestarray);

}

if (d_type == 'duck'){
    
    if ($( '.button-my' ).hasClass( "active" )){interestarray = 'my'}
     if ($( '.button-your' ).hasClass( "active" )){interestarray = 'your'}
    
}

firebase.database().ref("dates/" + first_number+ '*'+second_number).set({
    created_uid: f_uid,
    created_name: f_first,
    received_uid:targetid,
    received_name:targetname,
    timestamp:unix,
    day:day,
    time:time,
    chat_expire:chat_expire,
    seen:'N',
    interest:interestarray,
    response:'W',
    type:d_type,
    message:datemessageq
  });


var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + obj.id).remove();
       firebase.database().ref("notifications/" + targetid + '/' + obj.id).remove();
    
    
    console.log(obj.received);
    console.log(obj.from_uid);
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       console.log(messageq);
       messageq ++;
       
       console.log(messageq);
       
    }
       
       
       


       
   }


  
});  
}



newNotification(messageq);

});

function newNotification(messagenum){



if (!messagenum) {messagenum = 1;}

var smessage;
if (d_type=='duck'){smessage = 'Duck request'}
if (d_type=='date'){smessage = 'Date request'}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);
   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:smessage,
    timestamp: t_unix,
    type:d_type,
    param:'daterequest',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + newPostKey] = targetData;
  updates['notifications/' + targetid + '/' + newPostKey] = targetData;

  return firebase.database().ref().update(updates).then(function() {
      
      if(d_response=='Y') {chatShow();}
else {reverseRequest();}
      
  });
}










}

var d_interest,d_day,d_chat_expire,d_time,d_response,d_type;

function existingDate(){

$( ".datearea" ).empty();

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

// Test if user exists
var ref = firebase.database().ref("dates/" + first_number+ '*'+second_number);
ref.once("value")
  .then(function(snapshot) {
  var dateexists = snapshot.child('chat_expire').exists(); // true
    
    if (dateexists) {
    console.log('not expired');
 var unix = Math.round(+new Date()/1000);
  if (Number(snapshot.child('chat_expire').val()) > Number(unix) ) {
      
      d_chat_expire = snapshot.child('chat_expire').val();
       d_interest = snapshot.child('interest').val();
       d_type = snapshot.child('type').val();
      d_day = snapshot.child('day').val();
      d_time = snapshot.child('time').val();
      d_response = snapshot.child('response').val();
      d_created_uid = snapshot.child('created_uid').val();
      d_timestamp = snapshot.child('timestamp').val();
      d_message = snapshot.child('message').val();
      
      if (d_response == 'Y') {chatShow();}
      else {
          
          noMessages();
          setDate();
          
    
          
        dateConfirmationPage();
          
       
          
      }
      
      
     
      $( ".messages-loader" ).hide();
      }
 else{
     console.log('date has expired');
     
     cancelDate();
     
         
        //$( ".center-date" ).empty();
//$( ".center-date" ).append(targetname);
myApp.sizeNavbars();   
     $( ".messages-loader" ).hide();
     
 }
 
    }
    else{ 
           
         d_chat_expire = false;
         d_interest = false;
      d_day = false;
      d_time = false;
         d_response = false;
         d_message = false;
     console.log('no date has been created');
     noMessages();
setDate();
   //     $( ".center-date" ).empty();
//$( ".center-date" ).append(targetname);
myApp.sizeNavbars();   
$( ".messages-loader" ).hide();

        
        }
  
  
  
  
  });
}

function interests(id){

$( "." + id + "_i" ).toggleClass( "interestchosen" );
    
}

function sendMessage(){
var newmessage = $( "#messagearea" ).val();
if (newmessage === ''){return false;}

conversation_started = true;

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var t_unix = Math.round(+new Date()/1000);


firebase.database().ref("chats/" + first_number+ '*'+second_number).push({
    from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:newmessage,
    seen:'N',
    timestamp: t_unix,
    type: d_type,
    param:'message'
  });
  
  
  
    myMessages.addMessage({
    // Message text
    text: newmessage,
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

myMessagebar.clear();
  
var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + obj.id).remove();
       firebase.database().ref("notifications/" + targetid + '/' + obj.id).remove();
    
    
    console.log(obj.received);
    console.log(obj.from_uid);
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       messageq ++;
       

       
    }
       
       
       


       
   }


  
});  
}



newNotification(messageq);

});

function newNotification(messagenum){



if (!messagenum) {messagenum = 1;}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;

   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:newmessage,
    timestamp: t_unix,
    type:d_type,
    param:'message',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + newPostKey] = targetData;
  updates['notifications/' + targetid + '/' + newPostKey] = targetData;

  return firebase.database().ref().update(updates);
}
 



}

function clearchatHistory(){
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}
if (message_history){


firebase.database().ref("chats/" + first_number+ '*'+second_number).off('child_added', message_historyon);
if(additions>0){
for (i = 0; i < additions.length; i++) { 
   firebase.database().ref("chats/" + first_number+ '*'+second_number).off('child_added', newmessage_history);
}
}




message_history = false;
message_count = 0;
additions = 0;
existingmessages = false;
conversation_started = false;
 myMessages.clean();
 myMessages.destroy();
}
if (datealertvar === true){

  firebase.database().ref("dates/" + first_number+ '*'+second_number).off('value', datealert);
 

}

datealertvar = false;

}

   function dateConfirmationPage(){
          
          var g = new Date(d_chat_expire*1000 - 3600);

var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var gday = weekday[g.getDay()];
          
          $( ".dateheader" ).hide();
             $( ".profileroundpic" ).show();
          $( ".date1-close" ).hide();
          $( ".date2-close" ).hide();
          $( ".message-inner" ).hide();
          $( ".date-inner" ).hide();
            $( ".date-back" ).show();
var timedisplay;
               // $( ".center-date" ).empty();

//$( ".center-date" ).append(targetname.capitalize());

var titleblock;

if (d_type =='duck'){titleblock = '<span style="font-family: \'Pacifico\', cursive;">Duck Request</span>'}
if (d_type =='date'){titleblock = '<span style="font-family: \'Pacifico\', cursive;">Date Request</span>'}






myApp.sizeNavbars(); 
          var messagedateblock;
          if (d_message){
              messagedateblock='<div class="item-text" style="clear:both;text-align:left;">'+d_message+'</div>';
            }
            else {messagedateblock='';}
          
          if (d_time) {timedisplay = ', ' + d_time}
          else {timedisplay='';}
          
            if (d_created_uid == f_uid) {
                
                $( ".datetoolbar" ).show();
        $( ".sender-inner" ).show();
        $( ".yes-inner" ).hide();
                //$( ".datetoolbar" ).css("background-color","#ccc");
                
        $( ".waitingreply" ).empty();
         $( ".requestbutton" ).remove();
         $( ".waitingreply" ).append(
        '<div style="background-color:#2196f3;padding:5px;text-align:center;font-size:20px;color:white;margin-top:20px;">'+titleblock+'</div>'+
        '<div class="list-block media-list" onclick="request();" style="margin-top:0px;"><ul>'+
        
        '<li>'+
         '   <div class="item-content">'+
          '      <div class="item-media">'+
          '     <i class="pe-7s-date pe-lg"></i>'+
            '    </div>'+
             '   <div class="item-inner">'+

'<div class="item-title-row">'+
               '         <div class="item-title" style="text-align:left;">Let\'s '+d_type+'</div>'+

          '</div>'+

                  '  <div class="item-subtitle" style="text-align:left;">'+gday+timedisplay+'</div>'+
   '<span class="interestdiv" style="float:left;text-align:center;"></span>'+
   messagedateblock +
    '        </div>'+
    
     '   </li>'+
     
    '</ul>'+
'</div>'+
             '<h3 style="font-weight:bold;margin-top:-20px;">Waiting for '+targetname+' to respond. </h3>'

);
         
  


  
          }
          else{
            
            $( ".datetoolbar" ).show();
        $( ".sender-inner" ).hide();
        $( ".yes-inner" ).show();
        $( ".waitingreply" ).empty();
         $( ".requestbutton" ).remove();
         $( ".waitingreply" ).append(
                '<div style="background-color:#2196f3;padding:5px;text-align:center;font-size:20px;color:white;margin-top:20px;">'+titleblock+'</div>'+

        '<div class="list-block media-list" onclick="request();" style="margin-top:0px;"><ul>'+
        '<li>'+
         '   <div class="item-content">'+
          '      <div class="item-media">'+
           '       <i class="pe-7s-date pe-lg"></i>'+
            '    </div>'+
             '   <div class="item-inner">'+

'<div class="item-title-row">'+
               '         <div class="item-title" style="text-align:left;">Let\'s '+d_type+'</div>'+
          
          
          '</div>'+


                  '  <div class="item-subtitle" style="text-align:left;"> '+gday+timedisplay+'</div>'+
                 
                               '<span class="interestdiv" style="float:left;text-align:center;"></span>'+      
messagedateblock +
                '</div>'+
    '        </div>'+
       
     '   </li>'+
       
    '</ul>'+
'</div>'+
'<h3 style="font-weight:bold;">'+targetname+' is waiting for your response.</h3>'
);

          }
  
  

if (d_interest && d_type =='duck'){
    
    if ((d_interest == 'my') && (d_created_uid == f_uid)){$( ".interestdiv").append('<span style="font-size:15px;">At '+f_first+'\'s place </span>');}
    if ((d_interest == 'my') && (d_created_uid != f_uid)){$( ".interestdiv").append('<span style="font-size:15px;">At '+targetname+'\'s place </span>');}
        if ((d_interest == 'your') && (d_created_uid == f_uid)){$( ".interestdiv").append('<span style="font-size:15px;">At '+targetname+'\'s place </span>');}
    if ((d_interest == 'your') && (d_created_uid != f_uid)){$( ".interestdiv").append('<span style="font-size:15px;">At '+f_first+'\'s place </span>');}
    
}
if (d_interest && d_type =='date'){

for (i = 0; i < d_interest.length; i++) { 
    
  $( ".interestdiv").append('<a href="#" style="margin-right:5px"><i class="twa twa-'+d_interest[i]+'" style="margin-top:5px;margin-right:5px"></i></a>');  
    

    
}
    
    
}
  
  }

function acceptDate(){
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var unix = Math.round(+new Date()/1000);

firebase.database().ref("dates/" + first_number+ '*'+second_number).update({
    response: 'Y',
    time_accepted: unix,
    uid_accepted: f_uid
  });



var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + obj.id).remove();
       firebase.database().ref("notifications/" + targetid + '/' + obj.id).remove();
    
    
    console.log(obj.received);
    console.log(obj.from_uid);
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       console.log(messageq);
       messageq ++;
       
       console.log(messageq);
       
    }
       
       
       


       
   }


  
});  
}



newNotification(messageq);

});

function newNotification(messagenum){



if (!messagenum) {messagenum = 1;}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);
   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:'Date scheduled',
    timestamp: t_unix,
    type:d_type,
    param:'dateconfirmed',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + newPostKey] = targetData;
  updates['notifications/' + targetid + '/' + newPostKey] = targetData;

  return firebase.database().ref().update(updates).then(function() {chatShow();});
}







    
}

function cancelDate(){
// Create a reference to the file to delete
$( ".dateheader" ).hide();
$( ".sender-inner" ).hide();


var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}



// Delete the file
firebase.database().ref("dates/" + first_number+ '*'+second_number).remove().then(function() {
  // File deleted successfully
  $( ".datearea" ).empty();
 
 d_chat_expire = false;
       d_interest = false;
      d_day = false;
      d_time = false;
      d_response = false;
      d_created_uid = false;
      d_timestamp = false;
      d_message = false;
 noMessages();
 setDate();
  
  console.log('deleted');
  
}).catch(function(error) {
  // Uh-oh, an error occurred!
});       
       
}


function getPicture(key){
var t_unix = Math.round(+new Date()/1000);
    
  var eventy = document.getElementById('takePictureField_').files[0];

//  var number_of_pictures = $(".imageli").length + 1;
  if (eventy == 'undefined') {console.log('undefined');}
  if (eventy !== 'undefined') {



  myMessages.addMessage({
    // Message text
    text: '<img src="'+URL.createObjectURL(eventy)+'" onload="$(this).fadeIn(700);scrollBottom();" onclick="imagesPopup('+image_count+');" style="display:none">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
        label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours'
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });

            //$("#dealimagediv_"+imagenumber).attr("src",URL.createObjectURL(eventy));
         
image_count ++;
         

console.log(photoarray);
var file_data = $('#takePictureField_').prop('files')[0]; 


$('.image_' + t_unix).onclick = function(){ 
   openPhoto(url);};

var randomstring = (Math.random() +1).toString(36).substr(2, 30);
var photoname = f_uid+ '_'+randomstring;

// Points to 'images'
var imagesRef = storageRef.child('images/' + photoname);


imagesRef.put(file_data).then(function(snapshot) {
  imagesRef.getDownloadURL().then(function(url) {

       

conversation_started = true;
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var newPostKey = firebase.database().ref().push().key;

var chatvar = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:'<img src="'+url+'" onload="$(this).fadeIn(700);" style="display:none" >',
    seen:'N',
    timestamp: t_unix,
    type:d_type,
    param:'image',
    filename:f_uid+ '_'+randomstring,
    downloadurl:url
   };

var photovar = {
    id:newPostKey,
      uid: f_uid,
    user_name: f_first,
   photo_name: f_uid+ '_'+randomstring,
 downloadurl:url   
};


// Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates["chats/" + first_number+ '*'+second_number + '/' + newPostKey] = chatvar;
  updates['photos/' + f_uid + '/' + newPostKey] = photovar;
    updates['photochats/' + first_number+ '*'+second_number + '/' + newPostKey] = photovar;

  return firebase.database().ref().update(updates);


});
  
  
  
  
});


var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + obj.id).remove();
       firebase.database().ref("notifications/" + targetid + '/' + obj.id).remove();
    
    
    console.log(obj.received);
    console.log(obj.from_uid);
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       console.log(messageq);
       messageq ++;
       
       console.log(messageq);
       
    }
       
       
       


       
   }


  
});  
}



newpictureNotification(messageq);

});


  }

function newpictureNotification(messagenum){



if (!messagenum) {messagenum = 1;}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;

   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:'Image ',
    timestamp: t_unix,
    type:d_type,
    param:'image',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + newPostKey] = targetData;
  updates['notifications/' + targetid + '/' + newPostKey] = targetData;

  return firebase.database().ref().update(updates);
}

}

function toTimestamp(year,month,day,hour,minute,second){
 var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
 return datum.getTime()/1000;
}



var photoarray; 

function showPhotos(){

photoarray= [];

myApp.pickerModal(
    '<div class="picker-modal photo-picker" style="height:132px;">' +
      '<div class="toolbar" style="background-color:#2196f3">' +
        '<div class="toolbar-inner">' +
          '<div class="left"></div>' +
          '<div class="right"><a href="#" class="close-picker" style="color:white;">Close</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="picker-modal-inner" style="background-color:#2196f3">' +
        '<div class="content-block" style="margin:0px;padding:0px;">' +
'<div class="swiper-container swiper-photos">'+
    '<div class="swiper-wrapper wrapper-photos">'+
       ' <div class="swiper-slide" style="text-align:center;margin:-5px;height:88px;">'+
               '<i class="pe-7s-plus pe-3x" style="color:white;margin-top:10px;"></i>'+
               ' <input type="file" size="70" capture="camera" accept="image/*" class="dealPictureField imagenotchosen" id="takePictureField_" onchange="getPicture();" style="background-color:transparent;color:transparent;float:left;cursor: pointer;height:60px;width:100%;z-index:1;opacity:0;background-color:red;height:88px;margin-top:-44px;"> '+

       '</div>'+

    '</div>'+
'</div>'+
        '</div>' +
      '</div>' +
    '</div>'
  );

var photosswiper = myApp.swiper('.swiper-photos', {
    slidesPerView:3,
    freeMode:true,
    preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
    watchSlidesVisibility:true
    //pagination:'.swiper-pagination'
  });
    


firebase.database().ref("photos/" + f_uid).once('value').then(function(snapshot) {
 
 var childcount = 0;
 
 snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      //var key = childSnapshot.key;
      // childData will be the actual contents of the child
      
      childcount ++;
      
      var childData = childSnapshot.val();
      
      photoarray.push(childSnapshot.val());

      
    $( ".wrapper-photos" ).append('<div onclick="sendphotoExisting(\''+childData.downloadurl+'\',\''+childData.filename+'\')" data-background="'+childData.downloadurl+'" style="border:1px solid black;margin:-5px;height:88px;background-size:cover;background-position:50% 50%;" class="swiper-slide swiper-lazy">'+
              '  <div class="swiper-lazy-preloader"></div>'+
            '</div>');
    

if (childcount == snapshot.numChildren()){
   photosswiper.updateSlidesSize();
   photosswiper.slideTo(snapshot.numChildren());
  // photosswiper.slideTo(0);
    
}
       
       
      
  });


});

}

function sendphotoExisting(oldurl,filenamez){

 conversation_started = true;
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var t_unix = Math.round(+new Date()/1000);

    myMessages.addMessage({
    // Message text
    text: '<img src="'+oldurl+'" onload="scrollBottom();">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    avatar: 'http://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
 


firebase.database().ref("chats/" + first_number+ '*'+second_number).push({
    from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:'<img src="'+oldurl+'" onload="scrollBottom();">',
    seen:'N',
    timestamp: t_unix,
    type:d_type,
    param:'image',
    filename:filenamez
  });
 
 myApp.closeModal('.photo-picker');
 
}



(function($){
    $.fn.imgLoad = function(callback) {
        return this.each(function() {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function(){
                        callback.apply(this);
                    });
                }
            }
        });
    };
})(jQuery);

function imagesPopup(go){
    
    console.log(go);
    
 var popupHTML = '<div class="popup gallery-popupz">'+
                   
                   '<div class="navbar">'+
 '   <div class="navbar-inner">'+
  '      <div class="left"><a href="#" onclick="closeGallery();" class="link icon-only"><i class="icon icon-back "></i></a></div>'+
   '     <div class="center photo-count"><span class="selectphoto" style="margin-right:5px;">1</span> of <span class="totalphotos" style="margin-left:5px;"></span></div>'+
    '    <div class="right"></div>'+
    '</div>'+
'</div>'+
                   
                   '<div class="pages">'+
'<div data-page="gallerypopup" class="page">'+
'<div class="page-content" style="background-color:white;">'+
                   
'<div class="swiper-container swiper-gallery" style="height: calc(100% - 44px);">'+

   ' <div class="swiper-wrapper gallery-wrapper">'+



   ' </div></div>'+
    
    
    '</div></div></div>'+
    
                  '</div>';
  myApp.popup(popupHTML);    

var first_number,second_number;
var gallerycount;
if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

firebase.database().ref("photochats/" + first_number+ '*'+second_number).once("value")
  .then(function(snapshot) {
      
 
      gallerycount = snapshot.numChildren();
      
      var objs = snapshot.val();

$.each(objs, function(i, obj) {
    
          $( ".gallery-wrapper" ).append(' <div class="swiper-slide" style="height:100%;">'+
          '<div class="swiper-zoom-container">'+
            
          '<img data-src="'+obj.downloadurl+'" class="swiper-lazy" style="width:100%;">'+
           ' <div class="swiper-lazy-preloader"></div></div></div>');

    
    
});
     
var galleryswiper =   myApp.swiper('.swiper-gallery', {
    preloadImages: false,
    lazyLoadingInPrevNext:true,
    // Enable lazy loading
    lazyLoading: true,
    watchSlidesVisibility:true,
    zoom:true,

    onSlideChangeStart:function(swiper){
         var slidenum = galleryswiper.activeIndex + 1;
        $( ".selectphoto" ).empty();
  $( ".selectphoto" ).append(slidenum);
        myApp.sizeNavbars();
    }
    //pagination:'.swiper-pagination'
  });
      
  
  $( ".totalphotos" ).empty();
  $( ".totalphotos" ).append(gallerycount);
  
  galleryswiper.slideTo(go);
  myApp.sizeNavbars();
  });



}

function closeGallery(){
    
    myApp.closeModal('.gallery-popupz');
}

function updateOnce(){

var uids = ["1381063698874268","1394352877264527","393790024114307","4"];


firebase.database().ref('users/' + f_uid).update({
    date_me:uids
  });
    
}

function updatePhotos(){

$( ".pp" ).each(function() {
  

console.log('.pp');
  
  var classList = $(this).attr("class").split(' ');
  var idofphoto = classList[2].replace("photo_", "");



var u_date_me = f_date_me.indexOf(idofphoto);
var u_to_date = f_to_date.indexOf(idofphoto);

var u_duck_me = f_duck_me.indexOf(idofphoto);
var u_to_duck = f_to_duck.indexOf(idofphoto);





if ((u_duck_me > -1) && (u_to_duck > -1)) {
    


        
        if ($( '.rr').hasClass('r_' + idofphoto)) {
            
            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();
        }

        
    
    $( this ).css( "-webkit-filter","none" ); $( ".distance_" + idofphoto ).css( "background-color","#2196f3" );
    

    
}



else if ((u_date_me > -1) && (u_to_date > -1)) {
    
        if ($( '.rr').hasClass('r_' + idofphoto)) {
            
            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();
        }
    
        
    
    $( this ).css( "-webkit-filter","none" ); $( ".distance_" + idofphoto ).css( "background-color","#2196f3" );
    

    
}

else{$( this ).css( "-webkit-filter","grayscale(100%)" );$( ".distance_" + idofphoto ).css( "background-color","#ccc" );

 if ($( '.rr').hasClass('r_' + idofphoto)) {
            
            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
     
    // alert(u_date_me);
    // alert(u_duck_me);
     
if (u_date_me > -1) {$( ".datebutton" ).addClass( "likesme" );}         
  else {$( ".datebutton" ).removeClass( "likesme" );}
  if (u_duck_me > -1) {$( ".duckbutton" ).addClass( "likesme" );}         
  else {$( ".duckbutton" ).removeClass( "likesme" );}
  
  
        
        }

}
    

});

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
    
}
    
function singleBrowser(idw,origin){

//firebase.database().ref("users/" + f_uid).off('value', userpref);

console.log(idw);

targetid = String(idw);
console.log(targetid);

var dbuttons;

if (origin){
      
   dbuttons = ' <div class="toolbar-inner date-template" style="display:none">'+
     '<a href="#" onclick="createDate1()" class="button link active" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;background-color:red;">Let\'s Date</a>'+
      '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;"><i class="pe-7s-close pe-2x"></i></a></div>'+
  
  ' <div class="toolbar-inner duck-template" style="display:none">'+
   '<a href="#" class="link" onclick="showDecide()" style="width:55px;"><i class="pe-7s-angle-left pe-2x"></i></a>'+
    '<a href="#" onclick="createDuck()" class="button link active" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;background-color:red;">Let\'s Duck</a></div>';

}

else {
  
   dbuttons = ' <div class="toolbar-inner date-template" style="display:none">'+
   '<a href="#" class="button link active photo-browser-close-link" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;background-color:green;">Let\'s Date</a>'+
      '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;"><i class="pe-7s-close pe-2x"></i></a></div>'+
  
  ' <div class="toolbar-inner duck-template" style="display:none">'+
   '<a href="#" class="link" onclick="showDecide()" style="width:55px;"><i class="pe-7s-angle-left pe-2x"></i></a>'+
   '<a href="#" class="button link active photo-browser-close-link" style="width: calc(100% - 55px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;background-color:green;">Let\'s Duck</a></div>';    
   

}


singlePhotoBrowser = myApp.photoBrowser({
    zoom: 400,
    lazyLoading:true,
    lazyLoadingInPrevNext:true,
    //exposition:false,
    photos: [{
        url: 'http://graph.facebook.com/'+targetid+'/picture?type=large',
        caption: ''
    }],
    
    toolbarTemplate:'<div class="toolbar tabbar" style="height:100px;">'+
  
 dbuttons+
   
   
   
   ' <div class="toolbar-inner toolbardecide">'+
'<a href="#" onclick="dateUser();" class="datebutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Date</a>'+
       ' <a href="#" class="link orlink">'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;">or</p>'+
           
       ' </a>'+
       '<a href="#" class="link loaderlink"><span class="preloader preloader-white login-loader"></span></a>'+
'<a href="#" onclick="duckUser();" class="duckbutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Duck</a>'+
       
   ' </div>'+
'</div>',
   onClose:function(photobrowser){hideProfile();$( ".chatpop" ).css( "z-index","11500" );
   //getPreferences();
   
   },
   swipeToClose:false,
  // onClick:function(swiper, event){showProfile();},

    backLinkText: '',
    
    
    
    navbarTemplate: '<div class="navbar photobrowserbar">'+
   

   
   ' <div class="navbar-inner">'+
      '  <div class="left sliding">'+
          '  <a href="#" class="mainback link photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
            '    <i class="icon icon-back {{iconsColorClass}}"></i> '+

            
          //  '<span class="badge agecat">'+arraynumber+'</span>'+
            

           ' </a>'+
           '  <a href="#" onclick="myApp.closeModal();clearchatHistory();" style="display:none;" class="notifback link photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
            '    <i class="icon icon-back {{iconsColorClass}}"></i> '+

            
          //  '<span class="badge agecat">'+arraynumber+'</span>'+
            

           ' </a>'+
       ' </div>'+
       ' <div class="center sliding nametag">'+
        //  '  <span class="photo-browser-current"></span> '+
        //  '  <span class="photo-browser-of">{{ofText}}</span> '+
        //  '  <span class="photo-browser-total"></span>'+
       ' </div>'+
       ' <div class="right" onclick="more()">' +
       '<a href="#" class="link">'+
        
        '    <i class="pe-7s-more pe-lg"></i>'+
     
       ' </a>'+
       '</div>'+
    '</div>'+
'</div>  '
});   



singlePhotoBrowser.open();
$( ".chatpop" ).css( "z-index","0" );
var windowwidth = $( ".photo-browser-swiper-container" ).width();
//console.log(windowwidth);
 $( ".photo-browser-slide img" ).css( "width", windowwidth + "px" );
 $( ".photo-browser-slide img" ).css( "-webkit-filter","grayscale(100%)" );
 $( ".photo-browser-caption" ).css( "margin-top", "-10px" );








$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;
 

return firebase.database().ref('/users/' + targetid).once('value').then(function(snapshot) {

if (!snapshot.val().date_me) {targetdatearray = [];}
        else{targetdatearray = snapshot.val().date_me;}

if (!snapshot.val().blocklist) {target_blocklist = [];}
        else{target_blocklist = snapshot.val().blocklist;}



if (!snapshot.val().duck_me) {targetduckarray = [];}
        else{targetdatearray = snapshot.val().duck_me;}

if (!snapshot.val().to_date) {targetdate = [];}
        else{targetdate = snapshot.val().to_date;}

if (!snapshot.val().to_duck) {targetduck = [];}
        else{targetduck = snapshot.val().to_duck;}



$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(100%)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
$( ".loaderlink" ).hide();
$( ".orlink" ).show();
$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );
var username = snapshot.val().name;
targetname =  username.substr(0,username.indexOf(' '));
$( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+username.substr(0,username.indexOf(' '))+'</span>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(snapshot.val().description);

var f_targetdatelikes=0;
var f_targetducklikes=0;



var indexw = f_to_date.indexOf(targetid);
console.log(indexw);
if (indexw > -1) {
console.log('in');
f_targetdatelikes = 1;
$( ".datebutton" ).addClass( "active" );

}
else{console.log('not in');$( ".datebutton" ).removeClass( "active" );}

var datesme = targetdate.indexOf(f_uid);
targetdatelikes=0;
targetducklikes=0;
if (datesme > -1) {
$( ".datebutton" ).addClass( "likesme" );
targetdatelikes = 1;
}
else {$( ".datebutton" ).removeClass( "likesme" );}

var duckme = targetduck.indexOf(f_uid);
if (duckme > -1) {
$( ".duckbutton" ).addClass( "likesme" );
targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "likesme" );}






console.log(f_to_date);
console.log(targetid);




var index1 = f_to_duck.indexOf(targetid);
if (index1 > -1) {
    $( ".duckbutton" ).addClass( "active" );
    f_targetducklikes = 1;
}
else {$( ".duckbutton" ).removeClass( "active" );}

if (f_targetducklikes ==1 && targetducklikes ==1) {
    if ((f_targetducklikes ==1 && targetducklikes ==1) || (f_targetdatelikes ==1 && targetdatelikes ==1)){
    
    $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


   

}
    

}
console.log(f_to_date);
console.log(targetid);
console.log(f_targetdatelikes);
console.log(targetdatelikes);

if (f_targetdatelikes ==1 && targetdatelikes ==1){
    
$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


}

});
    
    
}

function deletePhotos(){

var unix = Math.round(+new Date()/1000);



firebase.database().ref('/photos/' + f_uid).once('value').then(function(snapshot) {

var objs = snapshot.val();


if (snapshot.val()){

$.each(objs, function(i, obj) {



if (obj.photo_expiry < Number(unix)){

firebase.database().ref('/photos/' + f_uid + '/' + obj.id).remove();

var desertRef = storageRef.child('images/' + obj.photo_name); 

// Delete the file
desertRef.delete().then(function() {
  console.log('File deleted successfully');
}).catch(function(error) {
  console.log('Uh-oh, an error occurred!');
  
});

}

});
}

});
    
}    

function createDuck(idq,nameq){
keepopen = 1;
d_type = 'duck';
if (idq) {createDate(idq,nameq)}
else{createDate();}
    
}

function createDate1(idz,name){
d_type = 'date';
keepopen = 1;
if (idz) {createDate(idz,name)}
else{createDate();}
    
}

function duckClass(place){

if (place ==1) {
    
    if ($( ".button-my" ).hasClass( "active" )){
        $('.button-my').removeClass("active");$('.button-your').removeClass("active");
    }
    else {$('.button-my').addClass("active");$('.button-your').removeClass("active");}
    
    }
if (place ==2) {
    
      if ($( ".button-your" ).hasClass( "active" )){
        $('.button-your').removeClass("active");$('.button-my').removeClass("active");
    }
    else {$('.button-your').addClass("active");$('.button-my').removeClass("active");}
    
    
}
 
    
}

function matchNotif(){

//post a notif when match
    
    
}

function unmatchNotif(){
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

firebase.database().ref('dates/' + first_number+ '*'+second_number).remove();
myApp.closePanel();


/* 

 var notifdelete = firebase.database().ref('notifications/' +f_uid).once('value', function(snapshot) {

var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {

if ((obj.to_uid == targetid) || (obj.from_uid == targetid)) {
    
  firebase.database().ref('notifications/' +f_uid + '/' + obj.id).remove();
    
}
    
});


}


});

*/
    
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

        }

};
