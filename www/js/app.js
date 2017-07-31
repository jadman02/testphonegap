var refreshIntervalId;

var desktoparray = ['media/dateicon.png','media/duckicon.png','media/datetongue.png','media/dateorducklogo.png']



function sendNotification(targetto,param){

	 firebase.auth().currentUser.getToken().then(function(idToken) {   
var titlestring;
		 var bodystring;


if (param == 1){titlestring = 'New match created';bodystring='With ' + f_first;}	
		 if (param == 2){titlestring = 'New date request received';bodystring='From ' + f_first;}	
if (param == 3){titlestring = 'New date confirmed';bodystring='By ' + f_first;}	
		 if (param == 4){titlestring = 'New message received';bodystring='From ' + f_first;}	
		 if (param == 5){titlestring = 'New photo received';bodystring='From ' + f_first;}
		 if (param == 6){titlestring = 'Date cancelled';bodystring='With ' + f_first;}
		 var typesend;
		 if (d_type){typesend = d_type;}
		 else {typesend = 'date';}
		 
	$.post( "http://www.dateorduck.com/sendnotification.php", {projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,target:targetto,titlestring:titlestring,bodystring:bodystring,param:param,type:typesend,firstname:f_first} )

  .done(function( data ) {
		//alert(JSON.stringify(data));

});
		 });

}



function sharePop(){

facebookConnectPlugin.showDialog({
	method: "share",
	href: "http://www.dateorduck.com/",
	hashtag: "#dateorduck"
	//share_feedWeb: true, // iOS only
}, function (response) {}, function (response) {})

	
}

function appLink(){

	facebookConnectPlugin.appInvite(
    {
        url: "https://fb.me/1554148374659639",
        picture: "https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    },
    function(obj){
        if(obj) {
            if(obj.completionGesture == "cancel") {
                // user canceled, bad guy 
            } else {
                // user really invited someone :) 
            }
        } else {
            // user just pressed done, bad guy 
        }
    },
    function(obj){
        // error 
        alert(JSON.stringify(obj));
    }
);

}

function fcm(){
NativeKeyboard.showMessenger({
  onSubmit: function(text) {
    console.log("The user typed: " + text);
  }
});
   
}

var displaySuggestions = function(predictions, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {


    myApp.alert('Could not confirm your hometown.', 'Error');
clearHometown();
		  

		  
          } else{
	var predictionsarray = [];
$('.hometownprediction').remove();
          predictions.forEach(function(prediction) {

predictionsarray.push(prediction.description);
	 
	  
          });
	  }
	
	
	
		var hometownpicker = myApp.picker({
    input: '#homesearch',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } },
onChange:function (p, values, displayValues){$( '#homesearch' ).addClass("profilevaluechosen");},
    onClose:function (p){hometownpicker.destroy();},
			toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'hometown\')">' +
                    '<a href="#" class="link close-picker" onclick="clearHometown();" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: predictionsarray
       }
     ]
}); 
	
	hometownpicker.open();
	
	  };

function checkHometown(){
  

	
var hometownquery = $('#homesearch').val();
	if (hometownquery == ''){
	return false;}
	
        var service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: hometownquery,types: ['(cities)'] }, displaySuggestions);

}

function clearHometown(){

	$('#homesearch').val('');

}

function newHometown(){
        $('#homesearch').remove(); 
	 $('.hometown-input').append('<textarea class="resizable" id="homesearch" onclick="newHometown()" onblur="checkHometown()" placeholder="Hide"  style="min-height:60px;max-height:132px;"></textarea>'); 
	$('#homesearch').focus();
  

}

function fQuery(){



	
	
$.ajax({
   url: "https://graph.facebook.com/v2.4/784956164912201?fields=context.fields(friends_using_app)",
    type: "get",
    data: { access_token: f_token},
    success: function (response, textStatus, jqXHR) {



$.ajax({
   url: "https://graph.facebook.com/v2.4/"+response.context.id+"/friends_using_app?summary=1",
    type: "get",
    data: { access_token: f_token},
    success: function (response1, textStatus, jqXHR) {



try {

	response1.summary.total_count;
	
	var friendstring;
if (response1.summary.total_count ==0) {friendstring = 'No friends use this app'}
	if (response1.summary.total_count ==1) {friendstring = '1 friend uses this app' }
	if (response1.summary.total_count >1) {friendstring = response1.summary.total_count + ' friends use this app' }
	

	if (response1.summary.total_count > 9){


		
		 nearbyshare = true;
		 recentshare = true;
		$('.nearby-title').html('Nearby First');
		$('.recent-title').html('Recently Online');
		$('.nearby-helper').hide();
		$('.recent-helper').hide();
		$('.nearby-wrapper').css("-webkit-filter","none");
		$('.recent-wrapper').css("-webkit-filter","none");

		firebase.database().ref('users/' + f_uid).update({
recentfriends:'Y'
  }).then(function() {});
		
		}
	
	if ((response1.summary.total_count > 4) && (response1.summary.total_count <10)){

if ($('.no-results-div').length > 0) {$('.nearby-helper').hide();
		$('.recent-helper').hide();}
		else{
		
	nearbyshare = true;
		$('.nearby-helper').hide();
		$('.nearby-wrapper').css("-webkit-filter","none");
		$('.nearby-title').html('Nearby First');
	

		
$('.recent-title').html('<i class="pe-7s-lock pe-lg"></i> Recently Online (Locked)');

recentshare = false;
		$('.recent-wrapper').css("-webkit-filter","blur(10px)");
		$('.recent-helper').show();
 $('.recent-helper').html(
		'<div class="list-block media-list" style="margin-top:-20px;margin-bottom:5px;"><ul>'+
     '   <li>'+
          '  <div class="item-content" style="background-color:#f7f7f8;border-radius:5px;margin-left:20px;margin-right:20px;margin-top:10px;">'+
              // ' <div class="item-media">'+
               //    ' <img src="path/to/img.jpg">'+
              // ' </div>'+
                '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '  <div class="item-title">'+friendstring+'</div>'+
                       // '<div class="item-after"></div>'+
                   ' </div>'+
                    '<div class="item-subtitle" style="margin-top:5px;margin-bottom:5px;"><a href="#" class="button active" onclick="appLink()">Invite friends</a></div>'+
                   ' <div class="item-text">Sign up <span class="badge" style="background-color:#ff3b30;color:white;">10</span> friends on Facebook to unlock this feature.</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul></div>  ');
		//$('.recent-helper').html('<p style="margin-top:-10px;padding:5px;">'+friendstring+'. Invite <span class="badge" style="background-color:#ff3b30;color:white;">10</span> or more friends on Facebook to <br/>unlock this feature.</p>');
	//$('.summary-helper').html('<p style="font-weight:bold;">'+friendstring+'</p><div class="row"><div class="col-50"><a class="button active external" href="sms:&body=Check out a new app in the App Store: https://fb.me/1554148374659639. It is called Date or Duck. Thoughts? ">Send SMS</a></div><div class="col-50"><a class="button active external" href="#" onclick="appLink()">Invite Friends</a></div></div><p style="color:#666;font-size:12px;margin-top:-10px;">We appreciate your help to grow this app!</p>');
	}
	}
	if (response1.summary.total_count < 5){
if ($('.no-results-div').length > 0) {$('.nearby-helper').hide();
		$('.recent-helper').hide();}
else{		
	nearbyshare = false;
		 recentshare = false;
		$('.nearby-helper').show();
		$('.recent-helper').show();
		$('.nearby-title').html('<i class="pe-7s-lock pe-lg"></i> Nearby First (Locked)');
		$('.recent-title').html('<i class="pe-7s-lock pe-lg"></i> Recently Online (Locked)');
		$('.nearby-wrapper').css("-webkit-filter","blur(10px)");
		$('.recent-wrapper').css("-webkit-filter","blur(10px)");
 
$('.recent-helper').html(
		'<div class="list-block media-list" style="margin-top:-20px;margin-bottom:5px;"><ul>'+
     '   <li>'+
          '  <div class="item-content" style="background-color:#f7f7f8;border-radius:5px;margin-left:20px;margin-right:20px;margin-top:10px;">'+
              // ' <div class="item-media">'+
               //    ' <img src="path/to/img.jpg">'+
              // ' </div>'+
                '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '  <div class="item-title">'+friendstring+'</div>'+
                       // '<div class="item-after"></div>'+
                   ' </div>'+
                    '<div class="item-subtitle" style="margin-top:5px;margin-bottom:5px;"><a href="#" class="button active" onclick="appLink()">Invite friends</a></div>'+
                   ' <div class="item-text">Sign up <span class="badge" style="background-color:#ff3b30;color:white;">10</span> friends on Facebook to unlock this feature.</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul></div>  ');
		
		$('.nearby-helper').html(
		'<div class="list-block media-list" style="margin-top:-20px;margin-bottom:5px;"><ul>'+
     '   <li>'+
          '  <div class="item-content" style="background-color:#f7f7f8;border-radius:5px;margin-left:20px;margin-right:20px;margin-top:10px;">'+
              // ' <div class="item-media">'+
               //    ' <img src="path/to/img.jpg">'+
              // ' </div>'+
                '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '  <div class="item-title">'+friendstring+'</div>'+
                       // '<div class="item-after"></div>'+
                   ' </div>'+
                    '<div class="item-subtitle" style="margin-top:5px;margin-bottom:5px;"><a href="#" class="button active" onclick="appLink()">Invite friends</a></div>'+
                   ' <div class="item-text">Sign up <span class="badge" style="background-color:#ff3b30;color:white;">5</span> friends on Facebook to unlock this feature.</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul></div>  ');


		
		//$('.recent-helper').html('<p style="margin-top:-10px;padding:5px;">'+friendstring+'. Invite <span class="badge" style="background-color:#ff3b30;color:white;">10</span> or more friends on Facebook to <br/>unlock this feature.</p>');
// $('.nearby-helper').html('<p style=margin-top:-10px;"padding:5px;">'+friendstring+'. Invite <span class="badge" style="background-color:#ff3b30;color:white;">5</span> or more friends on Facebook to <br/>unlock this feature.</p>');
//	$('.summary-helper').html('<p style="font-weight:bold;"></p><div class="row"><div class="col-50"><a class="button active external" href="sms:&body=Check out a new app in the App Store: https://fb.me/1554148374659639. It is called Date or Duck. Thoughts? ">Send SMS</a></div><div class="col-50"><a class="button active external" href="#" onclick="appLink()">Invite Friends</a></div></div><p style="color:#666;font-size:12px;margin-top:-10px;">We appreciate your help to grow this app!</p>');
	
	}


	}	
	    
} catch(err) {


	
$('.nearby-helper').html(
		'<div class="list-block media-list" style="margin-top:-20px;margin-bottom:5px;"><ul>'+
     '   <li>'+
          '  <div class="item-content" style="background-color:#f7f7f8;border-radius:5px;margin-left:20px;margin-right:20px;margin-top:10px;">'+
              // ' <div class="item-media">'+
               //    ' <img src="path/to/img.jpg">'+
              // ' </div>'+
                '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '  <div class="item-title">Invite friends to use this app</div>'+
                       // '<div class="item-after"></div>'+
                   ' </div>'+
                    '<div class="item-subtitle" style="margin-top:5px;margin-bottom:5px;"><a href="#" class="button active" onclick="getFriends()">Find friends</a></div>'+
                   ' <div class="item-text">Sign up <span class="badge" style="background-color:#ff3b30;color:white;">5</span> friends on Facebook to unlock this feature.</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul></div>  ');
	
	$('.recent-helper').html(
		'<div class="list-block media-list" style="margin-top:-20px;margin-bottom:5px;"><ul>'+
     '   <li>'+
          '  <div class="item-content" style="background-color:#f7f7f8;border-radius:5px;margin-left:20px;margin-right:20px;margin-top:10px;">'+
              // ' <div class="item-media">'+
               //    ' <img src="path/to/img.jpg">'+
              // ' </div>'+
                '<div class="item-inner">'+
                    '<div class="item-title-row">'+
                      '  <div class="item-title">Invite friends to use this app</div>'+
                       // '<div class="item-after"></div>'+
                   ' </div>'+
                    '<div class="item-subtitle" style="margin-top:5px;margin-bottom:5px;"><a href="#" class="button active" onclick="getFriends()">Find friends</a></div>'+
                   ' <div class="item-text">Sign up <span class="badge" style="background-color:#ff3b30;color:white;">10</span> friends on Facebook to unlock this feature.</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul></div>  ');
	
// $('.recent-helper').html('<p style="padding:5px;">'+friendstring+'. Invite <span class="badge" style="background-color:#ff3b30;color:white;">10</span> or more friends on Facebook to unlock this feature.</p>');
// $('.nearby-helper').html('<p style="padding:5px;">'+friendstring+'. Invite <span class="badge" style="background-color:#ff3b30;color:white;">5</span> or more friends on Facebook to unlock this feature.</p>');

	//$('.summary-helper').html('<p style="font-weight:bold;">Invite friends to unlock features</p><div class="row"><div class="col-100"><a class="button active" href="#" onclick="getFriends">Unlock</a></div></div><p style="color:#666;font-size:12px;margin-top:-10px;">Features are locked based on how many friends you invite to use the app.</p>');

    // caught the reference error
    // code here will execute **only** if variable was never declared
}


$( ".summary-helper" ).show(); 

        
   },
    error: function (jqXHR, textStatus, errorThrown) {console.log(errorThrown);
    },
    complete: function () {
    }
});
        
   },
    error: function (jqXHR, textStatus, errorThrown) {console.log(errorThrown);
    },
    complete: function () {
    }
});
}

function setWant(val){

	$( ".homedate" ).addClass("disabled");
	$( ".homeduck" ).addClass("disabled");
	
if (val == 0){
   if ($( ".homedate" ).hasClass( "active" )){$( ".homedate" ).removeClass("active");
  
if ($( ".homeduck" ).hasClass( "active" )){homewant = 'duck';updateWant(); }else {homewant = 'offline';updateWant(); }                                           
                                            
                                             
                                             } 
else{$( ".homedate" ).addClass("active");
 if ($( ".homeduck" ).hasClass( "active" )){homewant = 'dateduck';updateWant(); }else {homewant = 'date';updateWant(); }  
    }
}

    if (val == 1){
       if ($( ".homeduck" ).hasClass( "active" )){$( ".homeduck" ).removeClass("active");
                                             if ($( ".homedate" ).hasClass( "active" )){homewant = 'date';updateWant(); }else {homewant = 'offline';updateWant(); }
                                                 } 
        else{$( ".homeduck" ).addClass("active");
                                                     if ($( ".homedate" ).hasClass( "active" )){homewant = 'dateduck';updateWant(); }else {homewant = 'duck';updateWant(); }

            }

    }

    
   
}


function updateWant(){

	if (homewant == 'offline'){
	if (random_all.length > 0){

randomswiper.removeAllSlides();
nearbyswiper.removeAllSlides();
recentswiper.removeAllSlides();
randomswiper.destroy();
nearbyswiper.destroy();
recentswiper.destroy();
} 
		new_all = [];
random_all = [];
nearby_all = [];
recent_all = [];
	
	}
	
firebase.database().ref('users/' + f_uid).update({
    homewant:homewant
  }).then(function() {});
	
   //Will update firebase user homewant
   //Check if updateuser function is in go daddy file
   
   firebase.auth().currentUser.getToken().then(function(idToken) {   
$.post( "http://www.dateorduck.com/updatewant.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,want:homewant} )

  .done(function( data ) {
//getMatches();  
 
  
  });


    }).catch(function(error) {
  // Handle error
});
   

   
   
}

function startCamera(){


    
    navigator.camera.getPicture(conSuccess, conFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,sourceType:Camera.PictureSourceType.PHOTOLIBRARY});
}




function conSuccess(imageURI) {
  alert('gotimage');  
  
  //var image = document.getElementById('myImage');
    //image.src = imageURI;
  
}

function conFail(message) {
    alert('Failed because: ' + message);
}

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



function directUser(id,type,firstname){
	if ($('.chatpop').length > 0) {myApp.closeModal('.chatpop');}

	if (type =='date'){createDate1(id,firstname,0);}
	else {createDuck(id,firstname,0);}
	
	
	
	

}

// Initialize your app
var myApp = new Framework7({dynamicNavbar: true,modalActionsCloseByOutside:true,init: false});

// Export selectors engine
var $$ = Dom7;
var datatap, tapid, taptype, tapname;




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
	var distancepicker;
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
var radiussize = '100';
var radiusunit = 'Kilometres';
    var sortby,offsounds;
var industry_u,hometown_u,status_u,politics_u,eyes_u,body_u,religion_u,zodiac_u,ethnicity_u,height_u,weight_u,recentfriends;
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
var homewant;
var singlefxallowed = true;
var photoresponse;
var targetpicture;
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


//soNow();

      FCMPlugin.onNotification(function(data){
   
	      $( ".notifspan" ).show();
$( ".notifspan" ).addClass('notifbounce');
setTimeout(function(){ $( ".notifspan" ).removeClass('notifbounce'); }, 5000);
	      
	      cordova.plugins.notification.badge.set(data.ev4);
	      
	      if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.

	    
	   if (latitudep){directUser(data.ev1,data.ev2,data.ev3);}
	    else{
	    datatap = true;
	    tapid = data.ev1;
	taptype = data.ev2;
	tapname = data.ev3;
	    }
	    
	    
	    
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.

	    myApp.addNotification({
        title: 'Date or Duck',
		    subtitle:data.aps.alert.title,
        message: data.aps.alert.body,
		    hold:2000,
		    closeOnClick:true,
		    onClick:function(){directUser(data.ev1,data.ev2,data.ev3);},
        media: '<img width="44" height="44" style="border-radius:100%" src="media/icon-76.png">'
    });
	    
	   // alert( JSON.stringify(data) );

    }
});

        // Add views
view1 = myApp.addView('#view-1');
view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
view3 = myApp.addView('#view-3');
view4 = myApp.addView('#view-4');
       
	    
	    

    
	    
//setTimeout(function(){ alert("Hello");
		     
//FCMPlugin.onTokenRefresh(function(token){
 //   alert( token );
//});
	//alert("Hello2");	     
		     
		   //  }, 10000);


    
    
//authstatechanged user only
 
 firebase.auth().onAuthStateChanged(function(user) {
  

  
  if (user) {
     var checkbadge = false;
	  if (f_projectid){checkbadge = false;}
	  else{checkbadge = true;}
	  
cordova.plugins.notification.badge.get(function (badge) {

if (badge >0){	
	
$( ".notifspan" ).show();
$( ".notifspan" ).addClass('notifbounce');
setTimeout(function(){ $( ".notifspan" ).removeClass('notifbounce'); }, 5000);}

else {$( ".notifspan" ).hide();}
	
});

//FCMPlugin.getToken( successCallback(token), errorCallback(err) ); 
//Keep in mind the function will return null if the token has not been established yet. 

 

f_projectid = firebase.auth().currentUser.toJSON().authDomain.substr(0, firebase.auth().currentUser.toJSON().authDomain.indexOf('.'))



       f_uid = user.providerData[0].uid;
       f_auth_id = user.uid;
        f_name = user.providerData[0].displayName;

        
         f_first = f_name.substr(0,f_name.indexOf(' '));
         f_email = user.providerData[0].email;
          f_image = user.providerData[0].photoURL;
       
//	  if (subscribeset){}
//	  else{
//		  FCMPlugin.subscribeToTopic( f_uid, function(msg){
  //  alert( msg );
//}, function(err){
  //  alert( err );
//} );
	  //}
	  
	  //subscribeset = true;


	  if (checkbadge){
	  
		                	 firebase.auth().currentUser.getToken().then(function(idToken) {   
		    $.post( "http://www.dateorduck.com/setbadge.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid} )
  .done(function( data1 ) {
	
		var result1 = JSON.parse(data1); 	  

	cordova.plugins.notification.badge.set(result1[0].notificationcount);

			    if (result1[0].notificationcount >0){	
	
$( ".notifspan" ).show();
$( ".notifspan" ).addClass('notifbounce');
setTimeout(function(){ $( ".notifspan" ).removeClass('notifbounce'); }, 5000);}

else {$( ".notifspan" ).hide();}

});
});  
	  
	  }
	  
	  var originalid = window.localStorage.getItem("originalid");

                        if (!originalid) {window.localStorage.setItem("originalid", f_uid);}

  // $( ".userimagetoolbar" ).css("background-image","url(\'https://graph.facebook.com/"+f_uid+"/picture?type=normal\')");
   

   
  
   
  
   
 //  $( "#profilepic" ).empty();
  // $( "#profilepic" ).append('<div style="float:left;height:70px;width:70px;border-radius:50%;margin:0 auto;background-size:cover;background-position:50% 50%;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?type=normal\');"></div>');

firebase.database().ref('users/' + f_uid).update({
    auth_id : f_auth_id
  }).then(function() {getPreferences();});




   
    
    
  
    
    
    
    
  } else {
      

      $( ".ploader" ).show();
      $( ".loginbutton" ).show();
      $( ".login-loader" ).hide();

   
             
	  var originalid = window.localStorage.getItem("originalid");




                        if (originalid) {$( ".secondlogin" ).show();}
	  else {$( ".loginbutton" ).show();}
	  
	  
	  
    // No user is signed in.
  }
});
 
        

        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
	       
    
    
    }

};







function clearBadge(){

	 	      firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/clearnotifications.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid} )
  .done(function( data ) {


});
}); 

	$( ".notifspan" ).hide();
	cordova.plugins.notification.badge.set(0);

}

function startApp(){

 
    
    firebaseinit = localStorage.getItem('tokenStore');
    
    if (firebaseinit){

        
        
        

            
            
      var credential = firebase.auth.FacebookAuthProvider.credential(firebaseinit);

        
            firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
         
                if (error){
                myApp.alert('Error', 'Error message: ' + errorMessage + '(code:' + errorCode + ')');
                }
        });
         
            
            

        
        
        
    }
    else {
     

    alert('no tokenStore');
    }
    
    
    
}



//document.addEventListener("screenshot", function() {
  //  alert("Screenshot");
//}, false);


$$('.panel-right').on('panel:opened', function () {

leftPanel();

	
	
});

$$('.panel-right').on('panel:open', function () {
    
    $( ".upgradeli" ).slideDown();
   
 clearBadge();
	
});




$$('.panel-right').on('panel:closed', function () {
    
myList.deleteAllItems();
myList.clearCache();
clearBadge();
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


	if (datatap === true){
	

	  targetid = tapid;
	    targetname = tapname;
	    directUser(tapid,taptype,tapname);
	datatap = false; tapid = false; taptype = false; tapname = false; 
	}
	
	
updateGeo();

   
   

$( ".age-header" ).remove();
    $( ".swiper-container-loaded" ).remove();
 
    };


  function onError(error) {
       
       if (error.code == '1'){

           myApp.alert('we are using your approximate location, to improve accuracy go to location settings', 'Oops we cannot find you');

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

function showtext(){
$( ".showtext" ).show();
}

function getWifilocation(){



navigator.geolocation.getCurrentPosition(onSuccess, onError);



}

var apiGeolocationSuccess = function(position) {

latitudep = position.coords.latitude;
longitudep = position.coords.longitude;

//alert(latitudep);
//alert(longitudep);

	

	if (datatap === true){
	

	  targetid = tapid;
	    targetname = tapname;
	    directUser(tapid,taptype,tapname);
	datatap = false; tapid = false; taptype = false; tapname = false; 
	}
	
updateGeo();

    $( ".age-header" ).remove();
    $( ".swiper-container-loaded" ).remove();
   




};



function mainLoaded(id,pid){
$( ".iconpos_" + id ).show();
$( ".default_" + pid).hide();

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
var random_all = [];
var nearby_all = [];
var recent_all = [];
var nearbyshare = false, recentshare = false;
var randomswiper, recentswiper, nearbyswiper;

function getMatches(){

	//alert('getmatch trigger' + homewant);
	
//can put any ads here
if ((initialload === false) && (availarray.length === 0)){



}

	
	
if (!homewant || homewant =='offline'){

	$('.content-here').empty();
   $( ".statusbar-overlay" ).css("background-color","#ccc");
	$( ".buttons-home" ).hide();
	$( ".toolbar" ).hide();
	$( ".results-loader" ).hide();
    
	new_all = [];
random_all = [];
nearby_all = [];
recent_all = [];

	
	var swiperheight = $( window ).height() - 378;
	
	$('.content-here').append(
    '<div class="no-results-div" style="background-color:white;z-index:30000000;text-align:center;margin:0 auto;width:300px;position:absolute;top:44px;left:50%;margin-left:-150px;margin-top:54px;">'+
'<div class="topdiv">'+
     // '<h3>Get Quacking!</h3>'+
				'    <div class="content-block-title" style="width:100%;text-align:center;margin-top:15px;margin-left:0px;">Get Quacking, It\'s Easy</div>'+

       '<div class="row" style="padding-top:10px;padding-bottom:10px;">'+
    '<div class="col-30" style="padding-top:5px;"><img src="media/datefaceonly.png" style="width:80px;margin:0 auto;"></div>'+
   // '<div class="col-70" style="padding-top:5px;">Press <span style="font-family: \'Pacifico\', cursive;font-size:20px;">date</span> if you want to find something more serious like a relationship.</div>'+
		    '<div class="col-70" style="padding-top:5px;">Press <span style="font-family: \'Pacifico\', cursive;font-size:26px;">date</span> to find love <br/>(or at least try)</div>'+

'</div>'+
              '<div class="row" style="padding-top:10px;padding-bottom:10px;margin-bottom:10px;">'+
    '<div class="col-30" style="padding-top:5px;"><img src="media/duckfaceonly.png" style="width:80px;margin:0 auto;"></div>'+
//    '<div class="col-70" style="padding-top:5px;">Press <span style="font-family: \'Pacifico\', cursive;font-size:20px;">duck</span> if you want to get down to...ahem...business (replace the D with another letter). </div>'+
		    '<div class="col-70" style="padding-top:5px;">Press <span style="font-family: \'Pacifico\', cursive;font-size:26px;">duck</span> to find fun <br/>(replace the D with another letter)</div>'+

		'</div>'+
	 '</div>'+   

	
		  '<div class="list-block-label" style="color:#666;margin-bottom:10px;">Choose one, or both. Your profile is hidden until you decide.</div>'+

		
'<div class="swiper-container swiper-helper-info" style="z-index:99999999999999;background-color:#ccc;color:#6d6d72;margin-left:-10px;margin-right:-10px;padding-top:10px;">'+
'    <div class="content-block-title" style="width:100%;text-align:center;margin-top:15px;margin-left:0px;">How this App Works</div>'+
		' <div class="swiper-wrapper">'+
     '   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px;"><i class="twa twa-4x twa-coffee" style="margin-top:5px;"></i><h2>Find your next<br/> coffee date...</h2></div></div>'+
     '   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px"><i class="twa twa-4x twa-wave" style="margin-top:5px;"></i><h2>Or invite someone over<br/> tonight...</h2></div></div>'+
               '   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px"><i class="twa twa-4x twa-information-desk-person" style="margin-top:5px;"></i><h2>Match with someone <br/>you fancy</h2></div></div>'+

		'   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px"><i class="twa twa-4x twa-calendar" style="margin-top:5px;"></i><h2>Once you both agree on</br> a time to meet...</h2></div></div>'+

		'   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px"><i class="twa twa-4x twa-clock12" style="margin-top:5px;"></i><h2>Chat is enabled until <br/>midnight of your date...</h2></div></div>'+

		'   <div class="swiper-slide" style="height:'+swiperheight +'px;"><div class="squareheight" style="height:153px;top:50%;margin-top:-85px;position:absolute;width:300px;left:50%;margin-left:-150px"><i class="twa twa-4x twa-bomb" style="margin-top:5px;"></i><h2>You can send photos that delete after 24 hours...</h2></div></div>'+

		
   ' </div>'+

    '<div class="swiper-pagination-p" style="margin-top:-20px;margin-bottom:20px;"></div>'+
'</div>'+
   
		'    <div class="content-block-title" style="width:100%;text-align:center;margin-top:20px;margin-bottom:10px;margin-left:0px;">Support this app</div>'+
'<a href="#" class="button-big button active" style="margin-bottom:10px;" onclick="appLink()">Invite Friends</a>'+
		'<a href="#" class="button-big button" style="margin-bottom:10px;" onclick="sharePop()">Share</a>'+
		'<a class="button-big button external" href="sms:&body=Check out a new app in the App Store: https://fb.me/1554148374659639. It is called Date or Duck. Thoughts? " style="margin-bottom:10px;">Send SMS</a>'+
    '</div>');


    $( ".ploader" ).hide();
var homeswiperhelper = myApp.swiper('.swiper-helper-info', {
    pagination:'.swiper-pagination-p'
  });
   
  
    $( ".loginbutton" ).show();
$( ".login-loader" ).hide();
    
$( ".homedate" ).removeClass("disabled");
	$( ".homeduck" ).removeClass("disabled");

   return false;

}   
 $( ".statusbar-overlay" ).css("background-color","#2196f3"); 
	

initialload = true;

if (recentfriends){
$( ".summary-helper" ).show();
	nearbyshare = true;
		 recentshare = true;
		$('.nearby-title').html('Nearby First');
		$('.recent-title').html('Recently Online');
		$('.nearby-helper').hide();
		$('.recent-helper').hide();
		$('.nearby-wrapper').css("-webkit-filter","none");
		$('.recent-wrapper').css("-webkit-filter","none");
}	
else{

	//check permission first
	
readPermissions();
	
	

}	
	
	
if (updatecontinuously){}
else {setInterval(function(){ justGeo(); }, 599000);updatecontinuously=true;}

new_all = [];
random_all = [];
nearby_all = [];
recent_all = [];

    if (timeoutactive === true) {clearTimeout(noresultstimeout);}
    
    timeoutactive = true;
    
    


firebase.auth().currentUser.getToken().then(function(idToken) {


randomswiper = myApp.swiper('.swiper-random', {
    slidesPerView:2.5,
    freeMode:true,
    slidesOffsetAfter:12,
        preloadImages: false,
    lazyLoading: true,
    watchSlidesVisibility:true,
    watchSlidesProgress: true,
freeModeSticky:true,
	lazyLoadingInPrevNextAmount:5,
lazyLoadingOnTransitionStart:true,
    onClick:function(swiper, event) {


new_all = random_all;

    photoBrowser(randomswiper.clickedIndex);}
  });
 
nearbyswiper = myApp.swiper('.swiper-nearby', {
    slidesPerView:2.5,
    freeMode:true,
    slidesOffsetAfter:12,
        preloadImages: false,
    lazyLoading: true,
    watchSlidesVisibility:true,
    watchSlidesProgress: true,
freeModeSticky:true,
		lazyLoadingInPrevNextAmount:5,
lazyLoadingOnTransitionStart:true,
    onClick:function(swiper, event) {

new_all = nearby_all;


if (nearbyshare){
photoBrowser(nearbyswiper.clickedIndex);
}
else{}
    }
  });
  
recentswiper = myApp.swiper('.swiper-recent', {
  slidesPerView:2.5,
    freeMode:true,
    slidesOffsetAfter:12,
        preloadImages: false,
    lazyLoading: true,
    watchSlidesVisibility:true,
    watchSlidesProgress: true,
freeModeSticky:true,
		lazyLoadingInPrevNextAmount:5,
lazyLoadingOnTransitionStart:true,
    onClick:function(swiper, event) {
new_all = recent_all;

if (recentshare){
photoBrowser(recentswiper.clickedIndex);
}
else{}
}
  });
 


	
	dbCall('random');
	dbCall('distance');
	dbCall('activity');
	
function dbCall(fetch){


$.post( "http://www.dateorduck.com/locations.php", { want:homewant,projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,upper:f_upper,lower:f_lower,radius:radiussize,radiusunit:radiusunit,sexuality:sexuality,sortby:fetch,latitudep:latitudep,longitudep:longitudep} )
  .done(function( data ) {




var result = JSON.parse(data); 


//alert(JSON.stringify(result));


var slidewidth = $( document ).width() / 2.5;
    var halfwidth = -Math.abs(slidewidth / 2.23);
     
$( ".swiper-recent" ).css("height",slidewidth + "px");
$( ".swiper-nearby" ).css("height",slidewidth + "px");
$( ".swiper-random" ).css("height",slidewidth + "px");


    var  slide_number = 0;
 

 
descriptionslist = [];
nameslist = [];

   
   
   
   $( ".results-loader" ).hide();
   
   if (result == 77 ||(result.length ===1 && result[0].uid == f_uid ) ){
   

   $( ".home-title" ).hide(); 

 $( ".results-loader" ).hide();
    $('.content-here').append(
    '<div class="no-results-div" style="background-color:white;z-index:30000000;text-align:center;margin:0 auto;width:300px;position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-70px;">'+
    
    '<img src="media/datetongue.png" onload="showtext()" style="width:120px;margin:0 auto;">'+
    
   '<div style="display:none;" class="showtext"><h3>No one found nearby</h3><p style="padding-top:0px;margin-top:-10px;">Try changing your search radius </br> or age range.</p></br></div>'+


   
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

	   var hometown_d = result[i].hometown;
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





var activecircle='';


//if (diff<11){activecircle = '<span style="position:absolute;left:10px;height:10px;width:10px;border-radius:50%;bottom:10px;background-color:#4cd964"></span>';}
//else{activecircle = '<span style="position:absolute;left:10px;bottom:10px;height:10px;width:10px;border-radius:50%;background-color:transparent;border:1px solid #ccc;"></span>';}
if ($('.slide_' + graphid).length){
  

  
 







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




var randomid = Math.floor(Math.random() * (1000000000 - 0 + 1));


var slidecontent;
if (index1 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+randomid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#2196f3;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\',\''+randomid+'\');" style="display:none;'+imagestyle+'-webkit-filter:none;overflow:hidden;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/datefaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;"></p></div></div>';   
}

else if (index2 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+randomid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#2196f3;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\',\''+randomid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:none;display:none;overflow:hidden;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/duckfaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;"></p></div></div>';    

} 



else if (index3 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+randomid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\',\''+randomid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;-webkit-filter:grayscale(1%);display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/duckfaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;"></p></div></div>';           
} 


else if (index4 > -1) {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+randomid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="float" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\',\''+randomid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"/><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;-webkit-filter:grayscale(1%);display:none;" class="icondiv iconpos_'+graphid+'"><img src="media/datefaceonly.png" style="width:100px;"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-left:23px;margin-top:-30px;color:white;font-size:15px;text-align:left;"></p></div></div>';      
} 


else {
slidecontent = '<div class="age_'+subtract+' swiper-slide slide_'+graphid+'" style="text-align:center;padding-top:3px;padding-left:3px;"><span class="preloader default_'+randomid+'"></span><div style="width:'+slidewidth+'px;margin:0 auto;"><div style="position:absolute;right:10px;top:0px;" class="arrowdivhome_'+graphid+'"></div><div class="distance_'+graphid+'" style="display:none;width:50px;background-color:#ccc;color:white;z-index:999;padding:0.5px;position:absolute;left: 3px;z-index:1000;font-size:12px;">'+distancestring+'</div><img crossOrigin="Anonymous" id="photo_'+graphid+'" onload="$(this).fadeIn(700);mainLoaded(\''+graphid+'\',\''+randomid+'\');" class="swiper-lazy pp photo_'+graphid+'" data-src="'+profilepicstringsmall+'" style="'+imagestyle+'-webkit-filter:grayscale(80%);overflow:hidden;display:none;margin-top:0px;"><div style="bottom:0px;right:0px;position:absolute;width:50px;overflow-x:hidden;height:50px;overflow-y:hidden;display:none;" class="icondiv iconpos_'+graphid+'"></div>'+activecircle+'<p class="name_'+graphid+'" style="-webkit-filter:grayscale(80%);clear:both;font-weight:bold;margin-top:-30px;color:white;font-size:15px;text-align:left;float:left;margin-left:23px;"></p></div></div>';    

}

if (fetch == 'random'){randomswiper.appendSlide(slidecontent);


  

random_all.push({hometown:hometown_d,widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancenumber:distance,distancestring:distancestring,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});

if (random_all[0].id == graphid || random_all[1].id == graphid || random_all[2].id == graphid){
   

 $(".photo_"+graphid).attr("src", profilepicstringsmall); 

}

}
if (fetch == 'distance'){nearbyswiper.appendSlide(slidecontent);
nearby_all.push({hometown:hometown_d,widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancenumber:distance,distancestring:distancestring,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});

if (nearby_all[0].id == graphid || nearby_all[1].id == graphid || nearby_all[2].id == graphid){
   

 $(".photo_"+graphid).attr("src", profilepicstringsmall); 

}

}
if (fetch == 'activity'){recentswiper.appendSlide(slidecontent);
recent_all.push({hometown:hometown_d,widthslides:result[i].widthslides,heightslides:result[i].heightslides,availarraystring:availarraystring,minutes:diff,distancenumber:distance,distancestring:distancestring,photocount:photocount,photos:photostring,name:matchname,age:subtract,description:matchdescription,id:graphid,url:'https://graph.facebook.com/'+graphid+'/picture?width=828',caption:'...',industry: industry_d, status: status_d, politics:politics_d,eyes:eyes_d,body:body_d,religion:religion_d,zodiac:zodiac_d,ethnicity:ethnicity_d,height:height_d,weight:weight_d});

if (recent_all[0].id == graphid || recent_all[1].id == graphid || recent_all[2].id == graphid){
   

 $(".photo_"+graphid).attr("src", profilepicstringsmall); 

}

}









  
  
  

  }




}
}
   


   
  

 
   
//if (nearbyshare){
//remove blur, unlock swiper

//}
//else{   $( ".nearby-helper" ).show();}
//if (recentshare){
//remove blur, unlock swiper
//}
//else{   $( ".recent-helper" ).show();}   
    
	$( ".homedate" ).removeClass("disabled");
	$( ".homeduck" ).removeClass("disabled");

	
if (random_all.length === 0){


if ($('.no-results-div').length > 0) {}
	else{

		
		$( ".home-title" ).hide(); 

 $( ".results-loader" ).hide();
    

		$('.content-here').append(
    '<div class="no-results-div" style="background-color:white;z-index:30000000;text-align:center;margin:0 auto;width:300px;position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-70px;">'+
    
    '<img src="media/datetongue.png" onload="showtext()" style="width:120px;margin:0 auto;">'+
    
   '<div style="display:none;" class="showtext"><h3>No one found nearby</h3><p style="padding-top:0px;margin-top:-10px;">Try changing your search radius </br> or age range.</p></br></div>'+


   
    '</div>');
	  
		  
	}
}
	else {$( ".home-title" ).show(); $('.content-here').empty();}	
	
	
	
	
	
	
    });
	

	
}    
    
   

 
   

    //here is the id token call
    
    }).catch(function(error) {
  // Handle error
});
   
    
    
    $( ".ploader" ).hide();
    
    $( ".toolbar" ).show();
    $( ".loginbutton" ).show();
$( ".login-loader" ).hide();
    

 //$('.no-results-div').empty();

clearInterval(refreshIntervalId);


deletePhotos();




}



function justGeo(){

firebase.auth().currentUser.getToken().then(function(idToken) {   
$.post( "http://www.dateorduck.com/updatelocation.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,latitude:latitudep,longitude:longitudep} )

  .done(function( data ) {
  
console.log('updatedtimestamp');
  
 
  
  });


    }).catch(function(error) {
  // Handle error
});
    
}

function updateGeo(){
firebase.auth().currentUser.getToken().then(function(idToken) {  	
$.post( "http://www.dateorduck.com/updatelocation.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,latitude:latitudep,longitude:longitudep} )
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
hometown_u = snapshot.child("hometown").val();
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
homewant = snapshot.child("homewant").val();
recentfriends = snapshot.child("recentfriends").val();

if (snapshot.child("photoresponse").val()){
	    
	    if (snapshot.child("photoresponse").val() == 'Y'){photoresponse = 'Y';f_image = snapshot.child("uploadurl").val();}
	    }
else{
	photoresponse = 'N';
f_image = 'https://graph.facebook.com/'+f_uid+'/picture?width=100&height=100';
}
	    
      
sortby = snapshot.child("sort").val();
	    
	    
if (sortby){

if (sortby == 'random'){sortBy(1);}
if (sortby == 'distance'){sortBy(2);}
if (sortby == 'activity'){sortBy(3);}



$( ".sortbutton" ).removeClass( "active" );
$( "#sort" + sortby ).addClass( "active" );





}
	    
if (snapshot.child("offsounds").val()){offsounds = snapshot.child("offsounds").val();}
if (snapshot.child("availstring").val()){ availarray = JSON.parse(snapshot.child("availstring").val());}
f_description = snapshot.child("description").val(); 
        f_lower = snapshot.child("lower").val(); 
         radiussize = snapshot.child("radius").val(); 
	      
	    if(snapshot.child("radiusunit").val()){radiusunit = snapshot.child("radiusunit").val();}
	    else{radiusunit = "Kilometres";}
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
  if(homewant){
       if (homewant == 'offline'){$( ".homedate" ).removeClass('active');$( ".homeduck" ).removeClass('active'); }
     if (homewant == 'dateduck'){$( ".homedate" ).addClass('active');$( ".homeduck" ).addClass('active'); }
   if (homewant == 'duck'){$( ".homedate" ).removeClass('active');$( ".homeduck" ).addClass('active'); }
    if (homewant == 'date'){$( ".homedate" ).addClass('active');$( ".homeduck" ).removeClass('active'); }
}
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

    swipePopup(1);
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
if (random_all.length > 0){

randomswiper.removeAllSlides();
nearbyswiper.removeAllSlides();
recentswiper.removeAllSlides();
randomswiper.destroy();
nearbyswiper.destroy();
recentswiper.destroy();
} 


          $( ".home-title" ).hide(); 
          
          $( ".nearby-helper" ).hide(); 
                    $( ".recent-helper" ).hide(); 
	$( ".summary-helper" ).hide(); 
          
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


function clickMe() {
pickerDescribe.open();


}

function keyUp(){

    if (sexuality){processUpdate();  myApp.sizeNavbars();  }
var inputlength = $( "#userdescription" ).val().length;    

        
$( "#maxdescription" ).empty();
$( "#maxdescription" ).append(inputlength + " / 100");



}



function updateUser(){



if ((pickerDescribe.initialized === false && !f_age) || (pickerDescribe2.initialized === false && !f_lower)) {

myApp.alert('Please complete more profile information.', 'Missing Information');

return false;}


if (myswiperphotos){

myswiperphotos.destroy();
myswiperphotos = false;
}

	
	
var newage,newinterested,newgender;

if (pickerDescribe.initialized === false) {newage = f_age;newgender = f_gender;}
else {newage = pickerDescribe.value[1];newgender = pickerDescribe.value[0];}

if (pickerDescribe2.initialized === false) {newinterested = f_interested;}
else {newinterested = pickerDescribe2.value[0];}

var userzdescription; 
if ($( "#userdescription" ).val()) {userzdescription = $( "#userdescription" ).val();}
else {userzdescription = '';}

//Need to delete old reference




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



//if ($( "#distance_10" ).hasClass( "active" )){radiussize = '10';}
//if ($( "#distance_25" ).hasClass( "active" )){radiussize = '25';}
//if ($( "#distance_50" ).hasClass( "active" )){radiussize = '50';}
//if ($( "#distance_100" ).hasClass( "active" )){radiussize = '100';}


availarray = [];
$( ".availrec" ).each(function() {

if ($( this ).hasClass( "selecrec" )){

var availinputid = $(this).attr('id').replace('aa_', '');

var valueinputted = $( "#picker"+availinputid ).val();

var supdate = $( ".suppdate_"+availinputid ).val();

if (valueinputted == 'Now'){daysaved ='Now';timesaved='';}
else{
valueinputted = valueinputted.split(' ');
var daysaved = valueinputted[0];
var timesaved = valueinputted[1];

}





availarray.push({id:availinputid,day:daysaved,time:timesaved,fulldate:supdate});
}
});

var availstring = JSON.stringify(availarray);



var availstringn = availstring.toString();



if ($('#soundnotif').prop('checked')) {offsounds = 'Y'} else {offsounds = 'N'}


//User Profile details
var hometown_u = $( "#homesearch" ).val();
var industry_u = $( "#industry-input" ).val();
var status_u = $( "#status-input" ).val();
var politics_u = $( "#politics-input" ).val();
var eyes_u = $( "#eyes-input" ).val();
var body_u = $( "#body-input" ).val();
var religion_u = $( "#religion-input" ).val();
var zodiac_u = $( "#zodiac-input" ).val();
var ethnicity_u = $( "#ethnicity-input" ).val();
var height_u = $( "#height-input" ).val().substring(0,3);
var weight_pre = $( "#weight-input" ).val();
var weight_u = weight_pre.substr(0, weight_pre.indexOf(' '));


var uploadurl = '';
	photoresponse = 'N';
if (f_largeurls.length > 0){photoresponse = 'Y';uploadurl = f_largeurls[0];}
	else{photoresponse='N';uploadurl = '';}




firebase.database().ref('users/' + f_uid).update({
    gender: newgender,
    industry:industry_u,
	hometown:hometown_u,
    status:status_u,
    politics: politics_u,eyes: eyes_u,body: body_u,religion: religion_u,zodiac: zodiac_u,ethnicity: ethnicity_u,
height: height_u,
weight: weight_u,
        age: newage,
    interested: newinterested,
    lower: lowerage,
    upper: upperage,
    description:userzdescription,
    radius:radiussize,
	   radiusunit:radiusunit,
    availstring:availstring,
    offsounds:offsounds,
	photoresponse:photoresponse,
	uploadurl:uploadurl
    
    
  });


	if (deletedphoto){

var newsmall = f_smallurls.toString();
var newlarge = f_largeurls.toString();

var newwidth = addedwidth.toString();
var newheight = addedheight.toString();




firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/updatephotos.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,largeurls:newlarge,smallurls:newsmall,height:newheight,width:newwidth} )
  .done(function( data ) {





});

    }).catch(function(error) {
  // Handle error
});

}
	

var hometown_u = $( "#homesearch" ).val();
var industry_u = $( "#industry-input" ).val();
var status_u = $( "#status-input" ).val();
var politics_u = $( "#politics-input" ).val();
var eyes_u = $( "#eyes-input" ).val();
var body_u = $( "#body-input" ).val();
var religion_u = $( "#religion-input" ).val();
var zodiac_u = $( "#zodiac-input" ).val();
var ethnicity_u = $( "#ethnicity-input" ).val();
var height_u = $( "#height-input" ).val().substring(0,3);
var weight_pre = $( "#weight-input" ).val();
var weight_u = weight_pre.substr(0, weight_pre.indexOf(' '));


firebase.auth().currentUser.getToken().then(function(idToken) {
$.post( "http://www.dateorduck.com/updatedetails.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,sexuality:sexuality,uid:f_uid,name:f_name,description:userzdescription,age:newage,availstring:availstringn,industry:industry_u,hometown:hometown_u,status:status_u,politics:politics_u,eyes:eyes_u,body:body_u,religion:religion_u,zodiac:zodiac_u,ethnicity:ethnicity_u,height:height_u,weight:weight_u} )
  .done(function( data ) {


//if (f_gender && (f_gender != newgender)){
//deleteDatabase(); 
//}

//if (f_interested && (f_interested != newinterested)){
//deleteDatabase(); 
//}

  
  });

   }).catch(function(error) {
  // Handle error
});

f_lower = lowerage;
f_upper = upperage;


//if (loadpref2===true){getWifilocation();}

loadpref2 = true;
myApp.closeModal();
$( ".popup-overlay" ).remove();
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

var mynotifs = [];
function leftPanel(){
canscrollnotif = true;
mynotifs = [];
notifadditions=0;
if(!myList){

myList = myApp.virtualList('.virtual-notifications', {
    // Array with plain HTML items
    items: [],
    height:89,
    renderItem: function (index, item) {
        var backgroundnotifcolor;
        if(item.colordot == ''){backgroundnotifcolor = 'white';}else{backgroundnotifcolor = 'transparent';}
        
        
        
        
        if(item.from_uid == f_uid){
        
        
 
        
        return '<li class="item-content"  style="height:89px;background-color:'+backgroundnotifcolor+'">' +
                  '<div class="item-media" onclick="singleUser('+item.targetid+',\''+item.targetname+'\',1)" style="width:50px;height:50px;border-radius:50%;background-image:url('+item.picture+');background-size:cover;background-position:50% 50%;">'+
                  

                  '</div>' +
                  '<div class="item-inner" onclick="'+item.func+'('+item.targetid+',\''+item.targetname+'\')" style="margin-left:10px;" >' +
                     '<div class="item-title-row" >'+
                  '<div class="item-title" style="font-size:14px;margin-top:5px;">'+item.targetname+'</div>'+
                  '<div class="item-after"><img src="media/'+item.type+'faceonly.png" style="width:30px;"></div>'+
                  '</div>'+
                '<div class="item-subtitle">'+ item.icon + item.title + ' </div>' +
                                '<div class="item-text" style="height:20.8px">'+ item.timestamptitle + ' </div>' +

                  '</div>' +
               '</li>';
        }
        
        else{
        
//onclick="singleBrowser('+item.targetid+')"
        
         return '<li class="item-content"  style="height:89px;background-color:'+backgroundnotifcolor+'">' +
                   '<div class="item-media" onclick="singleUser('+item.targetid+',\''+item.targetname+'\',1)" style="width:50px;height:50px;border-radius:50%;background-image:url('+item.picture+');background-size:cover;background-position:50% 50%;">'+


                  '</div>' +
                  '<div class="item-inner" onclick="'+item.func+'(\''+item.targetid+'\',\''+item.targetname+'\')" style="margin-left:10px;" >' +
                     '<div class="item-title-row" >'+
'<div class="item-title" style="font-size:14px;margin-top:5px;">'+item.targetname+item.colordot+'</div>'+
'<div class="item-after"><img src="media/'+item.type+'faceonly.png" style="width:30px;"></div>'+
                  '</div>'+
                '<div class="item-subtitle" style="color:black;">'+  item.icon + item.title + ' </div>' +
                                                '<div class="item-text"  style="height:20.8px">'+ item.timestamptitle + ' </div>' +

                  '</div>' +
               '</li>';
        
        }
               
               
    }
});
}

var notificationlist = firebase.database().ref('notifications/' + f_uid).once('value', function(snapshot) {





if (snapshot.val() === null){
    
    
    
  //  $('.title-notify').remove();
  //  $('.virtual-notifications').append('<div class="content-block-title title-notify" style="margin-top:54px;">No notifications</div>');
    
$('.nonefound').remove();
       $('.virtual-notifications').prepend('<div class="content-block-title nonefound" style="margin: 0 auto;margin-top:10px;text-align:center;">No Matches Yet</div>');
    
}

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){
$('.nonefound').remove();

var objs = snapshot.val();
var obg = [];
$.each(objs, function(i, obk) {obg.push (obk)});

console.log(obg);

function compare(a,b) {
  if (a.timestamp > b.timestamp)
    return -1;
  if (a.timestamp < b.timestamp)
    return 1;
  return 0;
}

obg.sort(compare);




$.each(obg, function(i, obj) {
    

    
var typetype = obj.type.substring(0, 4);
    var correctimage;
    var correctname;
    var iconhtml;
    var colordot;
    var message_text;
    var func;
	var picturesrc;
var mediaicon;
var dateseenresponse;
if (typetype == 'date') {mediaicon = fdateicon;}
     if (typetype == 'duck') {mediaicon = fduckicon;}


//need to see if a match still and then create function based on tha
    
var timestamptitle;
var unixnow = Math.round(+new Date()/1000);
var tunixago = unixnow - obj.timestamp;
var tunixminago = tunixago / 60;

if (tunixminago < 1) {timestamptitle = '1 minute ago';}
else if (tunixminago == 1) {timestamptitle = '1 minute ago';}
else if (tunixminago < 2) {timestamptitle = '1 minute ago';}
else if (tunixminago < 60) {timestamptitle = Math.round(tunixminago)+' minutes ago';}

else if (tunixminago == 60) {timestamptitle = '1 hour ago';}
else if (tunixminago < 62) {timestamptitle = '1 hour ago';}
else if (tunixminago < 1440) {timestamptitle = Math.round(tunixminago / 60) +' hours ago';}
else if (tunixminago == 1440) {timestamptitle = '1 day ago';}
else if (tunixminago < 2880) {timestamptitle = '1 day ago';}
else if (tunixminago >= 2880) {timestamptitle = Math.round(tunixminago / 1440) +' days ago';}
else if (tunixminago == 10080) {timestamptitle = '1 week ago';}
else if (tunixminago < 20160) {timestamptitle = '1 week ago';}
else if (tunixminago >= 20160) {timestamptitle = Math.round(tunixminago / 10080) +' weeks ago';}
else if (tunixminago == 525600) {timestamptitle = '1 week ago';}
else if (tunixminago < (525600*2)) {timestamptitle = '1 week ago';}
else if (tunixminago >= (525600*2)) {timestamptitle = Math.round(tunixminago / 525600) +' years ago';}


    
   // onclick="singleBrowser('+targetid+')"
    
    if (obj.param=='message'){message_text = obj.message;  iconhtml = '<i class="pe-7s-mail pe-lg" style="margin-right:5px;z-index:9999;"></i>'}
        if (obj.param=='image'){
            if (obj.from_uid == f_uid){message_text = obj.message + 'sent';}
            else {message_text = obj.message + 'received';}
            
            iconhtml = '<i class="pe-7s-camera pe-lg" style="margin-right:5px;z-index:9999;"></i>';}
            
            if (obj.param=='daterequest'){


                
                if (obj.from_uid == f_uid){message_text = obj.message + ' sent';}
            else {message_text = obj.message + ' received';} 
                
                iconhtml = '<i class="pe-7s-date pe-lg" style="margin-right:5px;z-index:9999;"></i>';
            }
            
             if (obj.param=='datedeleted'){
                
                if (obj.from_uid == f_uid){message_text = obj.message;}
            else {message_text = obj.message;} 
                
                iconhtml = '<i class="pe-7s-date pe-lg" style="margin-right:5px;z-index:9999;"></i>';
            }
            
              if (obj.param=='newmatch'){
                
                if (obj.from_uid == f_uid){message_text = obj.message;}
            else {message_text = obj.message;} 
                
                iconhtml = '<i class="pe-7s-like pe-lg" style="margin-right:5px;z-index:9999;"></i>';
            }
            
           
            
             if (obj.param=='dateconfirmed'){
                
                message_text = obj.message;
                                

                
                iconhtml = '<i class="pe-7f-date pe-lg" style="margin-right:5px;z-index:9999;"></i>';
            }

    
     //   if(obj.received=='N' && (obj.param=='datedeleted' || obj.param=='newmatch')){colordot = '<span class="badge" style="background-color:#2196f3;margin-top:5px;margin-left:5px;">'ssage_count+'</span>';} else{colordot = '';}
    
  //  if(obj.received=='N' && (obj.param!='datedeleted' && obj.param!='newmatch')){colordot = '<span class="badge" style="background-color:#2196f3;margin-top:5px;margin-left:5px;">'+obj.new_message_count+'</span>';} else{colordot = '';}

if(obj.received=='N' && (obj.param=='message' || obj.param=='image')){colordot = '<span class="badge" style="background-color:#2196f3;margin-top:5px;margin-left:5px;">'+obj.new_message_count+'</span>';} 
else if(obj.received=='N'){colordot = '<span class="badge" style="background-color:#2196f3;margin-top:5px;margin-left:5px;width:12px;height:12px;"></span>';} 

else{colordot = '';}

 if (obj.from_uid == f_uid){correctimage = String(obj.to_uid);correctname = String(obj.to_name);colordot = '';}
    else {correctimage = String(obj.from_uid);correctname = String(obj.from_name);image_after = 'received';}
    



datemeinarray=0;
duckmeinarray=0;
datetoinarray=0;
ducktoinarray=0;




if (obj.from_uid == f_uid){picturesrc = obj.to_picture;}
	else{picturesrc = obj.from_picture;}
	

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




if ((datemeinarray==1 && datetoinarray==1) || (duckmeinarray==1 && ducktoinarray==1)) {
    
    if (typetype == 'date') {func = 'createDate1';}
     if (typetype == 'duck') {func = 'createDuck';}
    }
else{func = 'singleUser'}



   
    mynotifs.push({
    title: message_text,
    targetid:correctimage,
    targetname:correctname,
    picture:picturesrc,
    from_name: obj.from_name,
    to_name: obj.to_name,
    from_uid: obj.from_uid,
    to_uid: obj.to_uid,
    icon:iconhtml,
    colordot:colordot,
    func:func,
    type:typetype,
    timestamptitle:timestamptitle
});
  
  
    
   
    
});

var notif2load = mynotifs.length; 



if (notif2load > 12) {notifletsload = 12;} else {notifletsload = notif2load;}

for (i = 0; i < notifletsload; i++) { 

 myList.appendItem({
    title: mynotifs[i].title,
    targetid:mynotifs[i].targetid,
    targetname:mynotifs[i].targetname,
    picture:mynotifs[i].picture,
    from_name: mynotifs[i].from_name,
    to_name: mynotifs[i].to_name,
    from_uid:mynotifs[i].from_uid,
    to_uid: mynotifs[i].to_uid,
    icon:mynotifs[i].icon,
    colordot:mynotifs[i].colordot,
    func:mynotifs[i].func,
    type:mynotifs[i].type,
    timestamptitle:mynotifs[i].timestamptitle
});

}

 
}

});
    
}



function rightPanel(){

$('.timeline-upcoming').empty();
  myApp.sizeNavbars();    
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
weekday[0] =  "SUN";
weekday[1] = "MON";
weekday[2] = "TUE";
weekday[3] = "WED";
weekday[4] = "THU";
weekday[5] = "FRI";
weekday[6] = "SAT";
    
    var timelinedates = firebase.database().ref('/dates/' + f_uid).once('value').then(function(snapshot) {
    
    var objs = snapshot.val();
$('.timeline-upcoming').empty();
if (snapshot.val() === null){
    
    $('.timeline').append('<div class="content-block-title" style="margin: 0 auto;text-align:center;">Calendar is empty</div>');
    
}

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {

rightdates.push(obj);

});
 
 
 
rightdates.sort(compare);
 
 
 
 
 for (i = 0; i < rightdates.length; i++) { 

 var correctname;
 var correctid;
	 var picturesrc;
if (rightdates[i].created_uid == f_uid) {picturesrc = rightdates[i].to_picture;correctname = rightdates[i].received_name;correctid = rightdates[i].received_uid;}
if (rightdates[i].created_uid != f_uid) {picturesrc = rightdates[i].from_picture;correctname = rightdates[i].created_name;correctid = rightdates[i].created_uid;}

 var unix = Math.round(+new Date()/1000);

   var c = new Date(rightdates[i].chat_expire*1000);
    

var cday = weekday[c.getDay()];

if ((rightdates[i].created_uid == f_uid || rightdates[i].received_uid == f_uid) && (rightdates[i].chat_expire > Number(unix)) ){


var d = new Date(rightdates[i].chat_expire*1000 - 3600);
var timehere;

if (rightdates[i].time) {timehere = ', ' + rightdates[i].time;}
else {timehere='';}
var timestamptitle;
var datetype = rightdates[i].type.capitalize();
var datesidetitle;
var dayday = d.getDate();
var monthmonth = month[d.getMonth()];
var subtitletext,confirmtext;
if (rightdates[i].response =='Y') {
   
   
   
   if (rightdates[i].type=='date' ){datesidetitle = 'Date';}
   if (rightdates[i].type=='duck' ){datesidetitle = 'Duck';}
   
timestamptitle = datesidetitle + ' Confirmed';



var name_accepted;



if (rightdates[i].received_uid == f_uid) {name_accepted = 'you ';}
else {name_accepted = rightdates[i].received_name;}    


    subtitletext='<div style="font-family: \'Pacifico\', cursive;font-size:17px;background-color:#4cd964;color:white;width:100%;text-align:center;padding-top:5px;padding-bottom:5px;"><i class="pe-7s-check pe-lg" style="color:white"></i></div>';
    confirmtext='Date confirmed by '+name_accepted+' on '+cday;
    
    }
if (rightdates[i].response =='W') {
    
    var unixnow = Math.round(+new Date()/1000);
var tunixago = unixnow - rightdates[i].timestamp;
var tunixminago = tunixago / 60;

if (tunixminago < 1) {timestamptitle = 'Sent now';}
else if (tunixminago == 1) {timestamptitle = 'Sent 1 min ago';}
else if (tunixminago < 2) {timestamptitle = 'Sent 1 min ago';}
else if (tunixminago < 60) {timestamptitle = 'Sent '+Math.round(tunixminago)+' mins ago';}

else if (tunixminago == 60) {timestamptitle = 'Sent 1 hour ago';}
else if (tunixminago < 62) {timestamptitle = 'Sent 1 hour ago';}
else if (tunixminago < 1440) {timestamptitle = 'Sent '+Math.round(tunixminago / 60) +' hours ago';}
else if (tunixminago == 1440) {timestamptitle = 'Sent 1 day ago';}
else if (tunixminago < 2880) {timestamptitle = 'Sent 1 day ago';}
else if (tunixminago >= 2880) {timestamptitle = 'Sent '+Math.round(tunixminago / 1440) +' days ago';}
    
    if (rightdates[i].created_uid == f_uid) {confirmtext = 'Waiting for '+rightdates[i].received_name+' to respond.';}
if (rightdates[i].created_uid != f_uid){confirmtext = rightdates[i].created_name + ' is waiting for your response.';}
    
     if (rightdates[i].type=='date' ){datesidetitle = 'Date Request';}
   if (rightdates[i].type=='duck' ){datesidetitle = 'Duck Request';}
    

    subtitletext='<div style="font-family: \'Pacifico\', cursive;font-size:17px;background-color:#ff9500;color:white;width:100%;text-align:center;padding-top:5px;padding-bottom:5px;"><i class="pe-7s-help1 pe-lg" style="color:white"></i></div>';}

if ($(".time_line_" + dayday)[0]){
    
} else {
    
    $('.timeline').append('<div class="timeline-item" style="margin-bottom">'+
    '<div class="timeline-item-date" style="margin-right:10px;">'+cday+'<br/>'+dayday+' <small> '+monthmonth+' </small></div>'+
    //'<div class="timeline-item-divider"></div>'+
    '<div class="timeline-item-content time_line_'+dayday+'">'+
    
    '</div>'+
    
  '</div>');
    
}


$('.time_line_'+dayday).append(
    
    '<a href="#" onclick="createDate(\''+correctid+'\',\''+correctname+'\')">'+
   
      
subtitletext+
   
  // '<div class="timeline-item-time" style="padding:2px;margin-top:0px;background-color:white;border-bottom:1px solid #c4c4c4;text-align:center;padding-top:10px;"><i class="pe-7s-clock pe-lg"></i> //'+weekday[d.getDay()]+ timehere+'<div style="clear:both;" id="interestdatediv_'+correctid+'"></div></div>'+

    '<div class="timeline-item-inner" style="min-width:136px;padding:7px;border-radius:0;">'+
   
          
                '<div class="timeline-item-title" style="color:black;margin-top:5px;text-align:center;"><div style="width:50px;height:50px;margin:0 auto;border-radius:50%;background-size:cover;background-position:50% 50%;background-image:url(\''+picturesrc+'\')"></div><span style="clear:both;">'+correctname+'<span> </div>'+



   


      
    //  '<div style="padding:10px;font-size:13px;"><span style="color:#6d6d72;clear:both;padding-top:-5px;">'+confirmtext+'</span></div>'+
      '<div style="text-align:center;clear:both;width:100%;color:#8e8e93;">'+timestamptitle+'</div>'+
'</div>'+
'</a>'
      
    
    );



if(rightdates[i].type=='date'){
//for (k = 0; k < rightdates[i].interest.length; k++) { 
    
 // $( "#interestdatediv_" + correctid).append('<a href="#" style="margin-right:5px"><i class="twa twa-'+rightdates[i].interest[k]+'" style="margin-top:5px;margin-right:5px"></i></a>');  
    

   // }
}

}

}
 
}

        
    });
    

    
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
var deletedphoto;
function getData(){



deletedphoto = false;

if(photosloaded === false){

firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/userdata.php", {projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid} )
  .done(function( data ) {
  var result = JSON.parse(data); 
 console.log(result);



 
  if (result!='77' && result[0].largeurl){
  
  $( ".reorderbutton" ).removeClass('disabled');
    $( ".deleteallbutton" ).removeClass('disabled');
  
  
  f_smallurls = result[0].smallurl.split(',');
  f_largeurls = result[0].largeurl.split(',');
  
  console.log(result[0].widthslides);
   console.log(result[0].heightslides);
  
    addedwidth = result[0].widthslides.split(',');
      addedheight = result[0].heightslides.split(',');
  
        $( ".photosliderinfo" ).addClass('pictures');

       if (f_largeurls.length === 1){       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photo to your profile');
}
else{       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photos to your profile');
}
       

for (i = 0; i < f_largeurls.length; i++) { 




   $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\''+f_largeurls[i]+'\');background-size:cover;background-position:50% 50%;"><div class="button" style="border:0;border-radius:0px;background-color:#ff3b30;color:white;position:absolute;bottom:10px;right:5px;" onclick="deleteIndividual()">Remove</div></div>');
   

   
}


	  
    myswiperphotos = myApp.swiper('.container-photos', {
    pagination:'.swiper-pagination',
    paginationType:'progress',
    direction:'vertical',
    onInit:function(swiper){$( ".photoswiperloader" ).hide();},
    onClick:function(swiper, event){
    



    
    
    
    

    
    }
  });

  
  }
  else {


	  
    f_smallurls = [];
  f_largeurls = [];
  addedheight = [];
  addedwidth = [];
  
     $( ".wrapper-photos" ).append('<div class="swiper-slide firsthere" style="height:250px;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?width=828\');background-size:cover;background-position:50% 50%;\');"></div>');
    $( ".photosliderinfo" ).removeClass('pictures');
   $( ".photosliderinfo" ).html('Add photos to your profile below');
  
      myswiperphotos = myApp.swiper('.container-photos', {
    pagination:'.swiper-pagination',
     paginationType:'progress',
         onInit:function(swiper){$( ".photoswiperloader" ).hide();},
      direction:'vertical'
  });
  }
  
   
   
  
  });
  
      }).catch(function(error) {
  // Handle error
});
  
  }


	
if (photosloaded === true){myswiperphotos.update();}
    
photosloaded = true;
	
}

function deleteIndividual(){
if (sexuality){processUpdate();  myApp.sizeNavbars();  }

if ($( ".photosliderinfo" ).hasClass('pictures')){

    myApp.confirm('Are you sure?', 'Delete Photo', function () {
       

       
       myswiperphotos.removeSlide(myswiperphotos.clickedIndex);
       f_largeurls.splice(myswiperphotos.clickedIndex, 1);
f_smallurls.splice(myswiperphotos.clickedIndex, 1);
addedwidth.splice(myswiperphotos.clickedIndex, 1);
addedheight.splice(myswiperphotos.clickedIndex, 1);
console.log(addedwidth);
console.log(addedheight);

         if (f_largeurls.length === 1){       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photo to your profile');
}
else{       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photos to your profile');
}
  
       deletedphoto = true;
       myswiperphotos.update();
       if (myswiperphotos.slides.length === 0){
       $( ".reorderbutton" ).addClass('disabled');
           $( ".deleteallbutton" ).addClass('disabled');

          $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?width=828\');background-size:cover;background-position:50% 50%;\');"></div>');
$( ".photosliderinfo" ).removeClass('pictures');

   $( ".photosliderinfo" ).html('Add photos to your profile below');

myswiperphotos.updatePagination();
myswiperphotos.update();
       }
       

    });
    }
    else {
    photosPopup();
    }

} 

function openAvaill(availtime){

if ($( '.li_'+ availtime ).hasClass('selecrec')){$( '.li_'+ availtime ).removeClass('selecrec');$( '.li_'+ availtime ).css('selecrec','');$( '#picker'+ availtime ).val('');}
else{$( '.li_'+ availtime ).addClass('selecrec');$( '#picker'+ availtime ).val('Now');}






}

function openAvail(availtime){


$( '.li_'+ availtime ).addClass('selecrec');





}

function removeAvail(availtime,availname,availnameonly){






$( '.li_'+ availtime ).removeClass('selecrec');
$('#picker'+availtime ).remove();

$('.readd_'+availtime ).append('<input type="text" placeholder="'+availname+'" readonly id="picker'+availtime+'" style="height:44px;text-align:center;margin-top:-10px;font-size:17px;color:white;"></li>');


myApp.picker({
    input: '#picker' + availtime,
                 onOpen: function (p){if (sexuality){processUpdate();  myApp.sizeNavbars();  }},
    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeAvail(\''+availtime+'\',\''+availname+'\',\''+availnameonly+'\');">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [


        {
            textAlign: 'left',
         
            values: (availnameonly + ',').split(',')
        },
        {
            textAlign: 'left',
         
            values: ('Anytime Morning Midday Afternoon Evening').split(' ')
        },

    ]
});  



}

var availarray = [];







function report(){




myApp.prompt('What is the problem?', 'Report '+targetname, function (value) {



if (value.length ===0){myApp.alert('You must provide a reason to report ' + targetname, 'What is the problem?');return false;}

targetreported = true;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);



var targetData = {
   from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
	to_picture:targetpicture,
	   from_picture:f_image,
    message:value,
    response:'N',
    timestamp: t_unix,
   };

  
    var updates = {};
  updates['reports/' + f_uid + '/' + targetid + '/' + newPostKey] = targetData;




if (f_uid == first_number){
firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   firstnumberreport:newPostKey,
   firstnumberreporttime:t_unix
  });
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   firstnumberreport:newPostKey,
   firstnumberreporttime:t_unix
  });
}
else{
firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   secondnumberreport:newPostKey,
   secondnumberreporttime:t_unix
  });
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   secondnumberreport:newPostKey,
   secondnumberreporttime:t_unix
  });
}

  return firebase.database().ref().update(updates).then(function() {
 myApp.alert('We will review your report. We encourage you to block offensive users.', 'Report sent');});



});

$(".modal-text-input").prop('maxlength','50');

}

function more(){
var swiperno = 0;


 myApp.confirm('Are you sure?', 'Block '+targetname, function () {
        
        
              var blockindex = myPhotoBrowser.swiper.activeIndex;
	 
	  targetid = new_all[blockindex].id;

	 myPhotoBrowser.swiper.removeSlide(blockindex);
            myPhotoBrowser.swiper.updateSlidesSize();
	 
	 swiperQuestions.removeSlide(blockindex);
            swiperQuestions.updateSlidesSize();
	 
	 
	 new_all = new_all.slice(0,blockindex).concat(new_all.slice(blockindex+1));

	 if (new_all.length>0){
		for (var i = 0; i < random_all.length; i++) {
if (random_all[i].id == targetid){ 

randomswiper.removeSlide(i);  
randomswiper.updateSlidesSize();
	random_all = random_all.slice(0,i).concat(random_all.slice(i+1));
}
}

	 for (var i = 0; i < nearby_all.length; i++) {
if (nearby_all[i].id == targetid){ 
nearbyswiper.removeSlide(i);  
nearbyswiper.updateSlidesSize();
	nearby_all = nearby_all.slice(0,i).concat(nearby_all.slice(i+1));
}
}

	 	 for (var i = 0; i < recent_all.length; i++) {
if (recent_all[i].id == targetid){ 
recentswiper.removeSlide(i);  
recentswiper.updateSlidesSize();
	recent_all = recent_all.slice(0,i).concat(recent_all.slice(i+1));

}
}
	 }
	 
	 else {

	 	randomswiper.removeAllSlides();
nearbyswiper.removeAllSlides();
recentswiper.removeAllSlides();
randomswiper.destroy();
nearbyswiper.destroy();
recentswiper.destroy();

		new_all = [];
random_all = [];
nearby_all = [];
recent_all = [];
	 }

	 

var firstpos;
var lastpos;






             myApp.closeModal('.actions-modal');
     
                        allowedchange = false;


		  
		 
 

   
  
	 
       var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}



var theirnotifs = firebase.database().ref('notifications/' + targetid  + '/' + f_uid);
theirnotifs.remove().then(function() {
    console.log("their notifs Remove succeeded.")
  })
  .catch(function(error) {
    console.log("their notifs failed: " + error.message)
  });
  
  var mynotifs = firebase.database().ref('notifications/' + f_uid  + '/' + targetid);
mynotifs.remove().then(function() {
    console.log("my notifs Remove succeeded.")
  })
  .catch(function(error) {
    console.log("my notifs failed: " + error.message)
  });

var theirdates = firebase.database().ref('dates/' + targetid  + '/' + f_uid);
theirdates.remove().then(function() {
    console.log("their dates Remove succeeded.")
  })
  .catch(function(error) {
    console.log("their dates failed: " + error.message)
  });
  
  var mydates = firebase.database().ref('dates/' + f_uid  + '/' + targetid);
mydates.remove().then(function() {
    console.log("my dates Remove succeeded.")
  })
  .catch(function(error) {
    console.log("my dates failed: " + error.message)
  });

var ourchats = firebase.database().ref('chats/' + first_number + '/' + second_number);
ourchats.remove().then(function() {
    console.log("Chats Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Chats Remove failed: " + error.message)
  });
  
var ourphotochats = firebase.database().ref('photochats/' + first_number + '/' + second_number);
ourphotochats.remove().then(function() {
    console.log("PhotoChats Remove succeeded.")
  })
  .catch(function(error) {
    console.log("PhotoChats Remove failed: " + error.message)
  });

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;



firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   secondnumberblock:'Y',
   created:f_uid,
   received:targetid,
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
    secondnumberdate:'N',
   secondnumberduck:'N',
    firstnumberdate:'N',
   firstnumberduck:'N'
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
    secondnumberblock:'Y',
   created:f_uid,
   received:targetid,
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
    firstnumberdate:'N',
   firstnumberduck:'N'
  });

}
else {first_number = f_uid;second_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   firstnumberblock:'Y',
   created:f_uid,
   received:targetid,
   first_number:first_number,
   second_name:targetname,
   second_number:second_number,
   first_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
    firstnumberdate:'N',
   firstnumberduck:'N'
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
    firstnumberblock:'Y',
   created:f_uid,
   received:targetid,
   first_number:first_number,
   second_name:targetname,
   second_number:second_number,
   first_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
    firstnumberdate:'N',
   firstnumberduck:'N'
  });


}


if (new_all.length>1){	 
	
		 if (blockindex == (new_all.length-1)){lastpos = 'Y';} else {lastpos ='N';}
if (blockindex == 0){firstpos = 'Y';} else{firstpos ='N';}
	
 if (firstpos == 'Y'){myPhotoBrowser.swiper.slideNext();allowedchange = true;myPhotoBrowser.swiper.slidePrev();swiperQuestions.slideNext();swiperQuestions.slidePrev();  }
else if  (lastpos == 'Y'){myPhotoBrowser.swiper.slidePrev();allowedchange = true;myPhotoBrowser.swiper.slideNext();swiperQuestions.slidePrev();swiperQuestions.slideNext();  }
else {myPhotoBrowser.swiper.slideNext();allowedchange = true;myPhotoBrowser.swiper.slidePrev();swiperQuestions.slideNext();swiperQuestions.slidePrev(); }
}	 

	
            
    
    //myPhotoBrowser.swiper.slideTo(blockindex);          







  
 // console.log(all_matches_photos[swipertarget]);     
   //    console.log(new_all); 
  
  
if (new_all.length === 0){

	myPhotoBrowser.close();myApp.closeModal();
 $( ".home-title" ).hide(); 
 $( ".results-loader" ).hide();
    

	$('.content-here').append(
    '<div class="no-results-div" style="background-color:white;z-index:30000000;text-align:center;margin:0 auto;width:300px;position:absolute;top:50%;left:50%;margin-left:-150px;margin-top:-70px;">'+
    
    '<img src="media/datetongue.png" onload="showtext()" style="width:120px;margin:0 auto;">'+
    
   '<div style="display:none;" class="showtext"><h3>No one found nearby</h3><p style="padding-top:0px;margin-top:-10px;">Try changing your search radius </br> or age range.</p></br></div>'+



   
    '</div>');
	  
		  

}
             

       // myPhotoBrowser.swiper.slideTo(blockindex);

	 if (new_all.length===1){
	$( ".availyo_"+ new_all[0].id ).show();	  

		  
$( ".photo-browser-caption" ).empty();
 $( ".nametag" ).empty();




$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );
 //$( ".photo-browser-slide.swiper-slide-active img" ).css( "height", "100% - 144px)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();

$( ".toolbardecide" ).show();



$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );

var targetdescription= new_all[0].description;
targetname = new_all[0].name;  
var targetage = new_all[0].age;  
  $( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+targetname+', '+targetage+'</span>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(targetdescription);
    myApp.sizeNavbars();



		
 

   
  }
        
 if (new_all.length>0){
	 checkMatch(targetid);

		      }
	 
	 
    });


 	 


    
}
var canscrollnotif = true;
function scrollNotifications(){

//console.log($( ".virtual-notifications" ).height() + $( ".virtual-notifications" ).offset().top);
if ((($( ".virtual-notifications" ).height() + $( ".virtual-notifications" ).offset().top) - 1 < $( document ).height())&& (canscrollnotif)) {
if (notifletsload < 12){$( "#notiflistdiv" ).append('<div class="loadnotifsloader" style="clear:both;width:100%;padding-top:5px;padding-bottom:5px;background-color:#efeff4;clear:both;"><div class="preloader " style="width:20px;margin:0 auto;margin-top:5px;margin-left:125px;"></div></div>');canscrollnotif = false;var objDiv = document.getElementById("notiflistdiv");
objDiv.scrollTop = objDiv.scrollHeight;
setTimeout(function(){ $( ".loadnotifsloader" ).remove();objDiv.scrollTop = objDiv.scrollHeight-44;}, 2000);
}
else{$( "#notiflistdiv" ).append('<div style="clear:both;width:100%;padding-top:5px;padding-bottom:5px;background-color:#efeff4;clear:both;" class="loadnotifsloader"><div class="preloader" style="width:20px;margin:0 auto;margin-top:5px;margin-left:125px;"></div></div>');canscrollnotif = false;var objDiv = document.getElementById("notiflistdiv");
objDiv.scrollTop = objDiv.scrollHeight;setTimeout(function(){ getmoreNotifs();}, 2000);}
}
}



function scrollMessages(){


if ((($( ".scrolldetect" ).offset().top) == 120) && (canloadchat)) {if (letsload < 20 || existingmessages < 20){$( ".scrolldetect" ).prepend('<div class="preloader loadmessagesloader" style="width:20px;margin:0 auto;margin-top:10px;"></div>');canloadchat = false;setTimeout(function(){ $( ".loadmessagesloader" ).hide(); }, 500);}else{$( ".scrolldetect" ).prepend('<div class="preloader loadmessagesloader" style="width:20px;margin:0 auto;margin-top:10px;"></div>');canloadchat = false;setTimeout(function(){ getPrevious(); }, 500);}}
}

function showDecide(){

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
$( ".toolbardecide" ).show();
    
} 

function closeCreate(){
	myApp.closeModal('.actions-modal');
myApp.closeModal('.chatpop');
   singlefxallowed = true;
}



function createDate(messageid,messagename,redirect){
if (redirect===0) {}
else {   if ($('.chatpop').length > 0){return false;}}

	var centerdiv;

	
	
	
	if (messageid) {targetid = messageid;}
if (messagename) {targetname = messagename;}
	
singleUser(targetid,targetname,88);



existingchatnotifications = firebase.database().ref("notifications/" + f_uid).once("value", function(snapshot) {
var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){

$.each(objs, function(i, obj) {
   

   if ((obj.to_uid == f_uid) && (obj.from_uid == targetid) && (obj.received=='N')){

	   cordova.plugins.notification.badge.get(function (badge) {
	   var newcount = badge-obj.new_message_count;
	   if (newcount < 1){


$( ".notifspan" ).hide();
	   }
		   
		   else {
		   	    $( ".notifspan" ).show();
$( ".notifspan" ).addClass('notifbounce');
setTimeout(function(){ $( ".notifspan" ).removeClass('notifbounce'); }, 5000);
		   }
	   
	   });
	   
alert('obj.new_message_count' + obj.new_message_count);
    
	   
	   
       firebase.database().ref('notifications/' +f_uid + '/' + targetid).update({
    received:'Y',
    new_message_count:'0',
        authcheck:f_uid,
        uid_accepted:f_uid
  });
  
  firebase.database().ref('notifications/' +targetid + '/' + f_uid).update({
    received:'Y',
    new_message_count:'0',
        authcheck:f_uid,
        uid_accepted:f_uid
  });
    
   
   }
});  
}

});


	
if (messageid) {centerdiv = '<div class="center center-date" onclick="singleUser(\''+targetid+'\',\''+targetname+'\')" style="cursor:pointer;"><div class="navbarphoto"></div>'+targetname+'</div>';}
else{centerdiv = '<div class="center center-date close-popup" onclick="clearchatHistory();"><div class="navbarphoto"></div>'+targetname+'</div>';}
var divcentrecontent;
	if (redirect === 0){divcentrecontent='<div class="center center-date" onclick="singleUser(\''+targetid+'\',\''+targetname+'\')" style="cursor:pointer;color:white;"><div class="navbarphoto"></div>'+targetname+'</div>';}
	else {divcentrecontent='<span id="centerholder" style="color:white;z-index:99999999999999999999999999999999;color:white;"></span>';}


var popupHTML = '<div class="popup chatpop">'+



'<div class="navbar" style="background-color:#2196f3;">'+
 '   <div class="navbar-inner">'+
  '      <div class="left">'+
  

  
  '<a href="#" class="link icon-only date-back" onclick="closeCreate()" style="margin-left:-10px;color:white;">    <i class="pe-7s-angle-left pe-3x"></i>   </a>'+
      '<a href="#" class="link icon-only date-close" onclick="reverseRequest();" style="color:white;font-weight:bold;display:none;margin-left:-10px;">  <i class="pe-7s-angle-left pe-3x"></i>  </a>'+
      '<a href="#" class="link icon-only date2-close" onclick="noChange();" style="color:white;display:none;font-weight:bold;margin-left:-10px;">  <i class="pe-7s-angle-left pe-3x"></i>  </a>'+
      '<a href="#" class="link icon-only date1-close" onclick="reverseRequest();dateConfirmationPage();" style="color:white;display:none;font-weight:bold;margin-left:-10px;">  <i class="pe-7s-angle-left pe-3x"></i>  </a>'+

 


  '</div>'+

   divcentrecontent+
    '    <div class="right" onclick="actionSheet()" style="font-size:14px;">'+   
    


       '<a href="#" class="link">'+
        
        '    <i class="pe-7s-more pe-lg matchcolor" style="color:white"></i>'+
     
       ' </a></div>'+
    
    
     '</div>'+
    

    
'</div>'+

  

'<div class="pages" style="margin-top:-44px;">'+
'<div data-page="datepopup" class="page">'+
'<div class="toolbar messagebar datetoolbar" style="display:none;background-color:red;">'+


' <div class="toolbar-inner yes-inner" style="background-color:rgba(247, 247, 248,0.9);margin-top:-10px;height:54px;padding-bottom:10px;display:none;text-align:center;">'+
                                              '<a href="#" onclick="cancelDate()" class="link" style="height:44px;color:white;background-color:#ff3b30;width: 33%;"><span style="margin: 0 auto;">Cancel</span></a>'+
                                              '<a href="#" onclick="request()" class="link" style="height:44px;color:white;background-color:#2196f3;width:33%;"><span style="margin: 0 auto;">Change</span></a>'+

                       '<a href="#" onclick="acceptDate()" class="link" style="height:44px;color:white;background-color:#4cd964;width:33%;"><span style="margin: 0 auto;">Confirm</span></a>'+
                       
  '</div>'+
  

  
 ' <div class="toolbar-inner sender-inner" style="background-color:rgba(247, 247, 248,0.9);margin-top:-10px;height:54px;padding-bottom:10px; display:none;text-align:center;">'+
                       '<a href="#" onclick="cancelDate()" class="link" style="height:44px;color:white;background-color:#ff3b30;width: 50%;"><span style="margin: 0 auto;">Cancel</span></a>'+
                       '<a href="#" onclick="request()" class="link" style="height:44px;color:white;background-color:#2196f3;width: 50%;"><span style="margin: 0 auto;">Change</span></a>'+

  '</div>'+




 ' <div class="toolbar-inner date-inner" style="padding-left:0px;padding-right:0px;display:none;text-align:center;background-color:#2196f3;">'+
'<input id="datemessageq" placeholder="Message (optional)" style="width: calc(100% - 70px);margin-left:5px;background-color:white;max-height:44px;" type="text">'+ 
'<a href="#" style="z-index:99999999;height:44px;color:white;background-color:#2196f3;float:left;line-height:44px;width:70px;" onclick="processDupdate();"><span style="margin: 0 auto;padding-right:10px;padding-left:10px;">Send</span></a>'+

  
    
    '</div>'+

 ' <div class="toolbar-inner message-inner" style="display:none;background-color:#2196f3;padding-left:0px;padding-right:0px;">'+
  '<a href="#" class="link icon-only" style="margin-left:5px;"><i class="pe-7s-camera pe-lg" style="color:white;font-size:28px;"></i><i class="twa twa-bomb" style="z-index:999;margin-left:-10px;margin-top:-15px;"></i></a> <input type="file" size="70" accept="image/*" class="dealPictureField imagenotchosen" id="takePictureField_" onchange="getPicture();" style="background-color:transparent;color:transparent;float:left;cursor: pointer;height:54px;width:50px;z-index:1;opacity:0;background-color:red;margin-top:-12px;margin-left:-50px;"><input id="messagearea" type="text" placeholder="Enter Message"><a href="#" class="link sendbutton" style="color:white;margin-right:10px;margin-left:10px;" onclick="sendMessage();">Send</a>'+
  '</div>'+
'</div>'+  
        '<div class="datedetailsdiv date-button" onclick="noMessages();setDate();dateConfirmationPage(1);" style="display:none;position:absolute;top:44px;text-align:center;height:44px;width:100%;z-index:999999;">'+
        
        
        
        '</div>'+
  '<div class="page-content messages-content" onscroll="scrollMessages();" id="messagediv" style="background-color:#f7f7f8">'+





                '<span class="preloader login-loader messages-loader" style="width:42px;height:42px;position:absolute;top:50%;margin-top:-21px;left:50%;margin-left:-21px;"></span>'+
    '<div class="datearea" style="text-align:center;"></div>'+


    '<div class="messages scrolldetect"  style="margin-top:100px;">'+






'</div></div></div>'+

'</div></div>';
myApp.popup(popupHTML);

   
var closedvar = $$('.chatpop').on('popup:close', function () {
clearchatHistory();
});

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

datealert = firebase.database().ref("dates/" + f_uid +'/' + targetid).on('value', function(snapshot) {





var dateexists = snapshot.child('chat_expire').exists(); // true
    
    if (dateexists) {
   

   
 var unix = Math.round(+new Date()/1000);
  if (Number(snapshot.child('chat_expire').val()) > Number(unix) ) {
      
      d_type = snapshot.child('type').val();
      d_chat_expire = snapshot.child('chat_expire').val();
       d_interest = snapshot.child('interest').val();
      d_day = snapshot.child('day').val();
      d_time = snapshot.child('time').val();
      d_response = snapshot.child('response').val();
      if (snapshot.child('time_accepted').exists()){ d_timeaccepted = snapshot.child('time_accepted').val();}
     
      d_created_uid = snapshot.child('created_uid').val();
      d_timestamp = snapshot.child('timestamp').val();

      d_dateseen = snapshot.child('dateseen').val();
      d_dateseentime = snapshot.child('dateseentime').val();
      d_message = snapshot.child('message').val();
      
      var newtonight = new Date();
newtonight.setHours(23,59,59,999);
var newtonight_timestamp = Math.round(newtonight/1000);
     

      
 

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var chatdaystring;

var expiredateobject = new Date((d_chat_expire * 1000) - 86400);


var unixleft = d_chat_expire - newtonight_timestamp;

var daysleft = unixleft / 86400;

console.log('daysleft' + daysleft);

var weekdaynamew = weekday[expiredateobject.getDay()];

if(daysleft <= 0){chatdaystring = 'Today';}
else if(daysleft === 1){chatdaystring = 'Tomorrow';}
else chatdaystring = weekdaynamew;

console.log(unixleft);
console.log(daysleft);
var hoursleft = unixleft / 3600;
var salut;
if (daysleft <=0){

salut='tonight';
}
else if (daysleft ==1) {salut = 'in ' + Math.round(daysleft)+' day';}
else{salut = 'in ' + daysleft+' days';}

var aftertag;




      $( ".datedetailsdiv" ).empty();
      
       $( ".datedetailsdiv" ).append('<div class="list-block media-list" style="margin-top:0px;border-bottom:1px solid #c4c4c4;">'+
   '<ul style="background-color:#4cd964">'+
        '<li>'+
          ' <div class="item-content" style="padding-left:15px;">'+
     '<div class="item-media">'+
                    '<img src="media/'+d_type+'faceonly.png" style="height:36px;">'+
                '</div>'+
     
                '<div class="item-inner">'+
                 '   <div class="item-title-row">'+
                   '     <div class="item-title" style="font-size:15px;color:white;">See you <span class="chatdaystringdiv">'+chatdaystring+'</span><span class="chatafternavbar"></span></div>'+
                    '     <div class="item-after" style="margin-top:-10px;margin-right:-15px;color:white;"><i class="pe-7s-angle-right pe-3x"></i></div>'+
                   ' </div>'+
                   '<div class="item-subtitle" style="font-size:12px;text-align:left;color:white;">Chat will end '+salut+' (at midnight)</div>'+
              //      '<div class="item-text">Additional description text</div>'+
                '</div>'+
            '</div>'+
        '</li>'+
    '</ul>'+
'</div> ' );

if (d_time){

var lowertime = d_time.toLowerCase()

if (chatdaystring == 'today'){$( ".chatdaystringdiv").empty();$( ".chatafternavbar").append('this ' + lowertime);}
else {
$( ".chatafternavbar").append(' ' + d_time);}
}

//if (d_interest && d_type =='duck'){
 //   if ((d_interest == 'my') && (d_created_uid == f_uid)){aftertag = 'At '+f_first+'\'s place';}

 //       if ((d_interest == 'your') && (d_created_uid == f_uid)){aftertag = 'At '+targetname+'\'s place';}   
//}
//if (d_interest && d_type =='date'){
//for (i = 0; i < d_interest.length; i++) { 
    
 // $( ".chatafternavbar").append('<a href="#" style="margin-left:5px"><i class="twa twa-'+d_interest[i]+'" style="margin-top:5px;margin-right:5px"></i></a>');    
//}
//}
      
      if (d_response == 'Y') {chatShow();}
      else {
          
          noMessages();
          setDate();
          
    
          
        dateConfirmationPage();
          
       
          
      }
      
      
     
      $( ".messages-loader" ).hide();
      }
 else{
    
     
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
         d_timeaccepted = false;
         d_timestamp = false;
         d_message = false;

      d_dateseen = false;
      d_dateseentime = false;

    
     
     
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
else {}



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
'<div class="nomessages" style="margin:0 auto;margin-top:44px;text-align:center;background-color:white;">'+



//'<div class="profileroundpic" style="margin:0 auto;margin-top:5px;height:70px;width:70px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+targetid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+
       
       '<div class="dateheader" style="display:none;background-color:#ccc;padding:11px;text-align:center;font-size:20px;color:white;font-family: \'Pacifico\', cursive;"></div>'+



	


'<div class="requesticon" style="padding-top:20px;"></div>'+


	
'<a href="#" onclick="request()" class="button dr requestbutton" style="width:150px;margin: 0 auto;margin-top:10px;font-family: \'Pacifico\', cursive;font-size:20px;"></a>'+

		'<div class="dr infop" style="padding:10px;background-color:white;color:#666;"><h3 class="titleconfirm" style="margin-top:10px;display:none;"></h3><p class="infoconfirm">Once you agree on a time to meet you can send instant chat messages to each other.</p></div>'+

'<div class="waitingreply"></div>'+

'<div id="createdatepicker" style="clear:both;border-bottom:1px solid #c4c4c4;margin-top:10px;"></div>'+



'<div class="row date-row" style="display:none;clear:both;margin-top:5px;padding:10px;background-color:#white;">'+

'   <div class="col-16.67 coffee_i interestbutton" onclick="interests(\'coffee\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-coffee" style="margin-top:5px;"></i></div>'+
      '  <div class="col-16.67 beers_i interestbutton" onclick="interests(\'beers\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-beers" style="margin-top:5px;"></i></div>'+
       ' <div class="col-16.67 wine-glass_i interestbutton" onclick="interests(\'wine-glass\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-wine-glass" style="margin-top:5px;"></i></div>'+
      ' <div class="col-16.67 movie-camera_i interestbutton" onclick="interests(\'movie-camera\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-movie-camera" style="margin-top:5px;"></i></div>'+
      ' <div class="col-16.67 tada_i interestbutton" onclick="interests(\'tada\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-tada" style="margin-top:5px;"></i></div>'+
       ' <div class="col-16.67 fork-and-knife_i interestbutton" onclick="interests(\'fork-and-knife\');" style="cursor:pointer;border-radius:5px;"><i class="twa twa-2x twa-fork-and-knife" style="margin-top:5px;"></i></div>'+

'</div>  '+

'<div class="row duck-row" style="display:none;clear:both;margin-top:10px;">'+


        '<div class="buttons-row" style="width:100%;padding-left:10px;padding-right:10px;">'+
           ' <a href="#tab1" class="button button-big button-place button-my" onclick="duckClass(1);">My Place</a>'+
            '<a href="#tab2" class="button button-big button-place button-your" onclick="duckClass(2);">Your Place</a>'+
        '</div>'+


'</div>  '+


'<div class="profileyomain profileyo_'+ targetid+'" style="border-top:1px solid #c4c4c4;"></div>'+
             '<span class="preloader preloader-white avail-loader" style="margin-top:20px;clear:both;margin-bottom:10px;"></span>'+



'</div>');


	
if (d_type == 'date') {$( ".requesticon" ).empty();$( ".requesticon" ).append(flargedateicon);$( ".requestbutton" ).text('Request Date');$( ".dateheader" ).text('Let\'s Date');}
if (d_type == 'duck') {$( ".requesticon" ).empty();$( ".requesticon" ).append(flargeduckicon);$( ".requestbutton" ).text('Request Duck');$( ".dateheader" ).text('Let\'s Duck');}
}


function setDate(){
var dateset = 'N';
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
alldays_values.push(tonight_timestamp - 1);
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
                 onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");},
    toolbar:false,
onChange:function(p, value, displayValue){
setTimeout(function(){

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



    if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Morning') && (unixnow>middaystamp_timestamp)){pickerCustomToolbar.cols[1].setValue('');}
        if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Mid-day') && (unixnow>threestamp_timestamp)){pickerCustomToolbar.cols[1].setValue('');}
                if ((pickerCustomToolbar.cols[0].displayValue == 'Today') && (pickerCustomToolbar.cols[1].displayValue == 'Afternoon') && (unixnow>fivestamp_timestamp)){pickerCustomToolbar.cols[1].setValue('');}


}, 1000);
	
	
    if (p.cols[0].displayValue == 'Now' && (dateset == 'Y')){p.cols[1].setValue('');}

},
 
    cols: [
        {
            displayValues: alldays_names,
              values: alldays_values,
        },
        {
            textAlign: 'left',
            values: (' Morning Afternoon Midday Evening').split(' ')
        },
    ]
});          



var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


var ref = firebase.database().ref("dates/" + f_uid +'/' + targetid);


ref.once("value")
  .then(function(snapshot) {
  var dateexists = snapshot.child('chat_expire').exists(); // true



if (dateexists){
var timecol = pickerCustomToolbar.cols[1];
timecol.setValue(snapshot.child('time').val());
var daycol = pickerCustomToolbar.cols[0];
daycol.setValue(snapshot.child('chat_expire').val());
}
dateset = 'Y';

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

if ($( ".duckbutton" ).hasClass( "active" )&& $( ".duckbutton" ).hasClass( "likesme" )){unmatchNotif();}



if (
    
$( ".datebutton" ).hasClass( "active" )){$( ".datebutton" ).removeClass( "active" );
$( ".notifback" ).show();
$( ".mainback" ).hide();


if ($( ".datebutton" ).hasClass( "likesme" )){unmatchNotif();}


removetoDate();



}
else{



if ($( ".datebutton" ).hasClass( "likesme" )){matchNotif();}

//clicked date
$( ".datebutton" ).addClass( "active" );$( ".duckbutton" ).removeClass( "active" );

addtoDate();
}



}

function addtoDate(){

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'Y',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });
  
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'Y',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}
else {first_number = f_uid;second_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberdate:'Y',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
    second_name:targetname,
   firstnumberdate:'Y',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });
  
}

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
if ($('.photo-browser-slide').length > 1){
var potentialdate = f_date_me.indexOf(targetid);
if (potentialdate == -1) { myPhotoBrowser.swiper.slideNext(true,1000);

			  

			  
if ($('.infopopup').length > 0) {
if(swiperQuestions){comingback = 0; swiperQuestions.slideNext();comingback=1;}}
}
}



//if button has blue border change the color

}





function removetoDate(){

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });

firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}
else {first_number = f_uid;second_number = targetid;



firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
   first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();


$( ".toolbardecide" ).show();



}

function duckUser(){
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );



if ($( ".datebutton" ).hasClass( "active" ) && $( ".datebutton" ).hasClass( "likesme" )){unmatchNotif();}
if (
    
$( ".duckbutton" ).hasClass( "active" )){$( ".duckbutton" ).removeClass( "active" );

if ($( ".duckbutton" ).hasClass( "likesme" )){unmatchNotif();}
$( ".notifback" ).show();
$( ".mainback" ).hide();
removetoDuck();
}
else{

if ($( ".duckbutton" ).hasClass( "likesme" )){matchNotif();}

//clicked duck
$( ".duckbutton" ).addClass( "active" );$( ".datebutton" ).removeClass( "active" );
addtoDuck();

}
}

function removetoDuck(){



   

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   first_number:first_number,
    first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });

firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}
else {first_number = f_uid;second_number = targetid;

   

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
   first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}

$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();


$( ".toolbardecide" ).show();



}

function markMe(){

var mearray = ["4"];

firebase.database().ref('users/' + f_uid).update({
   //add this user to my list
   date_me:mearray
  });
    
}
function addtoDuck(){


 

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
   first_number:first_number,
   first_name:targetname,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberduck:'Y',
   secondnumberdate:'N',
   created:f_uid,
   received:targetid
  });
  
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
   first_number:first_number,
    first_number:first_number,
   second_number:second_number,
   second_name:f_name.substr(0,f_name.indexOf(' ')),
   secondnumberduck:'Y',
   secondnumberdate:'N',
   created:f_uid,
   received:targetid
  });

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
}
else {first_number = f_uid;second_number = targetid;

firebase.database().ref('matches/' + f_uid + '/' + targetid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberduck:'Y',
   firstnumberdate:'N',
   created:f_uid,
   received:targetid
  });
  
  firebase.database().ref('matches/' + targetid + '/' + f_uid).update({
   //add this user to my list
    first_number:first_number,
    first_name:f_name.substr(0,f_name.indexOf(' ')),
   second_number:second_number,
   second_name:targetname,
   firstnumberduck:'Y',
   firstnumberdate:'N',
   created:f_uid,
   received:targetid
  });
  
}

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
if ($('.photo-browser-slide').length > 1){
var potentialduck = f_duck_me.indexOf(targetid);
if (potentialduck == -1) { myPhotoBrowser.swiper.slideNext(true,1000);

if ($('.infopopup').length > 0) {
if(swiperQuestions){comingback = 0; swiperQuestions.slideNext();comingback=1;}}}
}

}

var singleuserarray = [];
function singleUser(idw,idname,origin){

   

  

if (singleuserarray[0] != null){

$(".avail-loader").hide();
 if (singleuserarray[0].availarraystring !== ''){
	 
	 
	 
  $(".availabilitylistblock_"+singleuserarray[0].id).remove();
	 $(".availtitle").remove();
	 $( ".profileyo_" + singleuserarray[0].id ).append(
    '<div class="content-block-title availtitle" style="padding-top:0px;clear:both;margin-top:15px;">'+targetname+'\'s Availability</div>'+

'<div class="list-block media-list availabilitylistblock_'+singleuserarray[0].id+'" style="z-index:99999999999999;margin-top:0px;clear:both;margin-bottom:-40px;width:100%;">'+
    '<ul style="background-color:transparent" style="width:100%;">'+


  
 
'    </ul></div>');
  
  var availablearrayindividual = JSON.parse(singleuserarray[0].availarraystring);


var tonight = new Date();
tonight.setHours(22,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);




 for (k = 0; k < availablearrayindividual.length; k++) { 



if (availablearrayindividual[k].id >= tonight_timestamp){



$( ".availabilitylistblock_"+singleuserarray[0].id ).append(

	
	
       ' <li style="list-style-type:none;width:100%;" onclick="request(\''+availablearrayindividual[k].id+'\',\''+availablearrayindividual[k].time+'\')">'+
       '<div class="item-content">'+
'<i class="pe-7s-angle-right pe-3x" style="position:absolute;right:5px;color:#007aff;"></i>'+

      '<div class="item-media">'+
                 '<span class="badge" style="background-color:#4cd964;">'+availablearrayindividual[k].day.charAt(0)+'</span>'+
                '</div>'+
       ' <div class="item-inner">'+
	'  <div class="item-input">'+

          '    <input type="text" name="name" style="height:30px;font-size:15px;" value="'+availablearrayindividual[k].day+', '+availablearrayindividual[k].time+'" readonly>'+
                    '    <input type="text" style="float:right;color:#333;text-align:left;height:30px;font-size:15px;" name="name" value="'+availablearrayindividual[k].fulldate+'" readonly>'+

         ' </div>'+
       ' </div>'+

    '</div></li>'
);
}
}  
   
   }

if (origin){photoBrowser(0,singleuserarray[0].age,1,1);}
else{photoBrowser(0,singleuserarray[0].age);}



}

else{

      if (singlefxallowed === false){alert('33.5');return false;}
singlefxallowed = false;


targetid = String(idw);
	
firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/singleuser.php", {projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:targetid,latitudep:latitudep,longitudep:longitudep} )
  .done(function( data ) {


	console.log(data);
  var result = JSON.parse(data); 

	
	
var availarraystring='';


var availnotexpired = false;

var tonight = new Date();
tonight.setHours(22,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);

if(result[0].availstring && (result[0].availstring != '[]') && (result[0].uid != f_uid)){


  var availablearrayindividual = JSON.parse(result[0].availstring);


 for (k = 0; k < availablearrayindividual.length; k++) { 
if (availablearrayindividual[k].id >= tonight_timestamp){availnotexpired = true;}

}  

if (availnotexpired){availarraystring = result[0].availstring;}



}  



var timestampyear = result[0].timestamp.substring(0,4);
var timestampmonth = result[0].timestamp.substring(5,7);
var timestampday = result[0].timestamp.substring(8,10);



var timestamphour = result[0].timestamp.substring(11,13);
var timestampminute = result[0].timestamp.substring(14,16);
var timestampsecond = result[0].timestamp.substring(17,20);






var timestampunix=(new Date(timestampmonth + '/' + timestampday + '/' + timestampyear + ' ' + timestamphour + ':' + timestampminute + ':' + timestampsecond)).getTime() / 1000 + 64800;


 var d_unix = Math.round(+new Date()/1000);

var diff = (d_unix - timestampunix)/60;  
  
  

var photosstringarray =[];
var photocount;
var photostring;
var profilepicstring;
var photoarrayuserlarge;
var photoarrayusersmall;
if(result[0].largeurl){



var heightarray = result[0].heightslides.split(",");
var widtharray = result[0].widthslides.split(",");





photostring = '<div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical" style="height:100%;"><img data-src="' + result[0].largeurl + '" class="swiper-lazy"></div></div>';



photocount = result[0].largeurl.split(",").length;
photoarrayuserlarge = result[0].largeurl.split(",");
photoarrayusersmall = result[0].smallurl.split(",");



profilepicstringlarge = photoarrayuserlarge[0];
profilepicstringsmall = photoarrayusersmall[0];
	targetpicture = photoarrayuserlarge[0];
$( ".navbarphoto" ).html('	<div style="width:29px;height:29px;border-radius:50%;background-image:url(\''+profilepicstringlarge+'\');background-size:cover;background-position:50% 50%;margin-right:5px;"></div>');

	
photostring=photostring.replace(/,/g, '" class="swiper-lazy" style="height:100%;"></div></div><div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical"><img data-src="')



}
else{

photostring = '<div class="swiper-slide"><div class="swiper-zoom-container zoom-vertical"><img data-src="https://graph.facebook.com/'+targetid+'/picture?width=828" class="swiper-lazy" style="height:100%;"></div></div>';

profilepicstringlarge = 'https://graph.facebook.com/'+targetid+'/picture?width=828&height=828';
profilepicstringsmall = 'https://graph.facebook.com/'+targetid+'/picture?width=368&height=368';
$( ".navbarphoto" ).html('	<div style="width:29px;height:29px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+targetid+'/picture?width=100&height=100\');background-size:cover;background-position:50% 50%;margin-right:5px;"></div>');
targetpicture = 'https://graph.facebook.com/'+targetid+'/picture?width=100&height=100';

photocount = 1;
}


var distance = parseFloat(result[0].distance).toFixed(1);
var distancerounded = parseFloat(result[0].distance).toFixed(0);
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



var namescount = result[0].displayname.split(' ').length;
var matchname;
if(namescount === 1){matchname = result[0].displayname;}
else {matchname = result[0].name.substr(0,result[0].displayname.indexOf(' '));}
  singleuserarray.push({widthslides:result[0].widthslides,heightslides:result[0].heightslides,availarraystring:availarraystring,minutes:diff,distancenumber:distance,distancestring:distancestring,photocount:photocount,photos:photostring,name:matchname,age:result[0].age,description:result[0].description,id:targetid,url:'https://graph.facebook.com/'+targetid+'/picture?width=828',caption:'...',industry: result[0].industry, status: result[0].status, politics:result[0].politics,eyes:result[0].eyes,body:result[0].body,religion:result[0].religion,zodiac:result[0].zodiac,ethnicity:result[0].ethnicity,height:result[0].height,weight:result[0].weight});
  

   
 // console.log(singleuserarray);
main_all = new_all;
new_all = singleuserarray;
$(".avail-loader").hide();
if (singleuserarray[0].availarraystring !== ''){
  $(".availabilitylistblock_"+singleuserarray[0].id).remove();
	 $(".availtitle").remove();
	 $( ".profileyo_" + singleuserarray[0].id ).append(
    '<div class="content-block-title availtitle" style="padding-top:0px;clear:both;margin-top:15px;">'+targetname+'\'s Availability</div>'+

'<div class="list-block media-list availabilitylistblock_'+singleuserarray[0].id+'" style="margin-top:0px;clear:both;margin-bottom:-40px;">'+
    '<ul style="background-color:transparent">'+


  
 
'    </ul></div>');
  
  var availablearrayindividual = JSON.parse(singleuserarray[0].availarraystring);


var tonight = new Date();
tonight.setHours(22,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);




 for (k = 0; k < availablearrayindividual.length; k++) { 



if (availablearrayindividual[k].id >= tonight_timestamp){



$( ".availabilitylistblock_"+singleuserarray[0].id ).append(

       ' <li style="list-style-type:none;" class="item-link item-content" onclick="request(\''+availablearrayindividual[k].id+'\',\''+availablearrayindividual[k].time+'\')">'+
     '<div class="item-content">'+
'<i class="pe-7s-angle-right pe-3x" style="position:absolute;right:5px;color:#007aff;"></i>'+

      '<div class="item-media">'+
                 '<span class="badge" style="background-color:#4cd964;">'+availablearrayindividual[k].day.charAt(0)+'</span>'+
                '</div>'+
       ' <div class="item-inner">'+
        '  <div class="item-input">'+

          '    <input type="text" name="name" style="height:30px;font-size:15px;" value="'+availablearrayindividual[k].day+', '+availablearrayindividual[k].time+'" readonly>'+
                    '    <input type="text" style="float:right;color:#333;text-align:left;height:30px;font-size:15px;" name="name" value="'+availablearrayindividual[k].fulldate+'" readonly>'+

         ' </div>'+
       ' </div>'+

    '</div>'+
	'</li>'
);
}
}  
   
   }
   
if (origin == 88){
   //alert('88');
}
else if (origin == 1){
   //alert('99');
   photoBrowser(0,singleuserarray[0].age,1,1);
}
else if (!origin){
   //alert('100');
   photoBrowser(0,singleuserarray[0].age);
}


  
  
  });
    });
}
}

function request(dayw,timeq){

   $( ".profileyomain" ).hide(); 
canloadchat = false;
$( '.picker-items-col-wrapper' ).css("width", "auto");

 $( ".requesticon" ).hide();
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
    if (d_response=='Y'){$( "#datemessageq" ).val('');}
       
     //  $( ".center-date" ).empty();
       
      // if (d_type=='date') {$( ".center-date" ).append('Date Details');}
     //  if (d_type=='duck') {$( ".center-date" ).append('Duck Details');}
         
          myApp.sizeNavbars();  
    
   
    
//$( "#createdatepicker" ).focus();
   $( ".page-content" ).animate({ scrollTop: 0 }, "fast");

	
	
if (dayw){
	

var daycol = pickerCustomToolbar.cols[0];
daycol.setValue(dayw);
	
if (timeq != 'Anytime'){

	
var timecol = pickerCustomToolbar.cols[1];
timecol.setValue(timeq);
}
}
	
	
}

function noChange(){
	myApp.closeModal('.actions-modal');
canloadchat = true;
$( ".sender-inner" ).hide();
 $( ".messages" ).show();
 $( ".date-close" ).hide();
  $( ".date2-close" ).hide();
  $( ".date1-close" ).hide();
  $( ".message-inner" ).show();
      $( ".date-inner" ).hide();
     // $( ".center-date" ).empty();
      $( "#createdatepicker" ).hide();
        // $( ".center-date" ).append(targetname);
  
          $( ".nomessages" ).hide();
          $( ".date-back" ).show();
          $( ".date-button" ).show();
          scrollBottom();
              myApp.sizeNavbars(); 
}

function reverseRequest(){
if ($('.availtitle').length > 0){$( ".datetoolbar" ).hide();}
	myApp.closeModal('.actions-modal');
	$( ".profileyomain" ).show();
$( ".dateheader" ).hide();
$( "#createdatepicker" ).hide();
    $( ".dr" ).show();
       $( ".date-back" ).show();
    $( ".date-row" ).hide();
    $( ".duck-row" ).hide();
$( ".date-close" ).hide();
 $( ".requesticon" ).show();
    

      $( ".date-inner" ).hide();

if (!d_day){

//$( ".center-date" ).empty();
  //        $( ".center-date" ).append(targetname);
          myApp.sizeNavbars();  
}
}





var message_count = 0;
var messages_loaded = false;
var conversation_started = false;
    var prevdatetitle;
function chatShow(){
	//fcm();
prevdatetitle = false;

    letsload = 20;
    canloadchat = true;
    additions = 0;
        $( ".yes-inner" ).hide();
                $( ".sender-inner" ).hide();
    
    $( ".datedetailsdiv" ).show();


    
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

//myMessagebar = myApp.messagebar('.messagebar', {
//  maxHeight: 200
//}); 
myMessages = myApp.messages('.messages', {
    autoLayout: true,
    scrollMessages:true
}); 

//if (myMessages) {myMessages.clean();}




if (message_history === true){}
if (message_history === false){

message_history = true;
//do the .on call here to keep receiving messages here
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


firebase.database().ref("chats/" + first_number+ '/' + second_number).once('value').then(function(snapshot) {
  
  existingmessages = snapshot.numChildren();
  
 // $( ".messages").append( '<a href="#" class="button scrollbutton" onclick="scrollBottom();" style="border:0;margin-top:10px;"><i class="pe-7s-angle-down-circle pe-2x" style="margin-right:5px;"></i> New Messages</a>');
  
 // $( ".messages").append('<a href="#" class="button scrollbutton" onclick="scrollBottom()"  style="display:none;top:103px;position:absolute;right:0;float:left;width:50%;border:0;height:auto;"><div style="height:29px;width:130px;margin:0 auto;"><i class="pe-7s-angle-down-circle pe-2x" style="float:left;" ></i> <div style="float:left;margin-left:5px;">New messages</div></div></a>');
  
// if (snapshot.numChildren() > 10) {$( ".messages").prepend( '<a href="#" class="button previouschats" onclick="getPrevious()"  style="top:103px;position:absolute;left:0;float:left;width:50%;border:0;height:auto;"><div style="height:29px;width:130px;margin:0 auto;"><i class="pe-7s-angle-up-circle pe-2x" style="float:left;" ></i> <div style="float:left;margin-left:5px;">Past messages</div></div></a>');}
      
  
}).then(function(result) {


    
    var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

    var stringnow = new Date();
    var stringyestday = new Date(Date.now() - 86400);
    var todaystring = weekday[stringnow.getDay()] + ', ' + month[stringnow.getMonth()] + ' ' + stringnow.getDate(); 
        var yesterdaystring = weekday[stringyestday.getDay()] + ', ' + month[stringyestday.getMonth()] + ' ' + stringyestday.getDate(); 
message_historyon = firebase.database().ref("chats/" + first_number+ '/' + second_number).orderByKey().limitToLast(20).on("child_added", function(snapshot) {

if (message_count ==1) {lastkey = snapshot.getKey();}

message_count ++;

var checkloaded;
if (existingmessages > 19){checkloaded = 20;}
else if (existingmessages < 20){checkloaded = existingmessages;}

if (message_count == checkloaded){messages_loaded = true;}


var obj = snapshot.val();

var datechatstring;

var messagedate = new Date((obj.timestamp * 1000));

var minstag = ('0'+messagedate.getMinutes()).slice(-2);


messagetimetitle = messagedate.getHours() + ':' + minstag;


var messagedaytitle = weekday[messagedate.getDay()] + ', ' + month[messagedate.getMonth()] + ' ' + messagedate.getDate(); 
if (!prevdatetitle){prevdatetitle = messagedaytitle;console.log('prevdatetitle does not exist');

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}
else {

if (prevdatetitle == messagedaytitle){console.log('it is the same day');datechatstring='';}
else{console.log('it is a different day');prevdatetitle = messagedaytitle;

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}

}




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
    //avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
    // Day
        day:datechatstring,
    label: 'Sent ' + messagetimetitle
  });
}


if (obj.param == 'image'){
     
  
     
     if (obj.photo_expiry){
         
         
if (obj.photo_expiry < Number(unix)){



firebase.database().ref("photochats/" + first_number+ '/' + second_number + '/' + obj.id).remove();
firebase.database().ref("chats/" + first_number+ '/' + second_number + '/' + obj.id).remove();



}

else{
    
     myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'sent',
    // Avatar and name:
    //avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
    // Day

  });

image_count ++;
    
}

}

else {
     
     
     myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'sent',
    // ' and name:
   // avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
  });

image_count ++;
}



}


if (conversation_started === true) {

$( ".message" ).last().remove();
$( ".message" ).last().addClass("message-last");

$('#buzzer')[0].play();


}

}

//received messages

if (obj.to_uid == f_uid) {

if (messages_loaded === true) {

var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();
if (snapshot.val()){
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
     firebase.database().ref('notifications/' +f_uid + '/' + targetid).update({
    received:'Y',
    new_message_count:'0',
        authcheck:f_uid,
        uid_accepted:f_uid
  });
  
  firebase.database().ref('notifications/' +targetid + '/' + f_uid).update({
    received:'Y',
    new_message_count:'0',
        authcheck:f_uid,
        uid_accepted:f_uid
  });
}
}



});

}

if (conversation_started === true) {

$('#buzzer')[0].play();





}

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
   // avatar: 'https://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: targetname,
        day:datechatstring,
    label: 'Sent ' + messagetimetitle
  });
}

if (obj.param == 'image'){
     


if (!obj.photo_expiry){



 myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'received',
    // Avatar and name:
  //  avatar: 'https://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle

  });

image_count ++;

var seentime = Math.round(+new Date()/1000);
var expirytime = Math.round(+new Date()/1000) + 86400;



firebase.database().ref("chats/" + first_number+ '/' + second_number + '/' + obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });

firebase.database().ref('photostodelete/' + obj.from_uid + '/' +obj.to_uid+ '/' +obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });
  
  firebase.database().ref("photochats/" + first_number+ '/' + second_number + '/' + obj.id).update({
    photo_expiry:expirytime,
    seen:'Y',
    seentime:seentime
  });

    
    
    
    
    
    
}

else {



if (obj.photo_expiry < Number(unix)){

firebase.database().ref("photochats/" + first_number+ '/' + second_number + '/' + obj.id).remove();
firebase.database().ref("chats/" + first_number+ '/' + second_number + '/' + obj.id).remove();



}

else{
    
    myMessages.addMessage({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'received',
    // Avatar and name:
   // avatar: 'https://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
  });

image_count ++;
    
}
    
}


}







}





  





}, function (errorObject) {

});
    
    
});








}


//myMessages.layout();
//myMessages = myApp.messages('.messages', {
//    autoLayout: true
//}); 
//myMessages.scrollMessages();

 myApp.initPullToRefresh('.pull-to-refresh-content-9');

}


var notifadditions=0;
var notifletsload = 12;
function getmoreNotifs(){
notifadditions ++;


var notifsloaded = notifadditions * 12;
var notif2load = mynotifs.length - (notifadditions * 12); 



if (notif2load > 12) {notifletsload = 12;} else {notifletsload = notif2load;}
var lasttoaddnotif = notifsloaded + notifletsload;
$(".loadnotifsloader").remove();

for (i = notifsloaded; i < lasttoaddnotif; i++) { 

 myList.appendItem({
    title: mynotifs[i].title,
    targetid:mynotifs[i].targetid,
    targetname:mynotifs[i].targetname,
    picture:mynotifs[i].picture,
    from_name: mynotifs[i].from_name,
    to_name: mynotifs[i].to_name,
    from_uid:mynotifs[i].from_uid,
    to_uid: mynotifs[i].to_uid,
    icon:mynotifs[i].icon,
    colordot:mynotifs[i].colordot,
    func:mynotifs[i].func,
    type:mynotifs[i].type,
     timestamptitle:mynotifs[i].timestamptitle
});

}
canscrollnotif = true;

}




var letsload = 20;
function getPrevious(){

if (existingmessages === false){
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


firebase.database().ref("chats/" + first_number+ '/' + second_number).once('value').then(function(snapshot) {
  
  existingmessages = snapshot.numChildren();

     previousFunction(); 
  
})
}
else{previousFunction();}

function previousFunction(){


    var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

    var stringnow = new Date();
    var stringyestday = new Date(Date.now() - 86400);
    var todaystring = weekday[stringnow.getDay()] + ', ' + month[stringnow.getMonth()] + ' ' + stringnow.getDate(); 
        var yesterdaystring = weekday[stringyestday.getDay()] + ', ' + month[stringyestday.getMonth()] + ' ' + stringyestday.getDate(); 




var prevarray = [];
message_count = 0;  
additions ++;
$(".previouschats").remove();



var left2load = existingmessages - (additions * 20); 

if (left2load > 20) {letsload = 20;} else {letsload = left2load;}


console.log('existingmessages' + existingmessages);
console.log('letsload' + letsload);
console.log('additions' + additions);


var first_number,second_number;


if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}


var newmessage_history = firebase.database().ref("chats/" + first_number+ '/' + second_number).orderByKey().limitToLast(letsload).endAt(lastkey).on("child_added", function(snapshot) {



message_count ++;



if (message_count ==1) {lastkey = snapshot.getKey();}

var obj = snapshot.val();

var datechatstring;

var messagedate = new Date((obj.timestamp * 1000));

var minstag = ('0'+messagedate.getMinutes()).slice(-2);


messagetimetitle = messagedate.getHours() + ':' + minstag;


var messagedaytitle = weekday[messagedate.getDay()] + ', ' + month[messagedate.getMonth()] + ' ' + messagedate.getDate(); 
if (!prevdatetitle){prevdatetitle = messagedaytitle;console.log('prevdatetitle does not exist');

if (messagedaytitle == todaystring){datechatstring = 'Today'}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday'}
else{datechatstring = messagedaytitle;}

}
else {

if (prevdatetitle == messagedaytitle){console.log('it is the same day');
//console.log($(".message").length);

if ((letsload < 20) && (message_count == 1) ){

if (messagedaytitle == todaystring){datechatstring = 'Today'}
if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday'}
else{datechatstring = messagedaytitle;}

}
else {datechatstring='';}
}
else{console.log('it is a different day');prevdatetitle = messagedaytitle;

if (messagedaytitle == todaystring){datechatstring = 'Today'}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday'}
else{datechatstring = messagedaytitle;}

}

}

//my messages

if (obj.from_uid == f_uid) {

if (obj.param == 'message'){
    
    prevarray.push({
    // Message text
    text: obj.message,
    // Random message type
    type: 'sent',
    // Avatar and name:
   // avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
        day:datechatstring,
    label: 'Sent ' + messagetimetitle
  });
    

}


if (obj.param == 'image'){
      prevarray.push({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none"  onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'sent',
    // Avatar and name:
 //   avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
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
   // avatar: 'https://graph.facebook.com/'+targetid+'/picture?type=normal',
    name: targetname,
        day:datechatstring,
    label: 'Sent ' + messagetimetitle
  });
}

if (obj.param == 'image'){
      prevarray.push({
    // Message text
    text: '<img src="'+obj.downloadurl+'" onload="$(this).fadeIn(700);" style="display:none" onclick="imagesPopup(\''+obj.id+'\');">',
    // Random message type
    type: 'received',
    // Avatar and name:
  //  avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
  });

}

}

if (message_count == letsload) {
    $(".loadmessagesloader").remove();
canloadchat = true;

    
myMessages.addMessages(prevarray.slice(0, -1), 'prepend');
    

    
//$(".scrollbutton").remove();
//$(".messages").prepend('<a href="#" class="button scrollbutton" onclick="scrollBottom()"  style="display:none;top:103px;position:absolute;right:0;float:left;width:50%;border:0;height:auto;"><div style="height:29px;width:130px;margin:0 auto;"><i class="pe-7s-angle-down-circle pe-2x" style="float:left;" ></i> <div style="float:left;margin-left:5px;">New messages</div></div></a>');


//if (message_count == 20){$( ".messages").prepend( '<a href="#" class="button previouschats" onclick="getPrevious()"  style="top:103px;position:absolute;left:0;float:left;width:50%;border:0;height:auto;"><div style="height:29px;width:130px;margin:0 auto;"><i class="pe-7s-angle-up-circle pe-2x" style="float:left;" ></i> <div style="float:left;margin-left:5px;">Past messages</div></div></a>' );$( ".messages" ).css("margin-top","132px");}
}




}, function (errorObject) {
 // console.log("The read failed: " + errorObject.code);
});



}
}

var targetid;
var targetname;
var targetreported;
var targetdatearray,targetduckarray;
var targetdate,targetduck;
var match;
var targetdatelikes, targetducklikes;
var slideheight = $( window ).height();

function getMeta(url){
  
    
    
    $("<img/>",{
      load : function(){ 

      if (this.height > this.width){
        
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height',$(document).height() + 'px');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','auto');

        
        }
 },
        src  : url
    });  
}

function backtoProfile(){
myApp.closeModal('.infopopup') ;
$( ".toolbarq" ).hide();
//getMeta(new_all[myPhotoBrowser.activeIndex].url);
	
$( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','100%');	
$( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height','auto');
	
	//$( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('object-fit','none');
//put original image here



$( ".greytag" ).addClass('bluetext');
//$( ".photo-browser-slide img" ).css("height","100%");

$( ".datebutton" ).addClass('imagelibrary');
$( ".duckbutton" ).addClass('imagelibrary');



//$( ".swiper-container-vertical" ).css("height",slideheight + "px");
//$( ".swiper-container-vertical" ).css("margin-top","0px");
//$( ".swiper-slide-active" ).css("height", "600px");

$( ".toolbarq" ).css("background-color","transparent");
$( ".datefloat" ).hide();
$( ".duckfloat" ).hide();
$( ".vertical-pag" ).show();




//$( ".infopopup" ).css("z-index","-100");
$( ".onlineblock" ).hide();
//$( ".orlink" ).show();
//$( ".uplink" ).hide();
//$( ".nextlink" ).hide();
//$( ".prevlink" ).hide();
$( ".prevphoto" ).show();
$( ".nextphoto" ).show();
$( ".nexts" ).hide();
$( ".prevs" ).hide();
$( ".photo-browser-slide" ).css("opacity","1");
//$( ".datebutton" ).css("height","40px");
//$( ".duckbutton" ).css("height","40px");
//$( ".datebutton img" ).css("height","30px");
//$( ".duckbutton img" ).css("height","30px");
//$( ".datebutton img" ).css("width","auto");
//$( ".duckbutton img" ).css("width","auto");

$( ".photobrowserbar" ).css("background-color","transparent");

}


var comingback;


function scrollQuestions(){
//console.log($( ".wrapper-questions" ).offset().top);
//console.log($( window ).height());


var offsetline = $( window ).height() - 88;
var offsetdiv = $( ".wrapper-questions" ).offset().top;

//if (offsetdiv > offsetline){$( ".photo-browser-slide" ).css("opacity",1);}
var setopacity = (($( ".wrapper-questions" ).offset().top +88) / $( window ).height());$( ".photo-browser-slide" ).css("opacity",setopacity);$( ".adown" ).css("opacity",setopacity);

    //if 
   // if (offsetdiv > offsetline) {$( ".photo-browser-slide" ).css("opacity","1");$( ".adown" ).css("opacity","1");}

    
    
//var setopacity = (($( ".wrapper-questions" ).offset().top +10) / $( window ).height());$( ".photo-browser-slide" ).css("opacity",setopacity);$( ".adown" ).css("opacity",setopacity);








}

function delayYo(){

    


}

function scrolltoTop(){
$( ".swiper-questions" ).animate({ scrollTop: $( window ).height() - 130 });
}

function questions(origin){




$( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('object-fit','cover');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height','100%');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','auto');




$( ".toolbarq" ).css("background-color","transparent");
$( ".photobrowserbar" ).css("background-color","#ccc");
$( ".greytag" ).removeClass('bluetext'); 



var targetplugin = new_all[myPhotoBrowser.activeIndex].id;

//may need to readd this
//checkMatch(targetplugin);

comingback = 0;
if (origin){comingback = 1;}

if (swiperQuestions){

swiperQuestions.removeAllSlides();
swiperQuestions.destroy();
}

//alert($('.photo-browser-slide img').css('height'));

if ($('.infopopup').length > 0) {
alert('deleting return false');myApp.closeModal('.infopopup');return false;
}




$( ".vertical-pag" ).hide();
$( ".datefloat" ).show();
$( ".duckfloat" ).show();

$( ".datebutton" ).removeClass('imagelibrary');
$( ".duckbutton" ).removeClass('imagelibrary');




//$( ".swiper-container-vertical.swiper-slide-active img" ).css("height","-webkit-calc(100% - 115px)");
//$( ".swiper-container-vertical" ).css("margin-top","-27px");
//$( ".swiper-slide-active" ).css("height","100%");

//$( ".photo-browser-slide img" ).css("height","calc(100% - 80px)");







//$( ".orlink" ).hide();
//$( ".uplink" ).show();
//$( ".nextlink" ).show();
//$( ".prevlink" ).show();
$( ".onlineblock" ).show();


//$( ".datebutton" ).css("height","70px");
//$( ".duckbutton" ).css("height","70px");
//$( ".datebutton img" ).css("height","60px");
//$( ".duckbutton img" ).css("height","60px");
//$( ".datebutton img" ).css("width","auto");
//$( ".duckbutton img" ).css("width","auto");


//$( ".nametag" ).removeClass('whitetext');

 var photobrowserHTML = 


 '<div class="popup infopopup" style="background-color:transparent;margin-top:44px;height:calc(100% - 127px);padding-bottom:20px;z-index:12000;" >'+

       //  ' <a href="#tab1" class="prevs button disabled" style="border-radius:5px;position:absolute;left:-37px;top:50%;margin-top:-28px;height:56px;width:56px;border:0;z-index:99;color:#2196f3;background-color:rgba(247, 247, 247, 0.952941);"><i class="pe-7s-angle-left pe-4x" style="margin-left:7px;margin-top:-1px;z-index:-1"></i></a>'+
       //                ' <a href="#tab3" class="nexts button" style="border-radius:5px;position:absolute;right:-37px;width:56px;top:50%;margin-top:-26px;height:56px;color:#2196f3;border:0;z-index:99;background-color:rgba(247, 247, 247, 0.952941);"><i class="pe-7s-angle-right pe-4x" style="margin-left:-35px;margin-top:-1px;"></i></a>'+


     
'<div class="swiper-container swiper-questions" style="height:100%;overflow-y:scroll;">'+
 

 '<div style="height:100%;width:100%;overflow-x:hidden;" onclick="backtoProfile();">'+
 



 



 '</div>'+

 
   
    
    
 
 '   <div class="swiper-wrapper wrapper-questions" style="">'+


  '  </div>'+

'</div>'+

                    
                  '</div>'
  myApp.popup(photobrowserHTML,true,false);

  $( ".nexts" ).show();
$( ".prevs" ).show();
$( ".prevphoto" ).hide();
$( ".nextphoto" ).hide();
  

  for (i = 0; i < new_all.length; i++) { 
   var boxcolor,displayavail,availabilityli,availabletext,iconavaill;
 iconavaill='f';boxcolor = 'width:60px;color:#007aff;opacity:1;background-color:transparent';displayavail='none';availabletext='';
   
   $( ".wrapper-questions" ).append('<div class="swiper-slide slideinfo_'+new_all[i].id+'" style="height:100%;">'+





//'<h3 class="availabilitytitle_'+new_all[i].id+'" style="color:white;font-size:16px;padding:5px;float:left;"><i class="pe-7-angle-down pe-3x"></i></h3>'+







'<h3 onclick="scrolltoTop()" class="adown arrowdown_'+new_all[i].id+' availyope availyo_'+ new_all[i].id+'" style="display:none;margin-top:-60px;right:0px;'+boxcolor+';font-size:14px;padding:0px;margin-left:10px;"><i class="pe-7f-angle-down pe-3x" style="float:left;"></i>'+
          
'</h3>'+






'<div onclick="scrolltoTop()" style="z-index:12000;margin-top:15px;background-color:white;border-radius:20px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;margin-bottom:20px;display:none;" class="prof_'+i+' infoprofile availyo_'+ new_all[i].id+'">'+


   

     '<div class="content-block-title" style="padding-top:0px;clear:both;margin-top:0px;">About '+new_all[i].name+'</div>'+




'<div class="list-block" style="margin-top:0px;clear:both;">'+
    '<ul class="profileul_'+new_all[i].id+'" style="background-color:transparent">'+
      
        
      ' <li>'+
      '<div class="item-content">'+

       ' <div class="item-inner">'+
       '  <div class="item-title label">Online</div>'+
        '  <div class="item-input">'+
'<div class="timetag_'+ new_all[i].id+'"></div>'+

         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
   ' <li>'+
      '<div class="item-content">'+

       ' <div class="item-inner">'+
              '  <div class="item-title label">Distance</div>'+
        '  <div class="item-input">'+
'<div class="distancetag_'+ new_all[i].id+'"></div>'+

         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+

  
      
       
'    </ul></div>'+







                    

                    
   '</div>'+
   '</div>');


//put here

if (new_all[i].description){
$( ".profileul_"+new_all[i].id ).prepend(
' <li>'+
      '<div class="item-content">'+

       ' <div class="item-inner">'+
        '  <div class="item-input">'+

          '    <textarea class="resizable" name="name" style="max-height:200px;font-size:14px;" readonly>'+new_all[i].description+'</textarea>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'
);
}

if (new_all[i].hometown){
	
	
	
$( ".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Hometown</div>'+
        '  <div class="item-input">'+
	'<textarea class="resizable" style="min-height:60px;max-height:132px;" readonly>'+new_all[i].hometown+'</textarea>'+

         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'
);
}



if (new_all[i].industry){


$( ".profileul_"+new_all[i].id  ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Industry</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].industry+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].zodiac){


$( ".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Zodiac</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].zodiac+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].politics){


$( ".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Politics</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].politics+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].religion){


$( ".profileul_"+new_all[i].id  ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Religion</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].religion+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].ethnicity){


$( ".profileul_"+new_all[i].id  ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Ethnicity</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].ethnicity+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].eyes){


$( ".profileul_"+new_all[i].id  ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Eye Color</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].eyes+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].body){


$( ".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Body Type</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].body+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].height != 0){

if (new_all[i].height == 122) {var heightset = '122 cm (4\' 0\'\')';}
     if (new_all[i].height == 124) {var heightset = '124 cm (4\' 1\'\')';}
     if (new_all[i].height == 127) {var heightset = '127 cm (4\' 2\'\')';}
     if (new_all[i].height == 130) {var heightset = '130 cm (4\' 3\'\')';}
     if (new_all[i].height == 132) {var heightset = '132 cm (4\' 4\'\')';}
          if (new_all[i].height == 135) {var heightset = '135 cm (4\' 5\'\')';}
     if (new_all[i].height == 137) {var heightset = '137 cm (4\' 6\'\')';}
     
     if (new_all[i].height == 140) {var heightset = '140 cm (4\' 7\'\')';}
     if (new_all[i].height == 142) {var heightset = '142 cm (4\' 8\'\')';}
     if (new_all[i].height == 145) {var heightset = '145 cm (4\' 9\'\')';}
     if (new_all[i].height == 147) {var heightset = '147 cm (4\' 10\'\')';}
     if (new_all[i].height == 150) {var heightset = '150 cm (4\' 11\'\')';}
     if (new_all[i].height == 152) {var heightset = '152 cm (5\' 0\'\')';}
     if (new_all[i].height == 155) {var heightset = '155 cm (5\' 1\'\')';}
          if (new_all[i].height == 157) {var heightset = '157 cm (5\' 2\'\')';}
          if (new_all[i].height == 160) {var heightset = '160 cm (5\' 3\'\')';}
          if (new_all[i].height == 163) {var heightset = '163 cm (5\' 4\'\')';}
               if (new_all[i].height == 165) {var heightset = '165 cm (5\' 5\'\')';}
                    if (new_all[i].height == 168) {var heightset = '168 cm (5\' 6\'\')';}
                         if (new_all[i].height == 170) {var heightset = '170 cm (5\' 7\'\')';}
                              if (new_all[i].height == 173) {var heightset = '173 cm (5\' 8\'\')';}
                                   if (new_all[i].height == 175) {var heightset = '175 cm (5\' 9\'\')';}
                                        if (new_all[i].height == 178) {var heightset = '178 cm (5\' 10\'\')';}
                                             if (new_all[i].height == 180) {var heightset = '180 cm (5\' 11\'\')';}
                                                  if (new_all[i].height == 183) {var heightset = '183 cm (6\' 0\'\')';}
                                                       if (new_all[i].height == 185) {var heightset = '185 cm (6\' 1\'\')';}
                                                            if (new_all[i].height == 188) {var heightset = '185 cm (6\' 2\'\')';}
                                                                 if (new_all[i].height == 191) {var heightset = '191 cm (6\' 3\'\')';}
                                                                      if (new_all[i].height == 193) {var heightset = '193 cm (6\' 4\'\')';}
                                                                           if (new_all[i].height == 195) {var heightset = '195 cm (6\' 5\'\')';}
                                                                                if (new_all[i].height == 198) {var heightset = '198 cm (6\' 6\'\')';}
                                                                                     if (new_all[i].height == 201) {var heightset = '201 cm (6\' 7\'\')';}
                                                                                          if (new_all[i].height == 203) {var heightset = '203 cm (6\' 8\'\')';}

$(".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Height</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+heightset+'" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}

if (new_all[i].weight != 0){


$( ".profileul_"+new_all[i].id ).append(
 ' <li>'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Weight</div>'+
        '  <div class="item-input">'+
          '    <input type="text" name="name" value="'+new_all[i].weight+' kg (' + Math.round(new_all[i].weight* 2.20462262) + ' lbs)" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'

);
}
var timestring;
var minutevalue;


if (new_all[i].minutes <= 0){timestring = 'Now';}
if (new_all[i].minutes == 1){timestring = '1 minute ago';}
if ((new_all[i].minutes >= 0) && (new_all[i].minutes <60)){timestring = Math.round(new_all[i].minutes) + ' minutes ago';}
if (new_all[i].minutes == 60){timestring = '1 hour ago';}
if ((new_all[i].minutes >= 60) && (new_all[i].minutes <1440)){
minutevalue = Math.round((new_all[i].minutes / 60));
if (minutevalue == 1) {timestring =  '1 hour ago';}
else {timestring =  minutevalue + ' hours ago';}
}
if ((new_all[i].minutes >= 60) && (new_all[i].minutes <1440)){timestring = Math.round((new_all[i].minutes / 60)) + ' hours ago';}
if (new_all[i].minutes == 1440){timestring = '1 day ago';}

if ((new_all[i].minutes >= 1440) && (new_all[i].minutes <10080)){
minutevalue = Math.round((new_all[i].minutes / 1440));
if (minutevalue == 1) {timestring =  '1 day ago';}
else {timestring =  minutevalue + ' days ago';}
}
if (new_all[i].minutes >= 10080){timestring = '1 week';}
if (new_all[i].minutes >= 20160){timestring = '2 weeks';}
if (new_all[i].minutes >= 30240){timestring = '3 weeks';}






   $( ".timetag_" + new_all[i].id ).html(timestring);
   $( ".distancetag_" + new_all[i].id ).html(new_all[i].distancestring);



 

   
   


}





swiperQuestions = myApp.swiper('.swiper-questions', {
   nextButton:'.nexts',
   prevButton:'.prevs', 
  onSetTranslate:function(swiper, translate){myPhotoBrowser.swiper.setWrapperTranslate(translate - (20 * swiper.activeIndex));},

  onInit:function(swiper){  


  myPhotoBrowser.swiper.setWrapperTranslate(0);
  $( ".infoprofile").hide();
	  $( ".adown" ).css( "opacity","1" );
  var wrapperheightshould = $(".prof_" + swiper.activeIndex).height();
$( ".wrapper-questions").css("height",(wrapperheightshould - 150)+ "px");
$( ".availyope").hide();
//$( ".availyo_"+ new_all[0].id ).show();



if (new_all.length === 1){swiper.lockSwipes();myPhotoBrowser.swiper.lockSwipes();}

	  //checkmatchwashere
//checkMatch(targetid);
},
  onSlideChangeStart:function(swiper){









var wrapperheightshould = $(".prof_" + swiper.activeIndex).height();
$( ".wrapper-questions").css("height",(wrapperheightshould - 150)+ "px");


if(comingback === 1){   
   if (swiper.activeIndex > swiper.previousIndex){myPhotoBrowser.swiper.slideNext();}
    if (swiper.activeIndex < swiper.previousIndex){myPhotoBrowser.swiper.slidePrev();}
}



   
 //  if (swiper.isBeginning === true){$( ".prevs" ).addClass( "disabled" );

   //}
  // else{$( ".prevs" ).removeClass( "disabled" );}
     // if (swiper.isEnd === true){$( ".nexts" ).addClass( "disabled" );}
     // else{$( ".nexts" ).removeClass( "disabled" );}

 //if (swiper.isBeginning === true){$( ".prevs" ).addClass( "disabled" );
  // $(".arrowdown_"+new_all[swiper.activeIndex + 1].id).hide(); 
//$(".arrowdown_"+new_all[swiper.activeIndex].id).show(); 
  // }
   //else if (swiper.isEnd === true){$(".arrowdown_"+new_all[swiper.activeIndex -1].id).hide(); 
//$(".arrowdown_"+new_all[swiper.activeIndex].id).show(); }
//else{$(".arrowdown_"+new_all[swiper.activeIndex + 1].id).hide(); 
//$(".arrowdown_"+new_all[swiper.activeIndex -1].id).hide();
//$(".arrowdown_"+new_all[swiper.activeIndex].id).show(); }
//$( ".adown" ).css( "opacity","1" );



$( ".camerabadge" ).text(new_all[swiper.activeIndex].photocount);


 
$( ".infoprofile").hide();
$( ".availyope").hide();

//$(".swiper-questions").css("background-image", "url("+new_all[swiper.activeIndex].url+")"); 
//$(".slideinfo_"+new_all[swiper.activeIndex + 1].id).css("background-size", "cover"); 
//$(".slideinfo_"+new_all[swiper.activeIndex + 1].id).css("background-position", "50% 50%"); 
//$(".swiper-questions".css("background", "transparent"); 
$( ".swiper-questions" ).scrollTop( 0 );


if ($('.toolbarq').css('display') == 'block')
{
if (((swiper.activeIndex - swiper.previousIndex) > 1) ||((swiper.activeIndex - swiper.previousIndex) < -1)  ){
//alert(swiper.activeIndex - swiper.previousIndex);
//myPhotoBrowser.swiper.slideTo(0);

myPhotoBrowser.swiper.slideTo(swiper.activeIndex);
//swiper.slideTo(myPhotoBrowser.swiper.activeIndex);
}
}

	  //checkmatchwashere
//checkMatch(targetid);

}



  });



//console.log(myPhotoBrowser.swiper.activeIndex);
swiperQuestions.slideTo(myPhotoBrowser.swiper.activeIndex,0);
$( ".availyo_"+ new_all[swiperQuestions.activeIndex].id ).show();
$( ".toolbarq" ).show();

comingback = 1;

$( ".camerabadge" ).text(new_all[myPhotoBrowser.swiper.activeIndex].photocount);
   $( ".distancetag" ).text(new_all[myPhotoBrowser.swiper.activeIndex].distancestring);

//if (myPhotoBrowser.swiper.activeIndex === 0){
//myPhotoBrowser.swiper.slideNext();
//myPhotoBrowser.swiper.slidePrev();
//}
//else {



//}
  

  
  //swiperQuestions.slideTo(myPhotoBrowser.swiper.activeIndex);



  
}

function checkMatch(targetid){

var indivNotif = firebase.database().ref('notifications/' + f_uid + '/' + targetid);
indivNotif.once('value', function(snapshot) {

if (snapshot.val()){
var obj = snapshot.val();

if (obj.new_message_count >0 && obj.to_uid == f_uid && obj.received =='N'){$( ".indivnotifcount" ).remove();$( ".arrowdivbrowser" ).append('<span class="badge indivnotifcount" style="position:absolute;right:0px;background-color:rgb(255, 208, 0);color:black;">'+obj.new_message_count+'</span>');}
else{$( ".indivnotifcount" ).remove();}
}
});


var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

return firebase.database().ref('matches/' + f_uid + '/' + targetid).once('value').then(function(snapshot) {


$( ".availyo_"+ new_all[swiperQuestions.activeIndex].id ).show();
$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
$( ".loaderlink" ).hide();
$( ".orlink" ).show();

$( ".duckbutton" ).show();
$( ".datebutton" ).show();
if (snapshot.val() === null) {}
else {

if (first_number == f_uid){

if (snapshot.val().firstnumberreport){targetreported = true;}else {targetreported = false;}

//Dates
if (snapshot.val().firstnumberdate == 'Y'){$( ".datebutton" ).addClass( "active" );}else {$( ".datebutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberdate == 'Y'){$( ".datebutton" ).addClass( "likesme" );}else {$( ".datebutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberdate == 'Y' && snapshot.val().firstnumberdate == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();

matchNavbar();


d_type='date';
}
else {}



//Duck
if (snapshot.val().firstnumberduck == 'Y'){$( ".duckbutton" ).addClass( "active" );}else {$( ".duckbutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberduck == 'Y'){$( ".duckbutton" ).addClass( "likesme" );}else {$( ".duckbutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberduck == 'Y' && snapshot.val().firstnumberduck == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='duck';
}
else {}





    
}
if (first_number == targetid){
    
    if (snapshot.val().secondnumberreport){targetreported = true;}else {targetreported = false;}
    
    //Date
    
    if (snapshot.val().firstnumberdate == 'Y'){$( ".datebutton" ).addClass( "likesme" );}else {$( ".datebutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberdate == 'Y'){$( ".datebutton" ).addClass( "active" );}else {$( ".datebutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberdate == 'Y' && snapshot.val().firstnumberdate == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='date';
}
else {}

//Duck
    if (snapshot.val().firstnumberduck == 'Y'){$( ".duckbutton" ).addClass( "likesme" );}else {$( ".duckbutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberduck == 'Y'){$( ".duckbutton" ).addClass( "active" );}else {$( ".duckbutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberduck == 'Y' && snapshot.val().firstnumberduck == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='duck';
}
else {}


}


    
}






});





}


	function unmatchDate(){
myApp.confirm('Are you sure?', 'Unmatch', function () {
        dateUser();
    });
	}
	
	
	function unmatchDuck(){
myApp.confirm('Are you sure?', 'Unmatch', function () {
        duckUser();
    });
	}


function photoBrowser(openprofile,arraynumber,mainchange,chatorigin){
allowedchange = true;
photoresize = false;
if ($('.photo-browser').length > 0){return false;}



myApp.closeModal('.picker-sub');




//firebase.database().ref("users/" + f_uid).off('value', userpref);
var photobrowserclass="";                                                                                                                                                                                                                                                                                                                                                 
var duckfunction = ""
var datefunction = ""
       if ($('.chatpop').length > 0) {$( ".chatpop" ).css( "z-index","10000" );photobrowserclass="photo-browser-close-link";}
       else{duckfunction = "createDuck()";datefunction = "createDate1()";}

var to_open = 0;


       if ($('.chatpop').length > 0 || chatorigin) {}
else {

to_open = openprofile;

}
var hiddendivheight = $( window ).height() - 40;

//alert(JSON.stringify(new_all));
	
myPhotoBrowser = myApp.photoBrowser({
    zoom: false,
    expositionHideCaptions:true,

       
    lazyLoading:true,
    lazyLoadingInPrevNext:true,
    lazyPhotoTemplate:

    '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide" style="background-color:transparent;">'+

    '<div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderSvg}}{{/if}}</div>'+
    '<div class="swiper-container swiper-vertical" style="height:100%;min-width:'+$(document).width()+'px;background-color:transparent;">'+


    '<div class="swiper-wrapper vertical-wrapper-swiper">'+
     


 
 '{{js "this.photos"}}'+
 

 
'</div><div class="swiper-pagination vertical-pag" style="top:0;left:0;z-index:999999;"></div></div>'+

'</div>',
    
    exposition:false,
    photos: new_all,
   captionTemplate:'<div style="width:40px;height:40px;background-color:transparent;margin-top:-80px;margin-left:50px;float:right;display:none;"></div><div class="photo-browser-caption" data-caption-index="{{@index}}">{{caption}}</div>',
    
    toolbarTemplate:'<div class="toolbar tabbar toolbarq" style="height:84px;background-color:transparent;">'+
  

	
   ' <div class="toolbar-inner date-template" style="display:none;padding:0;background-color:#2196f3;height:74px;border-bottom-right:20px;border-bottom-left:20px;">'+
   '<a href="#" onclick="unmatchDate();" class="button link" style="color:#ccc;font-size:15px;max-width:80px;border:0;">'+
   '      Unmatch'+
   '</a>'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;visibility:hidden;">or</p>'+
   '<a href="#" onclick="'+datefunction+'" class="button link active lets '+photobrowserclass+'" style="border:1px solid white;margin-right:15px;margin-left:-15px;font-family: \'Pacifico\', cursive;font-size:26px;height:40px;">Let\'s Date <div style="font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif;position:absolute;right:0px;top:-8px;" class="arrowdivbrowser"><i class="pe-7s-angle-right pe-2x"></i></div></a></div>'+
     
  
  ' <div class="toolbar-inner duck-template" style="display:none;padding:0;background-color:#2196f3;height:74px;border-bottom-right:20px;border-bottom-left:20px;">'+
       '<a href="#" onclick="unmatchDuck()" class="button link" style="color:#ccc;font-size:15px;max-width:80px;border:0;">'+
   '      Unmatch'+
   '</a>'+
	   '<a href="#" onclick="'+duckfunction+'" class="button link active lets '+photobrowserclass+'" style="border:1px solid white;margin-right:15px;margin-left:-15px;font-family: \'Pacifico\', cursive;font-size:26px;height:40px;">Let\'s Duck <div style="font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif;position:absolute;right:0px;top:-8px;" class="arrowdivbrowser"><i class="pe-7s-angle-right pe-2x"></i></div></a></div>'+

 
   
   ' <div class="toolbar-inner toolbardecide" style="padding-bottom:10px;padding-left:0px;padding-right:0px;">'+


'<a href="#tab3" onclick="dateUser();" class="datebutton disabled button link" style="border:1px solid white;border-right:0;border-radius:20px;border-top-right-radius:0px;border-top-left-radius:0px;border-bottom-right-radius:0px;font-family: \'Pacifico\', cursive;font-size:24px;">'+
'<span class="datefloat" style="padding:10px;border-radius:5px;margin-right:20px;">Date</span>'+
   '         <div style="width:50px;overflow-x:hidden;position:absolute;right:1px;bottom:-8px;"><img src="media/datefaceonly.png" style="width:100px;margin-left:-1px;">'+
   '</div>'+

       ' </a>'+
        ' <a href="#tab3" onclick="duckUser();" class="duckbutton disabled button link" style="border:1px solid white;border-left:0;border-radius:20px;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-left-radius:0px;font-family: \'Pacifico\', cursive;font-size:24px;">'+
        '<span class="duckfloat" style="padding:10px;border-radius:5px;margin-left:20px;">Duck</span>'+
         '   <div style="width:54px;overflow-x:hidden;position:absolute;left:-1px;bottom:-8px;"> <img src="media/duckfaceonly.png" style="width:100px;margin-left:-51px;"></div>'+

        '</a>'+


       '<a href="#" class="link loaderlink"><span class="preloader preloader-white login-loader"></span></a>'+




   ' </div>'+
'</div>',
   onClose:function(photobrowser){myApp.closeModal('.actions-modal');hideProfile();
  singlefxallowed = true;
                                  viewphotos = false; 
  viewscroll = false;
       if ($('.chatpop').length > 0) {$( ".chatpop" ).css( "z-index","20000" );if ($('.chatpop').length > 0){myApp.closeModal('.infopopup');}
      if (swiperQuestions){
      
       swiperQuestions.removeAllSlides();
swiperQuestions.destroy();swiperQuestions = false;}
       }
       else{myApp.closeModal();   }
   
if (mainchange){new_all = main_all;singleuserarray = [];}
   
   //getPreferences();
   
   },
   swipeToClose:false,

  // onClick:function(swiper, event){showProfile();},
   nextButton:'.nextphoto',
   prevButton:'.prevphoto',

   onSlideChangeStart:function(swiper){

   
if (allowedchange){

if (photoresize){
if ($('.infopopup').length > 0){}
else{
	//getMeta(new_all[swiper.activeIndex].url);
  } 
  }
  
 if (swiper.activeIndex != openprofile){ photoresize = true;}
  

 
   
//var windowheight = $( window ).height();
//$( ".photo-browser-slide img").css( "height", "100% - 144px)" );
$( ".photo-browser-caption" ).empty();
 $( ".nametag" ).empty();
myApp.closeModal('.actions-modal');



$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".duckbutton" ).hide();
$( ".datebutton" ).hide();
	
	
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;


        targetid = new_all[myPhotoBrowser.activeIndex].id;


$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );
 //$( ".photo-browser-slide.swiper-slide-active img" ).css( "height", "100% - 144px)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();

$( ".toolbardecide" ).show();



$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );

var activecircle;







var targetdescription= new_all[myPhotoBrowser.activeIndex].description;
targetname = new_all[myPhotoBrowser.activeIndex].name;  
var targetage = new_all[myPhotoBrowser.activeIndex].age; 
$( ".agecat" ).text(targetage); 
  $( ".nametag" ).empty();
$( ".nametag" ).append('<div class="rr r_'+targetid+'">'+targetname+', '+targetage+'</div>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(targetdescription);
    myApp.sizeNavbars();







}

 checkMatch(targetid);

},    

    backLinkText: '',
//expositionHideCaptions:true,    
    
   
    navbarTemplate: 
          // ' <a href="#tab1" class="prevphoto button disabled" style="border-radius:5px;position:absolute;left:-31px;top:50%;margin-top:-28px;height:56px;width:56px;border:0;z-index:99999;color:#2196f3;background-color:transparent;"><i class="pe-7s-angle-left pe-4x" style="margin-left:5px;margin-top:-1px;"></i></a>'+
                //       ' <a href="#tab3" class="nextphoto button" style="border-radius:5px;position:absolute;right:-33px;width:56px;top:50%;margin-top:-26px;height:56px;color:#2186f3;border:0;z-index:99999;background-color:transparent"><i class="pe-7s-angle-right pe-4x" style="margin-left:-35px;margin-top:-1px;"></i></a>'+


        // '<div style="position:absolute;bottom:80px;right:0px;margin-left:-26px;z-index:9999;color:white;"><i class="pe-7s-info pe-4x" style="margin-top:-10px;"></i></div>'+





    '<div class="navbar photobrowserbar" style="background-color:#ccc">'+
   
     

   
   ' <div class="navbar-inner">'+
      '  <div class="left sliding">'+
          '  <a href="#" style="margin-left:-10px;"class="link photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
            '<i class="pe-7s-angle-left pe-3x matchcolor greytag"></i>'+
            '<span class="badge agecat" style="margin-left:-10px;display:none;">'+arraynumber+'</span>'+
            

           ' </a>'+
       ' </div>'+
       ' <div class="center sliding nametag matchcolor greytag">'+
        //  '  <span class="photo-browser-current"></span> '+
        //  '  <span class="photo-browser-of">{{ofText}}</span> '+
        //  '  <span class="photo-browser-total"></span>'+
       ' </div>'+
       ' <div class="right" onclick="actionSheet()">' +
//'<a href="#" class="link"><div class="cameradivnum" style="background-color:transparent;border-radius:50%;opacity:0.9;float:left;z-index:999;"><i class="pe-7s-camera pe-lg matchcolor" style="margin-top:3px;margin-left:-5px;"></i><div class="camerabadge badge" style="position:absolute;right:0px;margin-right:-10px;top:5px;z-index:999;"></div></div></a>'+
       '<a href="#" class="link">'+
        
        '    <i class="pe-7s-more pe-lg matchcolor greytag"></i>'+
     
       ' </a>'+
       '</div>'+
    '</div>'+
'</div>  '
});   



myPhotoBrowser.open();

targetid = new_all[myPhotoBrowser.activeIndex].id;

var mySwiperVertical = myApp.swiper('.swiper-vertical', {
  direction: 'vertical',
  zoom:'true',
  pagination:'.swiper-pagination',
  paginationType:'progress',
  onSlideChangeStart:function(swiper){
  var verticalheightarray = new_all[myPhotoBrowser.activeIndex].heightslides.split(",");
var verticalwidtharray = new_all[myPhotoBrowser.activeIndex].widthslides.split(",");

  var trueh = verticalheightarray[swiper.activeIndex];
  var truew = verticalwidtharray[swiper.activeIndex];;
  
        if (trueh > truew){
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height','auto');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','100%');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('object-fit','cover');

}
else if (trueh == trueh){
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','100%');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height','auto');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('object-fit','cover');

}
        else{
        
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('height','100%');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('width','auto');
        $( ".swiper-zoom-container > img, .swiper-zoom-container > svg, .swiper-zoom-container > canvas" ).css('object-fit','none');

        
        }
  
  
  
  console.log(new_all[myPhotoBrowser.activeIndex]);},
  onImagesReady:function(swiper){


 
  
  console.log(swiper);},
onInit:function(swiper){
//console.log(new_all[myPhotoBrowser.activeIndex]);
// 

if (viewphotos){
setTimeout(function(){ backtoProfile();viewphotos = false; }, 100);
}

if (viewscroll){
setTimeout(function(){ scrolltoTop();viewscroll = false; }, 100);
}

	
},



  onClick:function(swiper, event){


  questions();



//if(myPhotoBrowser.exposed === true) {$( ".swiper-container-vertical img " ).css("margin-top","0px");}
//else {$( ".photo-browser-slide img " ).css("height","calc(100% - 120px)");$( ".photo-browser-slide img " ).css("margin-top","-35px");}



}
});


//var windowwidth = $( ".photo-browser-swiper-container" ).width();


 $( ".photo-browser-slide img" ).css( "-webkit-filter","grayscale(80%)" );
 $( ".photo-browser-caption" ).css( "margin-top", "-10px" );
$( ".photo-browser-caption" ).empty();
    $( ".nametag" ).empty();


myPhotoBrowser.swiper.slideTo(to_open,100);

checkMatch(targetid);



questions();

 
if (openprofile ===0){



   
   
   if (myPhotoBrowser.swiper.isBeginning === true){$( ".prevphoto" ).addClass( "disabled" );}
   else{$( ".prevphoto" ).removeClass( "disabled" );}
      if (myPhotoBrowser.swiper.isEnd === true){$( ".nextphoto" ).addClass( "disabled" );}
      else{$( ".nextphoto" ).removeClass( "disabled" );}
 
 
   
//var windowheight = $( window ).height();
//$( ".photo-browser-slide img").css( "height", "100% - 144px)" );
$( ".photo-browser-caption" ).empty();
 $( ".nametag" ).empty();




$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;


         var target = new_all[myPhotoBrowser.activeIndex].url;
        var pretarget = target.replace("https://graph.facebook.com/", ""); 
        targetid = String(pretarget.replace("/picture?width=828", ""));


$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );
 //$( ".photo-browser-slide.swiper-slide-active img" ).css( "height", "100% - 144px)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();

$( ".toolbardecide" ).show();



$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );

var activecircle;




var targetdescription= new_all[myPhotoBrowser.activeIndex].description;
targetname = new_all[myPhotoBrowser.activeIndex].name;  
var targetage = new_all[myPhotoBrowser.activeIndex].age;  
$( ".agecat" ).text(targetage); 
  $( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+targetname+', '+targetage+'</span>');
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(targetdescription);
    myApp.sizeNavbars();



//may need to readd





}



}

function showProfile(){
$( ".profile-info" ).show();    


}

function hideProfile(){
$( ".profile-info" ).hide();    
    
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
var time;
if (pickerCustomToolbar.cols[0].displayValue =='Now'){time='';}
else if (pickerCustomToolbar.cols[0].displayValue =='Today'){

var daterequestnow = new Date;
var hournow = daterequestnow.getHours();



if((pickerCustomToolbar.cols[0].displayValue =='Morning') && (hournow >= '12')){time='';}
else if((pickerCustomToolbar.cols[0].displayValue =='Mid-day') && (hournow > '14')){time='';}
else if((pickerCustomToolbar.cols[0].displayValue =='Afternoon') && (hournow > '17')){time='';}
else{time = pickerCustomToolbar.cols[1].value;}

}
else{time = pickerCustomToolbar.cols[1].value;}




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



}

if (d_type == 'duck'){
    
    if ($( '.button-my' ).hasClass( "active" )){interestarray = 'my'}
     if ($( '.button-your' ).hasClass( "active" )){interestarray = 'your'}
    
}



firebase.database().ref("dates/" + f_uid +'/' + targetid).set({
    created_uid: f_uid,
    created_name: f_first,
    received_uid:targetid,
    received_name:targetname,
	to_picture:targetpicture,
	   from_picture:f_image,
    timestamp:unix,
    day:day,
    time:time,
    chat_expire:chat_expire,
    seen:'N',
    interest:interestarray,
    response:'W',
    type:d_type,
    message:datemessageq,
    authcheck:f_uid
  });

firebase.database().ref("dates/" + targetid +'/' + f_uid).set({
    created_uid: f_uid,
    created_name: f_first,
    received_uid:targetid,
    received_name:targetname,
	to_picture:targetpicture,
	   from_picture:f_image,
    timestamp:unix,
    day:day,
    time:time,
    chat_expire:chat_expire,
    seen:'N',
    interest:interestarray,
    response:'W',
    type:d_type,
    message:datemessageq,
    authcheck:f_uid
  });


	sendNotification(targetid,2);


var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + targetid).remove();
       firebase.database().ref("notifications/" + targetid + '/' + f_uid).remove();
    
    
    
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
     
       messageq ++;
       
       
       
    }
       
       
       


       
   }


  
});  
}



newNotification();

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
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:smessage,
    timestamp: t_unix,
    type:d_type,
    param:'daterequest',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire,
    authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

  return firebase.database().ref().update(updates).then(function() {
      
      if(d_response=='Y') {chatShow();}
else {reverseRequest();}
      
  });
}










}

var d_interest,d_day,d_chat_expire,d_time,d_response,d_type,d_timestamp,d_dateseen,d_dateseentime,d_timeaccepted;

function existingDate(){

$( ".datearea" ).empty();

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

// Test if user exists
var ref = firebase.database().ref("dates/" + f_uid +'/' + targetid);



ref.once("value")
  .then(function(snapshot) {
  var dateexists = snapshot.child('chat_expire').exists(); // true
    
    if (dateexists) {
    
        
 var unix = Math.round(+new Date()/1000);
  if (Number(snapshot.child('chat_expire').val()) > Number(unix) ) {
      
      d_chat_expire = snapshot.child('chat_expire').val();
       d_interest = snapshot.child('interest').val();
       d_type = snapshot.child('type').val();
      d_day = snapshot.child('day').val();
      d_time = snapshot.child('time').val();
      d_response = snapshot.child('response').val();
      if (snapshot.child('time_accepted').exists()){ d_timeaccepted = snapshot.child('time_accepted').val();}
      d_created_uid = snapshot.child('created_uid').val();
      d_timestamp = snapshot.child('timestamp').val();

      d_dateseen = snapshot.child('dateseen').val();
        d_dateseentime = snapshot.child('dateseentime').val();
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
         d_timeaccepted;
          d_dateseen = false;
      d_dateseentime = false;
       d_timestamp = false;

     
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

    var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

    var stringnow = new Date();
    var stringyestday = new Date(Date.now() - 86400);
    var todaystring = weekday[stringnow.getDay()] + ', ' + month[stringnow.getMonth()] + ' ' + stringnow.getDate(); 
        var yesterdaystring = weekday[stringyestday.getDay()] + ', ' + month[stringyestday.getMonth()] + ' ' + stringyestday.getDate();

var datechatstring;

var messagedate = new Date();

var minstag = ('0'+messagedate.getMinutes()).slice(-2);


messagetimetitle = messagedate.getHours() + ':' + minstag;


var messagedaytitle = weekday[messagedate.getDay()] + ', ' + month[messagedate.getMonth()] + ' ' + messagedate.getDate(); 
if (!prevdatetitle){prevdatetitle = messagedaytitle;console.log('prevdatetitle does not exist');

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}
else {

if (prevdatetitle == messagedaytitle){console.log('it is the same day');datechatstring='';}
else{console.log('it is a different day');prevdatetitle = messagedaytitle;

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}

}

var newmessage = $( "#messagearea" ).val();
if (newmessage === ''){return false;}

conversation_started = true;

var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var t_unix = Math.round(+new Date()/1000);


firebase.database().ref("chats/" + first_number+ '/' + second_number).push({
    from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:newmessage,
    seen:'N',
    timestamp: t_unix,
    type: d_type,
    param:'message',
        authcheck:f_uid
  });
  
  
  
    myMessages.addMessage({
    // Message text
    text: newmessage,
    // Random message type
    type: 'sent',
    // Avatar and name:
   // avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
        day:datechatstring,
    label: 'Sent ' + messagetimetitle
  });

	
//myMessagebar.clear();
  var messageq;
var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();



//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){
//alert('yo3');
$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){

//alert(obj.param);
 //   alert(obj.received);

   
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
   // alert('param'+obj.param);
   // alert('new_message_count'+obj.new_message_count);
    
    if (obj.param =='message'){
       messageq = obj.new_message_count;
       messageq ++;}
    else{
       messageq = 1;
       }

       
    }
       
       
           firebase.database().ref("notifications/" + f_uid + '/' + targetid).remove();
       firebase.database().ref("notifications/" + targetid + '/' + f_uid).remove();


       
   }


  
});  
}



newNotification(messageq);

});

function newNotification(messagenum){
//alert('messagenum'+messagenum);


if (!messagenum) {messagenum = 1;}
//alert(messagenum);
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;

   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:newmessage,
    timestamp: t_unix,
    type:d_type,
    param:'message',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire,
        authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

  return firebase.database().ref().update(updates);
}
 


$( "#messagearea" ).val('');
    $( ".sendbutton" ).removeClass('disabled');

        $( ".sendbutton" ).css('color','white');
	sendNotification(targetid,4);

}

function clearchatHistory(){
singlefxallowed = true;
messages_loaded = false;

if (main_all[0] != null){
new_all = main_all;

}
singleuserarray = [];

letsload = 20;
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}
if (message_history){

//firebase.database().ref("notifications/" + f_uid).off('value', existingchatnotifications);


firebase.database().ref("chats/" + first_number+ '/' + second_number).off('child_added', message_historyon);
if(additions>0){
for (i = 0; i < additions.length; i++) { 
   firebase.database().ref("chats/" + first_number+ '/' + second_number).off('child_added', newmessage_history);
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

  firebase.database().ref("dates/" + f_uid +'/' + targetid).off('value', datealert);
 


}

datealertvar = false;

if ($$('body').hasClass('with-panel-left-reveal')) {

$(".timeline").empty();

rightPanel();

}


if ($$('body').hasClass('with-panel-right-reveal')) {
    myList.deleteAllItems();
myList.clearCache();
    leftPanel();
}

}

   function dateConfirmationPage(details){
          $( ".datetoolbar" ).show();

	   canloadchat = false;
          var g = new Date(d_chat_expire*1000 - 3600);

	   
	    $( ".profileyomain" ).hide();
	   $( ".avail-loader" ).hide();
var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var gday = weekday[g.getDay()];
var proposeddate =  g.getDate();
var month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";



var messageclass;
if (d_created_uid == f_uid){messageclass="message-sent";messagestyle="";}
else{messageclass = "message-received";messagestyle="margin-left:70px;";}



var proposedmonth = month[g.getMonth()];
var proposedyear = g.getFullYear();
var dending;
if (proposeddate == '1' || proposeddate == '21' || proposeddate == '31'){dending = 'st'}
else if (proposeddate == '2' || proposeddate == '22'){dending = 'nd'}
else if (proposeddate == '3' || proposeddate == '23'){dending = 'rd'}
else {dending = 'th'}

          
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
var namefromdate;
var nametodate;

if (d_created_uid == f_uid){namefromdate = f_first;nametodate = targetname;}
else{nametodate = f_first;namefromdate = targetname;}



var whatrow;
var dateseentitle;
var timestamptitle;
var capitalD;
if (d_type =='duck'){titleblock = '<span style="font-family: \'Pacifico\', cursive;">Duck Request</span>';whatrow = 'Duck';capitalD = 'Duck';}
if (d_type =='date'){titleblock = '<span style="font-family: \'Pacifico\', cursive;">Date Request</span>';whatrow = 'Date';capitalD = 'Date';}

var unixnow = Math.round(+new Date()/1000);
var tunixago = unixnow - d_timestamp;
var tunixminago = tunixago / 60;

if (tunixminago < 1) {timestamptitle = 'Sent less than 1 minute ago';}
else if (tunixminago == 1) {timestamptitle = 'Sent 1 minute ago';}
else if (tunixminago < 2) {timestamptitle = 'Sent 1 minute ago';}
else if (tunixminago < 60) {timestamptitle = 'Sent '+Math.round(tunixminago)+' minutes ago';}

else if (tunixminago == 60) {timestamptitle = 'Sent 1 hour ago';}
else if (tunixminago < 62) {timestamptitle = 'Sent 1 hour ago';}
else if (tunixminago < 1440) {timestamptitle = 'Sent '+Math.round(tunixminago / 60) +' hours ago';}
else if (tunixminago == 1440) {timestamptitle = 'Sent 1 day ago';}
else if (tunixminago < 2880) {timestamptitle = 'Sent 1 day ago';}
else if (tunixminago >= 2880) {timestamptitle = 'Sent '+Math.round(tunixminago / 1440) +' days ago';}

if (d_dateseen){

var unixago = unixnow - d_dateseentime;
var unixminago = unixago / 60;



if (unixminago < 1) {dateseentitle = 'Seen less than 1 minute ago';}
else if (unixminago == 1) {dateseentitle = 'Seen 1 minute ago';}
else if (unixminago < 2) {dateseentitle = 'Seen 1 minute ago';}
else if (unixminago < 60) {dateseentitle = 'Seen '+Math.round(unixminago)+' minutes ago';}
else if (unixminago == 60) {dateseentitle = 'Seen 1 hour ago';}
else if (unixminago < 62) {dateseentitle = 'Seen 1 hour ago';}
else if (unixminago < 1440) {dateseentitle = 'Seen '+Math.round(unixminago / 60) +' hours ago';}
else if (unixminago == 1440) {dateseentitle = 'Seen 1 day ago';}
else if (unixminago < 2880) {dateseentitle = 'Seen 1 day ago';}
else if (unixminago >= 2880) {dateseentitle = 'Seen '+Math.round(unixminago / 1440) +' days ago';}
}
else{dateseentitle = 'Request not seen yet';}






myApp.sizeNavbars(); 
          var messagedateblock;
          if (d_message){
              messagedateblock='<li><div class="item-content"><div class="item-inner"><div class="messages-content"><div class="messages messages-init" data-auto-layout="true" style="width:100%;clear:both;">             <div class="item-title label" style="width:80px;float:left;margin-top:10px;text-align:left;">Message</div><div class="message '+messageclass+' message-with-avatar message-appear-from-top message-last message-with-tail" style="'+messagestyle+'clear:both;text-align:left;"><div class="message-text">'+d_message+'</div><div class="message-avatar" style="background-image:url(https://graph.facebook.com/'+d_created_uid+'/picture?type=normal)"></div></div></div></div></div></div></li><li style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>';
            }
            else {messagedateblock='';}
          
          if (d_time) {timedisplay = ', ' + d_time}
          else {timedisplay='';}
          
          if (details){
          
          var junixago = unixnow - d_timeaccepted;
var junixminago = junixago / 60;
var acceptedtitle;
if (junixminago < 1) {acceptedtitle = 'Confirmed less than 1 minute ago';}
else if (junixminago == 1) {acceptedtitle = 'Confirmed 1 minute ago';}
else if (junixminago < 2) {acceptedtitle = 'Confirmed 1 minute ago';}
else if (junixminago < 60) {acceptedtitle = 'Confirmed '+Math.round(junixminago)+' minutes ago';}

else if (junixminago == 60) {acceptedtitle = 'Confirmed 1 hour ago';}
else if (junixminago < 62) {acceptedtitle = 'Confirmed 1 hour ago';}
else if (junixminago < 1440) {acceptedtitle = 'Confirmed '+Math.round(junixminago / 60) +' hours ago';}
else if (junixminago == 1440) {acceptedtitle = 'Confirmed 1 day ago';}
else if (junixminago < 2880) {acceptedtitle = 'Confirmed 1 day ago';}
else if (junixminago >= 2880) {acceptedtitle = 'Confirmed '+Math.round(junixminago / 1440) +' days ago';}

$( ".date1-close" ).hide();
          $( ".date2-close" ).show();
$( ".date-close" ).hide();
            $( ".date-back" ).hide();

$( ".datetoolbar" ).show();
        $( ".sender-inner" ).show();
        $( ".yes-inner" ).hide();
                //$( ".datetoolbar" ).css("background-color","#ccc");
                
        $( ".waitingreply" ).empty();
                $( ".datedetailsdiv" ).hide();
        
         $( ".requestbutton" ).remove();
         $( ".requesticon" ).remove();
        
         
         $( ".waitingreply" ).append(
        '<div style="background-color:#4cd964;padding:10px;text-align:center;font-size:20px;color:white;"><span style="font-family: \'Pacifico\', cursive;">'+capitalD+' Details</span></div>'+
        '<div class="list-block media-list" onclick="request();" style="margin-top:0px;"><ul style="background-color:white;padding-bottom:10px;">'+
        
    '<img src="media/'+d_type+'faceonly.png" style="height:60px;margin-top:15px;">'+

    
        '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">When?</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+gday+timedisplay+'" readonly>'+
                        '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+proposeddate + dending + ' '+ proposedmonth + ' ' + proposedyear +'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
     
         '<li class="interestli" style="display:none;">'+
      '<div class="item-content">'+

       ' <div class="item-inner" style="padding-top:15px;padding-bottom:15px;">'+
         ' <div class="item-title label" style="float:left;width:70px;text-align:left;">Where?</div>'+
          '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
   '<span class="interestdiv" style="float:left;text-align:center;"></span>'+
          '</div>'+
        '</div>'+
      '</div>'+
   ' </li>'+
   '<li class="interestli" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+
 




              '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">From</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+

            '<input type="text" name="name"  value="'+namefromdate+'" readonly>'+

                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+timestamptitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
 
                                  messagedateblock +
 
  '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">To</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+nametodate+'" readonly>'+
                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+acceptedtitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
   
  
        '<li class="" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+
     


     
    '</ul>'+
'</div>'

);
          
          $( ".titleconfirm" ).show();
         $( ".titleconfirm" ).html(capitalD + ' confirmed');
          $( ".infoconfirm" ).html('You can continue chatting until midnight of your scheduled '+d_type);
          }
          
            else if (d_created_uid == f_uid) {
                
                $( ".datetoolbar" ).show();
        $( ".sender-inner" ).show();
        $( ".yes-inner" ).hide();
                //$( ".datetoolbar" ).css("background-color","#ccc");
                
        $( ".waitingreply" ).empty();
                $( ".datedetailsdiv" ).hide();
        
         $( ".requestbutton" ).remove();
         $( ".requesticon" ).remove();
                $( ".titleconfirm" ).show();
         $( ".titleconfirm" ).html('Waiting for '+targetname+' to respond');
         
         $( ".waitingreply" ).append(
        '<div style="background-color:#ff9500;padding:10px;text-align:center;font-size:20px;color:white;">'+titleblock+'</div>'+
        '<div class="list-block media-list" onclick="request();" style="margin-top:0px;"><ul style="background-color:white;padding-bottom:10px;">'+
        
        '<img src="media/'+d_type+'faceonly.png" style="height:60px;margin-top:15px;">'+

    
        '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">When?</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+gday+timedisplay+'" readonly>'+
                        '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+proposeddate + dending + ' '+ proposedmonth + ' ' + proposedyear +'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
     
         '<li class="interestli" style="display:none;">'+
      '<div class="item-content">'+

       ' <div class="item-inner" style="padding-top:15px;padding-bottom:15px;">'+
         ' <div class="item-title label" style="float:left;width:70px;text-align:left;">Where?</div>'+
          '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
   '<span class="interestdiv" style="float:left;text-align:center;"></span>'+
          '</div>'+
        '</div>'+
      '</div>'+
   ' </li>'+
   '<li class="interestli" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+
 




   
  
              '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">From</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+namefromdate+'" readonly>'+
                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+timestamptitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
         messagedateblock +
  '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">To</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+nametodate+'" readonly>'+
                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+dateseentitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
     
     
        '<li class="" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+


     
    '</ul>'+
'</div>'

);
         
  


  
          }
          else{
            
            if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var unix = Math.round(+new Date()/1000);

firebase.database().ref("dates/" + f_uid +'/' + targetid).update({



    dateseen:'Y',
    dateseentime:unix
  });

firebase.database().ref("dates/" + targetid +'/' + f_uid).update({



    dateseen:'Y',
    dateseentime:unix
  });
  
  firebase.database().ref("notifications/" + f_uid +'/' + targetid).update({



    dateseen:'Y',
    dateseentime:unix
  });

firebase.database().ref("notifications/" + targetid +'/' + f_uid).update({



    dateseen:'Y',
    dateseentime:unix
  });

            
            $( ".datetoolbar" ).show();
        $( ".sender-inner" ).hide();
        $( ".yes-inner" ).show();
        $( ".waitingreply" ).empty();
        $( ".datedetailsdiv" ).hide();
         $( ".requestbutton" ).remove();
          $( ".requesticon" ).remove();
                  $( ".titleconfirm" ).show();
           $( ".titleconfirm" ).html(targetname+' is waiting for your response');
          
         $( ".waitingreply" ).append(
               '<div style="background-color:#ff9500;padding:10px;text-align:center;font-size:20px;color:white;">'+titleblock+'</div>'+
        '<div class="list-block media-list" onclick="request();" style="margin-top:0px;"><ul style="background-color:white;padding-bottom:10px;">'+
        
    '<img src="media/'+d_type+'faceonly.png" style="height:60px;margin-top:15px;">'+

    
        '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">When?</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+gday+timedisplay+'" readonly>'+
                        '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+proposeddate + dending + ' '+ proposedmonth + ' ' + proposedyear +'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
     
         '<li class="interestli" style="display:none;">'+
      '<div class="item-content">'+

       ' <div class="item-inner" style="padding-top:15px;padding-bottom:15px;">'+
         ' <div class="item-title label" style="float:left;width:70px;text-align:left;">Where?</div>'+
          '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
   '<span class="interestdiv" style="float:left;text-align:center;"></span>'+
          '</div>'+
        '</div>'+
      '</div>'+
   ' </li>'+
   '<li class="interestli" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+
 




           
              '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">From</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+namefromdate+'" readonly>'+
                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+timestamptitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
         messagedateblock +   
  '<li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
'             <div class="item-title label" style="width:70px;float:left;text-align:left;">To</div>'+
             '<div class="item-input" style="float:left;width:calc(100% - 80px);">'+
            '<input type="text" name="name"  value="'+nametodate+'" readonly>'+
                                    '<input type="text" name="name" placeholder="Your name" style="color:#666;font-size:15px;clear:both;float:left;margin-top:-20px;" value="'+dateseentitle+'" readonly>'+

          '</div>'+





   
    '        </div></div>'+
    
     '   </li>'+
    

          '<li class="" style="height:0px;overflow:hidden;"><div class="item-content"><div class="item-inner"></div></div></li>'+

     
     

  
    '</ul>'+
'</div>'
              
               
);

          }
  
  

if (d_interest && d_type =='duck'){
    $( ".interestli").show();
    if ((d_interest == 'my') && (d_created_uid == f_uid)){$( ".interestdiv").append('<div style="font-size:15px;margin-top:10px;">At '+f_first+'\'s place </div>');}
    if ((d_interest == 'my') && (d_created_uid != f_uid)){$( ".interestdiv").append('<div style="font-size:15px;margin-top:10px;">At '+targetname+'\'s place </div>');}
        if ((d_interest == 'your') && (d_created_uid == f_uid)){$( ".interestdiv").append('<div style="font-size:15px;margin-top:10px;">At '+targetname+'\'s place </div>');}
    if ((d_interest == 'your') && (d_created_uid != f_uid)){$( ".interestdiv").append('<div style="font-size:15px;margin-top:10px;">At '+f_first+'\'s place </div>');}
    
}
if (d_interest && d_type =='date'){

for (i = 0; i < d_interest.length; i++) { 

    
    $( ".interestli").show();
  $( ".interestdiv").append('<a href="#" style="margin-right:5px"><i class="twa twa-2x twa-'+d_interest[i]+'" style="margin-top:5px;margin-right:5px"></i></a>');  
    

    
}
    
    
}
  
  }

function acceptDate(){
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

var unix = Math.round(+new Date()/1000);


 $( ".sender-inner" ).hide();
  $( ".yes-inner" ).hide();



var datemessageq = $( '#datemessageq' ).val();

var unix = Math.round(+new Date()/1000);
var day = pickerCustomToolbar.cols[0].displayValue;
var time;
if (pickerCustomToolbar.cols[0].displayValue =='Now'){time='';}
else if (pickerCustomToolbar.cols[0].displayValue =='Today'){

var daterequestnow = new Date;
var hournow = daterequestnow.getHours();



if((pickerCustomToolbar.cols[0].displayValue =='Morning') && (hournow >= '12')){time='';}
else if((pickerCustomToolbar.cols[0].displayValue =='Mid-day') && (hournow > '14')){time='';}
else if((pickerCustomToolbar.cols[0].displayValue =='Afternoon') && (hournow > '17')){time='';}
else{time = pickerCustomToolbar.cols[1].value;}

}
else{time = pickerCustomToolbar.cols[1].value;}




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



}

if (d_type == 'duck'){
    
    if ($( '.button-my' ).hasClass( "active" )){interestarray = 'my'}
     if ($( '.button-your' ).hasClass( "active" )){interestarray = 'your'}
    
}




  

  
  firebase.database().ref("dates/" + f_uid +'/' + targetid).update({



    response: 'Y',
    time_accepted: unix,
    uid_accepted: f_uid,
        authcheck:f_uid
  });

firebase.database().ref("dates/" + targetid +'/' + f_uid).update({



    response: 'Y',
    time_accepted: unix,
    uid_accepted: f_uid,
        authcheck:f_uid
  });
  


	sendNotification(targetid,3);





var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   

    
    
  
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       console.log(messageq);
       messageq ++;
       
    
       
    }
       
       
       


       
   


  
});  
}



newNotification();

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
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:'Date scheduled',
    timestamp: t_unix,
    type:d_type,
    param:'dateconfirmed',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire,
        authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

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
firebase.database().ref("dates/" + f_uid +'/' + targetid).remove().then(function() {
  // File deleted successfully
  $( ".datearea" ).empty();


 d_chat_expire = false;
       d_interest = false;
      d_day = false;
      d_time = false;
      d_response = false;
      d_timeaccepted = false;
      d_created_uid = false;
      d_timestamp = false;
      d_dateseen = false;
      d_dateseentime = false;
      d_message = false;
      
 noMessages();
 setDate();
  
  console.log('deleted');
  
}).catch(function(error) {
  // Uh-oh, an error occurred!
});       

// Delete the file
firebase.database().ref("dates/" + targetid +'/' + f_uid).remove().then(function() {
  // File deleted successfully

  console.log('deleted');
  
}).catch(function(error) {
  // Uh-oh, an error occurred!
});

	sendNotification(targetid,6);

	
var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   

    
    

    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
      
       messageq ++;
       
    
       
    }
       
       
       


       



  
});  
}



newNotification();

});

function newNotification(messagenum){



if (!messagenum) {messagenum = 1;}

var smessage;
if (d_type=='duck'){smessage = 'Duck cancelled'}
if (d_type=='date'){smessage = 'Date cancelled'}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);
   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:smessage,
    timestamp: t_unix,
    type:d_type,
    param:'datedeleted',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire,
    authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

  return firebase.database().ref().update(updates).then(function() {
console.log('delete notification sent');
      
  });
}
       
}


function getPicture(key){

   var weekday = [];
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

    var stringnow = new Date();
    var stringyestday = new Date(Date.now() - 86400);
    var todaystring = weekday[stringnow.getDay()] + ', ' + month[stringnow.getMonth()] + ' ' + stringnow.getDate(); 
        var yesterdaystring = weekday[stringyestday.getDay()] + ', ' + month[stringyestday.getMonth()] + ' ' + stringyestday.getDate();

var datechatstring;

var messagedate = new Date();

var minstag = ('0'+messagedate.getMinutes()).slice(-2);


messagetimetitle = messagedate.getHours() + ':' + minstag;


var messagedaytitle = weekday[messagedate.getDay()] + ', ' + month[messagedate.getMonth()] + ' ' + messagedate.getDate(); 
if (!prevdatetitle){prevdatetitle = messagedaytitle;console.log('prevdatetitle does not exist');

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}
else {

if (prevdatetitle == messagedaytitle){console.log('it is the same day');datechatstring='';}
else{console.log('it is a different day');prevdatetitle = messagedaytitle;

if (messagedaytitle == todaystring){datechatstring = 'Today';}
else if (messagedaytitle == yesterdaystring){datechatstring = 'Yesterday';}
else{datechatstring = messagedaytitle;}

}

}


var t_unix = Math.round(+new Date()/1000);
var returned = 0;  

var postkeyarray = [];

    var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;} 

    
    
  var eventy = document.getElementById('takePictureField_').files[0];

//  var number_of_pictures = $(".imageli").length + 1;
  if (eventy == 'undefined') {console.log('undefined');}
  if (eventy !== 'undefined') {

for (i = 0; i < document.getElementById('takePictureField_').files.length; i++) { 

    var photoname = t_unix + i;

var newValue = firebase.database().ref().push().key;

    postkeyarray.push(newValue);

  myMessages.addMessage({
    // Message text
    text: '<img class="disabled image_'+newValue+'" src="'+URL.createObjectURL($('#takePictureField_').prop('files')[i])+'" onload="$(this).fadeIn(700);scrollBottom();" onclick="imagesPopup(\''+newValue+'\');" style="display:none;-webkit-filter: blur(50px);">',
    // Random message type
    type: 'sent',
    // Avatar and name:
  //  avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first,
            day:datechatstring,


    label:'<i class="twa twa-bomb"></i> Images disappear after 24 hours. Sent ' + messagetimetitle
  });
    
    

    
    

            //$("#dealimagediv_"+imagenumber).attr("src",URL.createObjectURL(eventy));
         
image_count ++;

        








//$('.image_' + t_unix).onclick = function(){ 
//   openPhoto(url);};

//var randomstring = (Math.random() +1).toString(36).substr(2, 30);




var photochatspath = 'photochats/' + first_number + '/' + second_number + '/'+ photoname;
var photostorage = 'images/' + f_auth_id + '/' +  photoname;

var photochatsRef = storageRef.child(photostorage);

photochatsRef.put($('#takePictureField_').prop('files')[i]).then(function(snapshot) {
  
    

    
    var photodownloadstorage = 'images/' + f_auth_id + '/' +  snapshot.metadata.name;

var photodownloadRef = storageRef.child(photodownloadstorage);
    
  photodownloadRef.getDownloadURL().then(function(url) {

returned ++;




      
      
var newPostKey = postkeyarray[(returned-1)];
    

      
conversation_started = true;
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}



var chatvar = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
    message:'<img src="'+url+'" onload="$(this).fadeIn(700);" style="display:none" >',
    seen:'N',
    timestamp:  snapshot.metadata.name,
    type:d_type,
    param:'image',
    downloadurl:url,
    first_number:first_number,
    second_number:second_number
   };

var photovar1 = {
    id:newPostKey,
      uid: f_uid,
    user_name: f_first,
    photo_name:photostorage,
 downloadurl:url,
 to_uid:targetid,
 from_uid: f_uid,
    first_number:first_number,
    second_number:second_number,
    folder:f_auth_id
};

var photovar2 = {
    id:newPostKey,
      uid: f_uid,
    user_name: f_first,
 downloadurl:url,
 to_uid:targetid,
 from_uid: f_uid,
    first_number:first_number,
    second_number:second_number
};



firebase.database().ref("chats/" + first_number+ '/' + second_number + '/' + newPostKey).set(chatvar);
firebase.database().ref("photostodelete/" + f_uid + '/' + targetid + '/' + newPostKey).set(photovar1);
firebase.database().ref("photochats/" + first_number+ '/' + second_number + '/' + newPostKey).set(photovar2);

     $(".image_"+newPostKey).attr("src", url); 
 $('.image_'+ newPostKey).removeClass("disabled");
      $('.image_'+ newPostKey).css("-webkit-filter","none");

  

  
  });
  
  
});
}
 
	  sendNotification(targetid,5);
	  
var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq;

//If existing notifications, get number of unseen messages, delete old notifications


if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + targetid).remove();
       firebase.database().ref("notifications/" + targetid + '/' + f_uid).remove();
    
    
    console.log(obj.received);
    console.log(obj.from_uid);
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       
       messageq ++;
       
       
       
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
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:'Image ',
    timestamp: t_unix,
    type:d_type,
    param:'image',
    new_message_count:messagenum,
    received:'N',
    expire:d_chat_expire,
        authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

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
               ' <input type="file" size="70" accept="image/*" class="dealPictureField imagenotchosen" id="takePictureField_" onchange="getPicture();" style="background-color:transparent;color:transparent;float:left;cursor: pointer;height:60px;width:100%;z-index:1;opacity:0;background-color:red;height:88px;margin-top:-44px;" multiple="multiple"> '+

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
   // avatar: 'https://graph.facebook.com/'+f_uid+'/picture?type=normal',
    name: f_first
    // Day
   // day: !conversationStarted ? 'Today' : false,
   // time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
 


firebase.database().ref("chats/" + first_number+ '/' + second_number).push({
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
var xcountdown;
function imagesPopup(go){

   if ($('.gallery-popupz').length > 0) {return false;}
  var goz;

 var popupHTML = '<div class="popup gallery-popupz">'+
                   
                   '<div class="navbar" style="position:absolute;top:0;background-color:#2196f3;color:white;">'+
 '   <div class="navbar-inner">'+
  '      <div class="left"><a href="#" onclick="closeGallery();" class="link icon-only"><i class="pe-7s-angle-left pe-3x" style="margin-left:-10px;color:white;"></i> </a></div>'+
   '     <div class="center gallerytitle"></div>'+
    '    <div class="right photo-count"></div>'+
    '</div>'+
'</div>'+
                   '<div class="pages">'+
'<div data-page="gallerypopup" class="page">'+
'<div class="page-content" style="background-color:white;">'+
  '<div style="position:absolute;bottom:12px;right:8px;z-index:99999;background-color:white;border-radius:5px;padding:5px;"><div id="photodeletechattime" style="color:black;float:left;"></div></div>'+

                                    '<span style="width:42px; height:42px;position:absolute;top:50%;margin-top:-21px;left:50%;margin-left:-21px;z-index:999999;" class="imagespopuploader preloader"></span> '+
'<div class="swiper-container swiper-gallery" style="height: calc(100% - 44px);margin-top:44px;">'+

   ' <div class="swiper-wrapper gallery-wrapper">'+



   ' </div>'+
   '</div>'+
    
       '<div class="swiper-pagination-gallery" style="position:absolute;bottom:0;left:0;z-index:999999;width:100%;height:4px;"></div>'+

    '</div></div></div>'+
    
                  '</div>';
  myApp.popup(popupHTML);    

var first_number,second_number;
var gallerycount;
if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}
var galleryimagecount = 0;

var photodeletetime;
var phototo;
var photofrom;
var photochatid;
var touid;
firebase.database().ref("photochats/" + first_number+ '/' + second_number).once("value")
  .then(function(snapshot) {
      
 
      gallerycount = snapshot.numChildren();
      
      var objs = snapshot.val();

$.each(objs, function(i, obj) {
   if (obj.id == go){goz = galleryimagecount;} 
   var expiryval;
    if (obj.photo_expiry == null){expiryval = i;}
    else {expiryval = obj.photo_expiry;}
    
          $( ".gallery-wrapper" ).append(' <div class="swiper-slide photochat_'+obj.photo_expiry+'" style="height:100%;">'+
          '<div class="swiper-zoom-container">'+
            
          '<img data-src="'+obj.downloadurl+'" class="swiper-lazy" style="width:100%;" onload="$(this).fadeIn(700);hideImagespopuploader();">'+
           ' <div class="swiper-lazy-preloader"></div></div><input type="hidden" class="photoexpiryhidden_'+galleryimagecount+'" value="'+expiryval +'"><input type="text" class="fromhidden_'+galleryimagecount+'" value="'+obj.from_uid+'"><input type="text" class="tohidden_'+galleryimagecount+'" value="'+obj.user_name+'"><input type="text" class="idhidden_'+galleryimagecount+'" value="'+i+'"><input type="text" class="toidhidden_'+galleryimagecount+'" value="'+obj.to_uid+'"></div>');

    galleryimagecount ++;
    
});
     
var galleryswiper =   myApp.swiper('.swiper-gallery', {
    preloadImages: false,
    lazyLoadingInPrevNext:true,
    // Enable lazy loading
    lazyLoading: true,
    watchSlidesVisibility:true,
    zoom:true,
    onInit:function(swiper){var slidenum = swiper.activeIndex + 1;
 
      photodeletetime = $( ".photoexpiryhidden_" + swiper.activeIndex).val();
phototo = $( ".tohidden_" + swiper.activeIndex).val();
photofrom = $( ".fromhidden_" + swiper.activeIndex).val();
photochatid = $( ".idhidden_" + swiper.activeIndex).val();
touid = $( ".toidhidden_" + swiper.activeIndex).val();



if (photodeletetime == photochatid){document.getElementById("photodeletechattime").innerHTML = '<div style="width:29px;height:29px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+touid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;margin-right:5px;float:left;margin-right:5px;"></div> <span style="float:left;margin-top:5px;">Photo unseen</span>';}
else{photodeletecount();}

$( ".gallerytitle").html('<div style="width:29px;height:29px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+photofrom+'/picture?type=normal\');background-size:cover;background-position:50% 50%;margin-right:5px;"></div>' + phototo);
    },
    onSlideChangeStart:function(swiper){clearInterval(xcountdown);
         
                
         var slidenum = galleryswiper.activeIndex + 1;
  photodeletetime = $( ".photoexpiryhidden_" + swiper.activeIndex).val();photodeletecount();
phototo = $( ".tohidden_" + swiper.activeIndex).val();
photofrom = $( ".fromhidden_" + swiper.activeIndex).val();
photochatid = $( ".idhidden_" + swiper.activeIndex).val();
touid = $( ".toidhidden_" + swiper.activeIndex).val();

if (photodeletetime == photochatid){document.getElementById("photodeletechattime").innerHTML = '<div style="width:29px;height:29px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+touid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;margin-right:5px;float:left;margin-right:5px;"></div> <span style="float:left;margin-top:5px;">Photo unseen</span>';}
else{photodeletecount();deletePhotochat();}



  


$( ".gallerytitle").html('<div style="width:29px;height:29px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+photofrom+'/picture?type=normal\');background-size:cover;background-position:50% 50%;margin-right:5px;"></div>' + phototo);
        myApp.sizeNavbars();
    },
    pagination:'.swiper-pagination-gallery',
      paginationType:'progress'
  });
      
  

  
  galleryswiper.slideTo(goz,0);
  myApp.sizeNavbars();
  });

function deletePhotochat(){
if (photodeletetime < (new Date().getTime() / 1000)){
alert('deleting only photochat');
$( ".photochat_"+ photodeletetime).remove();
galleryswiper.update();
firebase.database().ref("photochats/" + first_number+ '/' + second_number + '/' + photochatid).remove();
firebase.database().ref("chats/" + first_number+ '/' + second_number + '/' + photochatid).remove();

}
}

function photodeletecount(){


var countDownDate = new Date(photodeletetime * 1000);

// Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("photodeletechattime").innerHTML = '<i class="twa twa-bomb twa-lg" style="float:left;"></i>' + hours + "h "
  + minutes + "m " ;

// Update the count down every 1 second
xcountdown = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);




  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(xcountdown);

deletePhotochat();

  }
  
   else{ document.getElementById("photodeletechattime").innerHTML = '<i class="twa twa-bomb twa-lg" style="float:left;"></i>' +hours + "h "
  + minutes + "m " ;myApp.sizeNavbars();}
  
}, 60000);

}



}

function hideImagespopuploader(){  $( ".imagespopuploader" ).hide();}

function closeGallery(){
    
    myApp.closeModal('.gallery-popupz');
    clearInterval(xcountdown);

}

function updateOnce(){

var uids = ["1381063698874268","1394352877264527","393790024114307","4"];


firebase.database().ref('users/' + f_uid).update({
    date_me:uids
  });
    
}

function updatePhotos(){





$( ".pp" ).each(function() {
  


  
  var classList = $(this).attr("class").split(' ');
  var idofphoto = classList[2].replace("photo_", "");


var index1 = f_date_match.indexOf(idofphoto);
var index2 = f_duck_match.indexOf(idofphoto);


var u_date_me = f_date_me.indexOf(idofphoto);
var u_to_date = f_to_date.indexOf(idofphoto);

var u_duck_me = f_duck_me.indexOf(idofphoto);
var u_to_duck = f_to_duck.indexOf(idofphoto);


if (index2 > -1) {
    


        
        if ($( '.rr').hasClass('r_' + idofphoto)) {
            
            
            d_type='duck';

        

            
            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();

matchNavbar();

        }

        
        $( ".iconpos_" + idofphoto ).empty();
             $( ".iconpos_" + idofphoto ).append('<img src="media/duckfaceonly.png" style="width:100px;">');
    $( this ).css( "-webkit-filter","none" ); $( ".distance_" + idofphoto ).css( "background-color","#2196f3" );
    

    
}



else if (index1 > -1) {
    
        if ($( '.rr').hasClass('r_' + idofphoto)) {
            
           d_type='date';
 

            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );

$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


matchNavbar();
        }
    
        
     $( ".iconpos_" + idofphoto ).empty();
                         $( ".iconpos_" + idofphoto ).append('<img src="media/datefaceonly.png" style="width:100px;">');
    $( this ).css( "-webkit-filter","none" ); $( ".distance_" + idofphoto ).css( "background-color","#2196f3" );
    
  
}

else{$( this ).css( "-webkit-filter","grayscale(80%)" );$( ".distance_" + idofphoto ).css( "background-color","#ccc" );
$( ".iconpos_" + idofphoto ).empty();
$(  ".name_" + idofphoto ).css( "-webkit-filter","grayscale(80%)" );

if (u_date_me > -1){
$( ".iconpos_" + idofphoto ).empty();
                         $( ".iconpos_" + idofphoto ).append('<img src="media/datefaceonly.png" style="width:100px;">');$(  ".iconpos_" + idofphoto ).css( "-webkit-filter","grayscale(1%)" );
}
if (u_duck_me > -1) {
   $( ".iconpos_" + idofphoto ).empty();
             $( ".iconpos_" + idofphoto ).append('<img src="media/duckfaceonly.png" style="width:100px;">');$(  ".iconpos_" + idofphoto ).css( "-webkit-filter","grayscale(1%)" );
}


 if ($( '.rr').hasClass('r_' + idofphoto)) {
            
            $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );

$( ".duck-template" ).hide();
$( ".date-template" ).hide();

unmatchNavbar();

$( ".toolbardecide" ).show();
     
    // alert(u_date_me);
    // alert(u_duck_me);
     
if (u_date_me > -1) {$( ".datebutton" ).addClass( "likesme" );

}         
  else {$( ".datebutton" ).removeClass( "likesme" );}
  if (u_duck_me > -1) {$( ".duckbutton" ).addClass( "likesme" );

  }         
  else {$( ".duckbutton" ).removeClass( "likesme" );}
  
  
        
        }



}

    

});

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
$( ".duckbutton" ).show();
$( ".datebutton" ).show();
    
}

function singleBrowser(idw,idname,origin){

//firebase.database().ref("users/" + f_uid).off('value', userpref);


//targetid = idw;
targetid = String(idw);

targetname = idname;
var dbuttons;

if (origin){

dbuttons=   ' <div class="toolbar-inner date-template" style="display:none;background-color:#2196f3;">'+
   '<a href="#" onclick="dateUser();" class="datebutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:80px;max-width:106.47px;">'+flargedateicon +'</a>'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;visibility:hidden;">or</p>'+
   '<a href="#" onclick="createDate1()" class="button link active" style="width: calc(100% - 70px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Date</a></div>'+
     
     // '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;border:0;color:#007aff;><i class="pe-7s-close pe-2x"></i></a>'+
  
  ' <div class="toolbar-inner duck-template" style="display:none;background-color:#2196f3;">'+
          '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;border:0;color:#007aff;><i class="pe-7s-close pe-2x"></i></a>'+
    '<a href="#" onclick="createDuck()" class="button link active" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Duck</a></div>';
      
  

}

else {
  
  dbuttons=' <div class="toolbar-inner date-template" style="display:none;background-color:#2196f3;">'+
   '<a href="#" onclick="dateUser();" class="datebutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:80px;max-width:106.47px;">'+flargedateicon +'</a>'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;visibility:hidden;">or</p>'+
   '<a href="#" class="button link active photo-browser-close-link" style="width: calc(100% - 70px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Date</a></div>'+
     
     // '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;border:0;color:#007aff;><i class="pe-7s-close pe-2x"></i></a>'+
  
  ' <div class="toolbar-inner duck-template" style="display:none;background-color:#2196f3;">'+
          '<a href="#" class="link button" onclick="showDecide()" style="width:55px;font-family: \'Pacifico\', cursive;font-size:20px;height:40px;border:0;color:#007aff;><i class="pe-7s-close pe-2x"></i></a>'+
    '<a href="#" onclick="createDuck()" class="button link active photo-browser-close-link" style="width: calc(100% - 65px);font-family: \'Pacifico\', cursive;font-size:20px;height:40px;">Let\'s Duck</a></div>';
  
   
   

}


singlePhotoBrowser = myApp.photoBrowser({
    zoom: 400,
    lazyLoading:true,
    lazyLoadingInPrevNext:true,
    //exposition:false,
    photos: [{
        url: 'https://graph.facebook.com/'+targetid+'/picture?type=large',
        caption: '...'
    }],
    
    toolbarTemplate:'<div class="toolbar tabbar" style="height:100px;">'+
  
 dbuttons+
   
   
   
    ' <div class="toolbar-inner toolbardecide">'+

'<a href="#" onclick="dateUser();" class="datebutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:80px;">'+flargedateicon +'</a>'+
       ' <a href="#" class="link orlink">'+
       '<p style="font-family: \'Pacifico\', cursive;font-size:20px;">or</p>'+
           
       ' </a>'+
       '<a href="#" class="link loaderlink"><span class="preloader preloader-white login-loader"></span></a>'+

'<a href="#" onclick="duckUser();" class="duckbutton button link disabled" style="font-family: \'Pacifico\', cursive;font-size:20px;height:80px;">'+flargeduckicon +'</a>'+ 
   ' </div>'+
'</div>',
onOpen:function(photobrowser){
    $( ".chatpop" ).css( "z-index","10000" );},
   onClose:function(photobrowser){hideProfile();$( ".chatpop" ).css( "z-index","11500" );
   //getPreferences();
   
   },
   swipeToClose:false,
  // onClick:function(swiper, event){showProfile();},

    backLinkText: '',
    
    
    
    navbarTemplate: '<div class="navbar photobrowserbar">'+
   

   
   ' <div class="navbar-inner">'+
      '  <div class="left sliding">'+
          '  <a href="#" style="margin-left:-10px;" class="matchcolor mainback link photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
           // '    <i class="icon icon-back {{iconsColorClass}}"></i> '+

            '<i class="pe-7s-angle-left pe-3x"></i> '+
          //  '<span class="badge agecat">'+arraynumber+'</span>'+
            

           ' </a>'+
           '  <a href="#" onclick="myApp.closeModal();clearchatHistory();" style="display:none;margin-left:-10px;" class="matchcolor notifback link photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">'+
            '    <i class="pe-7s-angle-left pe-3x "></i>  '+

            
          //  '<span class="badge agecat">'+arraynumber+'</span>'+
            

           ' </a>'+
       ' </div>'+
       ' <div class="center sliding nametag matchcolor">'+
        //  '  <span class="photo-browser-current"></span> '+
        //  '  <span class="photo-browser-of">{{ofText}}</span> '+
        //  '  <span class="photo-browser-total"></span>'+
       ' </div>'+
       ' <div class="right" >' +
       '<a href="#" class="link">'+
        
        '    <i class="pe-7s-more pe-lg matchcolor"></i>'+
     
       ' </a>'+
       '</div>'+
    '</div>'+
'</div>  '
});   



singlePhotoBrowser.open();
$( ".nametag" ).empty();
$( ".nametag" ).append('<span class="rr r_'+targetid+'">'+targetname+'</span>');


var windowwidth = $( ".photo-browser-swiper-container" ).width();

 $( ".photo-browser-slide img" ).css( "width", windowwidth + "px" );
 $( ".photo-browser-slide img" ).css( "-webkit-filter","grayscale(80%)" );
 $( ".photo-browser-caption" ).css( "margin-top", "-10px" );






$( ".datebutton" ).removeClass( "active" );
$( ".duckbutton" ).removeClass( "active" );
$( ".duckbutton" ).addClass( "disabled" );
$( ".datebutton" ).addClass( "disabled" );
$( ".loaderlink" ).show();
$( ".orlink" ).hide();

match = 0;



$( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","grayscale(80%)" );
$( ".duck-template" ).hide();
$( ".date-template" ).hide();
unmatchNavbar();


$( ".toolbardecide" ).show();
$( ".datebutton" ).removeClass( "likesme" );
$( ".duckbutton" ).removeClass( "likesme" );

firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/userdata.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:targetid,sexuality:sexuality} )
  .done(function( data ) {

var result = JSON.parse(data); 

var targetdescription= result[0].description;
//var targetname = result[0].name.substr(0,result[0].name.indexOf(' ')); 
$( ".photo-browser-caption" ).empty();
$( ".photo-browser-caption" ).append(targetdescription);
    myApp.sizeNavbars();

});

    }).catch(function(error) {
  // Handle error
});
var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

return firebase.database().ref('matches/' + f_uid + '/' + targetid).once('value').then(function(snapshot) {

$( ".duckbutton" ).removeClass( "disabled" );
$( ".datebutton" ).removeClass( "disabled" );
	
$( ".duckbutton" ).show();
$( ".datebutton" ).show();
$( ".loaderlink" ).hide();
$( ".orlink" ).show();

if (snapshot.val() === null) {}
else {

if (first_number == f_uid){

//Dates
if (snapshot.val().firstnumberdate == 'Y'){$( ".datebutton" ).addClass( "active" );}else {$( ".datebutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberdate == 'Y'){$( ".datebutton" ).addClass( "likesme" );}else {$( ".datebutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberdate == 'Y' && snapshot.val().firstnumberdate == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='date';
}
else {}

//Duck
if (snapshot.val().firstnumberduck == 'Y'){$( ".duckbutton" ).addClass( "active" );}else {$( ".duckbutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberduck == 'Y'){$( ".duckbutton" ).addClass( "likesme" );}else {$( ".duckbutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberduck == 'Y' && snapshot.val().firstnumberduck == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='duck';
}
else {}


    
}
if (first_number == targetid){
    
    //Date
    
    if (snapshot.val().firstnumberdate == 'Y'){$( ".datebutton" ).addClass( "likesme" );}else {$( ".datebutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberdate == 'Y'){$( ".datebutton" ).addClass( "active" );}else {$( ".datebutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberdate == 'Y' && snapshot.val().firstnumberdate == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).hide();
$( ".date-template" ).show();
$( ".toolbardecide" ).hide();


matchNavbar();
d_type='date';
}
else {}

//Duck
    if (snapshot.val().firstnumberduck == 'Y'){$( ".duckbutton" ).addClass( "likesme" );}else {$( ".duckbutton" ).removeClass( "likesme" );}
if (snapshot.val().secondnumberduck == 'Y'){$( ".duckbutton" ).addClass( "active" );}else {$( ".duckbutton" ).removeClass( "active" );}
if (snapshot.val().secondnumberduck == 'Y' && snapshot.val().firstnumberdate == 'Y'){
 $( ".photo-browser-slide.swiper-slide-active img" ).css( "-webkit-filter","none" );
$( ".duck-template" ).show();
$( ".date-template" ).hide();
$( ".toolbardecide" ).hide();

matchNavbar();
d_type='duck';
}
else {}


}


    
}

});
    
    
}

function deletePhotos(){

var unix = Math.round(+new Date()/1000);


firebase.database().ref('/photostodelete/' + f_uid).once('value').then(function(snapshot) {

var objs = snapshot.val();





if (snapshot.val()){



$.each(objs, function(i, obj) {


$.each(obj, function(i, obk) {


if(obk.photo_expiry){
if (obk.photo_expiry < Number(unix)){

//alert('a photo to delete exists');

firebase.database().ref('/photochats/' + obk.first_number + '/' + obk.second_number+'/'+ obk.id).remove();
firebase.database().ref('/chats/' + obk.first_number + '/' + obk.second_number+'/'+ obk.id).remove();




var desertRef = storageRef.child(obk.photo_name); 

// Delete the file
desertRef.delete().then(function() {
firebase.database().ref('/photostodelete/' + obk.from_uid + '/' + obk.to_uid+'/'+ obk.id).remove();

  
}).catch(function(error) {
  
  
});



//blocking out
}
}





});





});
}

});
    
}    

function createDuck(idq,nameq,redirect){
keepopen = 1;
d_type = 'duck';
if (idq) {createDate(idq,nameq,redirect)}
else{createDate();}
    
}

function createDate1(idz,name,redirect){
d_type = 'date';
keepopen = 1;

if (idz) {createDate(idz,name,redirect)}
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

function newNotificationm(messagenum){



if (!messagenum) {messagenum = 1;}



var smessage;
if (d_type=='duck'){smessage = 'New match'}
if (d_type=='date'){smessage = 'New match'}

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().push().key;
var t_unix = Math.round(+new Date()/1000);
   
   var targetData = {
       id:newPostKey,
       from_uid: f_uid,
    from_name: f_first,
    to_uid:targetid,
    to_name:targetname,
	   to_picture:targetpicture,
	   from_picture:f_image,
    message:smessage,
    timestamp: t_unix,
    type:d_type,
    param:'newmatch',
    new_message_count:0,
    received:'N',
    expire:'',
    authcheck:f_uid
   };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['notifications/' + f_uid + '/' + targetid] = targetData;
  updates['notifications/' + targetid + '/' + f_uid] = targetData;

  return firebase.database().ref().update(updates).then(function() {
console.log('delete notification sent');
      
  });
}

		sendNotification(targetid,1);

	
var existingnotifications = firebase.database().ref("notifications/" + f_uid).once('value').then(function(snapshot) {
var objs = snapshot.val();

var messageq = 0;

//If existing notifications, get number of unseen messages, delete old notifications

console.log(snapshot.val());
if (snapshot.val()){

$.each(objs, function(i, obj) {
   
   
   if ((obj.from_uid == targetid)||(obj.to_uid == targetid) ){
    
    firebase.database().ref("notifications/" + f_uid + '/' + targetid).remove();
       firebase.database().ref("notifications/" + targetid + '/' + f_uid).remove();
    
    
           
    
    if ((obj.from_uid == f_uid)&&(obj.received == 'N') ){
    
       messageq = obj.new_message_count;
       
       messageq ++;
       
       
       
    }
       


       
   }


  
});  
}



newNotificationm(messageq);

});



    
    
}

function unmatchNotif(){



var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

firebase.database().ref('dates/' + f_uid +'/' + targetid).remove();
firebase.database().ref('dates/' + targetid +'/' + f_uid).remove();
firebase.database().ref('notifications/' + f_uid +'/' + targetid).remove();
firebase.database().ref('notifications/' + targetid +'/' + f_uid).remove();

myApp.closePanel();









    
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


  
function insertAfterNthChild($parent, index, content){
    $(content).insertBefore($parent.children().eq(index));
}

//function changeRadius(number){
//$('.radiusbutton').removeClass('active');
//$('#distance_'+ number).addClass('active');
//processUpdate();
//}




function sortBy(number){
var relevanticon;
var relevanttext;
//if (sexuality){processUpdate();  myApp.sizeNavbars();  }


$('.sortbutton').removeClass('active');
$('.sortby_'+ number).addClass('active');
if ($( "#sortrandom" ).hasClass( "active" )){sortby = 'random';}
if ($( "#sortdistance" ).hasClass( "active" )){sortby = 'distance';}
if ($( "#sortactivity" ).hasClass( "active" )){sortby = 'activity';}


firebase.database().ref('users/' + f_uid).update({
        sort:sortby
  });	
	
}


function addcreateDate(){



$('.left-title').text(f_duck_match_data.length + 'want to date you');
myApp.sizeNavbars();  



$('.timeline-upcoming').empty();

for (i = 0; i < f_date_match_data.length; i++) { 


$('.timeline-upcoming').append('<div class="timeline-item" onclick="createDate1(\''+f_date_match_data[i].uid+'\',\''+f_date_match_data[i].name+'\');">'+
    '<div class="timeline-item-date">'+fdateicon+'</div>'+
   '<div class="timeline-item-divider"></div>'+
    '<div class="timeline-item-content">'+
     ' <div class="timeline-item-inner">'+
     ' <div class="timeline-item-title" style="width:100px;height:100px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+f_date_match_data[i].uid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+
     ' <div class="timeline-item-subtitle">'+f_date_match_data[i].name+'</div>'+
     '</div>'+
   ' </div>'+
  '</div>');

}

for (i = 0; i < f_duck_match_data.length; i++) { 


$('.timeline-upcoming').append('<div class="timeline-item" onclick="createDuck(\''+f_duck_match_data[i].uid+'\',\''+f_duck_match_data[i].name+'\');">'+
    '<div class="timeline-item-date">'+fduckicon+'</div>'+
    '<div class="timeline-item-divider"></div>'+
    '<div class="timeline-item-content">'+
     ' <div class="timeline-item-inner">'+
     ' <div class="timeline-item-title" style="width:100px;height:100px;border-radius:50%;background-image:url(\'https://graph.facebook.com/'+f_duck_match_data[i].uid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+
     ' <div class="timeline-item-subtitle">'+f_duck_match_data[i].name+'</div>'+
     '</div>'+
   ' </div>'+
  '</div>');

}

if (f_duck_match_data.length === 0 && f_date_match_data.length ===0){

$('.timeline-upcoming').append('<div class="content-block-title" style="margin: 0 auto;text-align:center;overflow:visible;">No matches yet. <br/><br/>Keep calm and quack on!</div>');

}


}

function unblock(){
  myApp.confirm('This will unblock all profiles, making you visible to everyone', 'Are you sure?', function () {
var iblockedfirst = [];
var iblockedsecond = [];

firebase.database().ref("matches/" + f_uid).once("value",function(snapshot) {

if (snapshot.val() != null){

var objs = snapshot.val();

$.each(objs, function(i, obj) {
if((obj.first_number == f_uid)&& (obj.firstnumberblock == 'Y')){iblockedfirst.push(obj.second_number)}
if((obj.second_number == f_uid)&& (obj.secondnumberblock == 'Y')){iblockedsecond.push(obj.first_number)}


});

}



if (iblockedfirst.length){
for (i = 0; i < iblockedfirst.length; i++) {

firebase.database().ref('matches/' + f_uid + '/' + iblockedfirst[i]).update({
   //add this user to my list
   firstnumberblock:'N',
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:iblockedfirst[i]
  });
  
  firebase.database().ref('matches/' + iblockedfirst[i]  + '/' + f_uid).update({
   //add this user to my list
   firstnumberblock:'N',
   firstnumberdate:'N',
   firstnumberduck:'N',
   created:f_uid,
   received:iblockedfirst[i]
  });

}
}

if (iblockedsecond.length){
for (i = 0; i < iblockedsecond.length; i++) {

firebase.database().ref('matches/' + f_uid + '/' + iblockedsecond[i]).update({
   //add this user to my list
   secondnumberblock:'N',
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:iblockedsecond[i]
  });
  
  firebase.database().ref('matches/' + iblockedsecond[i]  + '/' + f_uid).update({
   //add this user to my list
   secondnumberblock:'N',
   secondnumberdate:'N',
   secondnumberduck:'N',
   created:f_uid,
   received:iblockedsecond[i]
  });

}
}

getWifilocation();

$( ".blockbutton" ).addClass('disabled');


})
  });
}

function deleteAccount(){

//users
//photos2delete -> photos in storage
//chats
//matches



  myApp.confirm('This will permanently delete your account and remove all your information including photos, chats and profile data', 'Delete Account', function () {






        
var matchesarray = [];

var firstnumberarray = [];
var secondnumberarray = [];
firebase.database().ref("matches/" + f_uid).once("value",function(snapshot) {

if (snapshot.val() != null){

var objs = snapshot.val();

$.each(objs, function(i, obj) {var uidadd;if(obj.first_number == f_uid){uidadd = obj.second_number;} else{uidadd = obj.first_number} matchesarray.push(uidadd); firstnumberarray.push(obj.first_number);secondnumberarray.push(obj.second_number);});






for (i = 0; i < matchesarray.length; i++) { 

var mymatches = firebase.database().ref('matches/' + f_uid + '/' + matchesarray[i]);
mymatches.remove().then(function() {
    console.log("My matches Remove succeeded.")
  })
  .catch(function(error) {
    console.log("My matches  Remove failed: " + error.message)
  });

var theirmatches = firebase.database().ref('matches/' + matchesarray[i]  + '/' + f_uid);
theirmatches.remove().then(function() {
    console.log("Their matches Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Their matches Remove failed: " + error.message)
  });

var mydates = firebase.database().ref('dates/' + f_uid + '/' + matchesarray[i]);
mydates.remove().then(function() {
    console.log("My dates Remove succeeded.")
  })
  .catch(function(error) {
    console.log("My dates  Remove failed: " + error.message)
  });

var theirdates = firebase.database().ref('dates/' + matchesarray[i]  + '/' + f_uid);
theirdates.remove().then(function() {
    console.log("Their dates Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Their dates Remove failed: " + error.message)
  });

var theirnotifs = firebase.database().ref('notifications/' + matchesarray[i]  + '/' + f_uid);
theirnotifs.remove().then(function() {
    console.log("their notifs Remove succeeded.")
  })
  .catch(function(error) {
    console.log("their notifs failed: " + error.message)
  });

var ourchats = firebase.database().ref('chats/' + firstnumberarray[i] + '/' + secondnumberarray[i]);
ourchats.remove().then(function() {
    console.log("Chats Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Chats Remove failed: " + error.message)
  });
  
var ourphotochats = firebase.database().ref('photochats/' + firstnumberarray[i] + '/' + secondnumberarray[i]);
ourphotochats.remove().then(function() {
    console.log("PhotoChats Remove succeeded.")
  })
  .catch(function(error) {
    console.log("PhotoChats Remove failed: " + error.message)
  });  

}
}


firebase.database().ref("notifications/" + f_uid).once("value", function(snapshot) {
var objs = snapshot.val();
console.log(objs);



if (snapshot.val()){

$.each(objs, function(i, obj) {
var targetdeleteid;
if (obj.from_uid == f_uid){targetdeleteid = obj.to_uid} else{targetdeleteid = obj.from_uid;}

var mynotifs = firebase.database().ref('notifications/' + f_uid  + '/' + targetdeleteid);
mynotifs.remove().then(function() {
    console.log("my notifs Remove succeeded.")
  })
  .catch(function(error) {
    console.log("my notifs failed: " + error.message)
  });

});







}

firebase.database().ref('users/' + f_uid).set({
    auth_id : f_auth_id,
    deleted:'Y'
  });



firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/deleteuser.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid} )
  .done(function( data ) {
  console.log(data);

firebase.database().ref('/photostodelete/' + f_uid).once('value').then(function(snapshot) {

var objr = snapshot.val();





if (snapshot.val()){



$.each(objr, function(i, obj) {


$.each(obj, function(i, obk) {
firebase.database().ref('/photostodelete/' + obk.from_uid + '/' + obk.to_uid+'/'+ obk.id).remove();
var desertRef = storageRef.child(obk.photo_name); 

// Delete the file
desertRef.delete().then(function() {






  
}).catch(function(error) {
  
  console.log(error);
});

});



});


}

FCMPlugin.unsubscribeFromTopic(f_uid);
		cordova.plugins.notification.badge.set(0);
	var loginmethod = window.localStorage.getItem("loginmethod");
    if (loginmethod == '1'){logoutPlugin();}
    else{logoutOpen();}

});
  
  
  
});

    }).catch(function(error) {
  // Handle error
});

}); 




});





 
   

        
    });

}



function matchNavbar(){

if ($('.infopopup').length > 0) {
$( ".toolbarq" ).show();
$( ".photobrowserbar" ).css("background-color","#2196f3");
$( ".matchcolor" ).addClass('whitetext');
}
else {$( ".toolbarq" ).hide();}

}

function unmatchNavbar(){
if ($('.infopopup').length > 0) {
$( ".toolbarq" ).show();
$( ".photobrowserbar" ).css("background-color","#ccc");
$( ".matchcolor" ).removeClass('whitetext');
$( ".toolbarq" ).css("background-color","transparent");


}
else {$( ".toolbarq" ).hide();}

}


var notifloaded = false;
function establishNotif(){



notifcount = firebase.database().ref('notifications/' +f_uid).on('value', function(snapshot) {




var notificationscount = 0;

var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {


if (obj.to_uid == f_uid) {
    
	
	
    if (obj.received =='Y') {
if (notifloaded){    $(  ".arrowdivhome_" + obj.from_uid ).empty();$( ".indivnotifcount" ).remove();}
    
    }
    
    if (obj.received =='N') {
    
    var addnumber;
    
    if(obj.param == 'datedeleted' || obj.param =='newmatch'){addnumber = 1;}
    else {addnumber = obj.new_message_count}
    notificationscount = notificationscount + addnumber;
if (notifloaded){
if (obj.new_message_count > 0){
//alert('Not received, greater than 0 = ' +obj.new_message_count);
$(  ".arrowdivhome_" + obj.from_uid ).empty();$( ".arrowdivhome_" + obj.from_uid ).append('<span class="badge" style="background-color:rgb(255, 208, 0);color:black;margin-top:5px;margin-left:-5px;">'+obj.new_message_count+'</span>');
$( ".indivnotifcount" ).remove();$( ".arrowdivbrowser" ).append('<span class="badge indivnotifcount" style="position:absolute;right:0px;background-color:rgb(255, 208, 0);color:black;">'+obj.new_message_count+'</span>');



cordova.plugins.notification.badge.set(notificationscount);



}
}

    
    }
    

    
    
    
}
    
});

notifloaded = true;

//Update SQL notifcount	




	
	
if (notificationscount !=0){

   if (offsounds == 'Y'){}else{
    $('#buzzer')[0].play();
	   //if ($('.chatpop').length > 0) {}
    //else {$('#buzzer')[0].play();}
    }
return false;

}
else{}



//$( ".notifspan" ).empty();
//$( ".notifspan" ).append(notificationscount);

}


});


}


function showPloader(){
$( ".ploader" ).css("z-index","9999999");myApp.closeModal();
}

function hidePloader(tabb){






var popupHTML = '<div class="popup prefpop">'+

'<div class="views tabs toolbar-fixed">'+

  '<div id="tab1" class="view tab active">'+
'<div class="navbar" style="background-color:#2196f3;">'+
 '   <div class="navbar-inner">'+

  '      <div class="center" style="color:white;">Terms and Conditions of Use</div>'+
 
    '    <div class="right"><a href="#" onclick="showPloader();" style="color:white;">Done</a></div>'+
    '</div>'+
'</div>'+
    '<div class="pages navbar-fixed">'+
     ' <div data-page="home-1" class="page">'+
      '  <div class="page-content">'+
       '<div class="content-block" style="margin-top:0px;">'+
     ' <div class="content-block-inner terms-inner" >'+
     

     
'     </div>'+
    '</div>'+
   
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div id="tab2" class="view tab">'+
 '<div class="navbar" style="background-color:#2196f3;">'+
 '   <div class="navbar-inner">'+

  '      <div class="center" style="color:white;">Privacy Policy</div>'+
 
    '    <div class="right close-popup"><a href="#" onclick="showPloader();" class="close-popup" style="color:white;">Done</a></div>'+
    '</div>'+
'</div>'+
    '<div class="pages navbar-fixed">'+
     ' <div data-page="home-2" class="page">'+
      '  <div class="page-content">'+
             '<div class="content-block" style="margin-top:0px;">'+
              ' <div class="content-block-inner privacy-inner">'+
     

     
'     </div>'+
    '</div>'+
   


        '</div>'+
     ' </div>'+
    '</div>'+
  '</div>'+

 
  '<div class="toolbar tabbar" style="padding:0px;background-color:#ccc;">'+
   ' <div class="toolbar-inner"  style="padding:0px;">'+
    '  <a href="#tab1" onclick="tabOne();" class="tab1 tab-link active"><i class="pe-7s-note2 pe-lg"></i></a>'+
     ' <a href="#tab2" onclick="tabTwo();" class="tab2 tab-link"><i class="pe-7s-look pe-lg"></i></a>'+
    '</div>'+
  '</div>'+
'</div>'+
'</div>';
  myApp.popup(popupHTML);

$( ".ploader" ).css("z-index","10000");

if (tabb) {
tabTwo();
}
else {tabOne();}


}


function tabOne(){
$( "#tab1" ).addClass('active');
$( "#tab2" ).removeClass('active');
 myApp.sizeNavbars();
 $( ".tab1" ).addClass('active');
$( ".tab2" ).removeClass('active');

$.get( "http://www.dateorduck.com/terms.html", function( data ) {

$( ".terms-inner" ).html(data);





});

}


function tabTwo(){

$( "#tab1" ).removeClass('active');
$( "#tab2" ).addClass('active');
 myApp.sizeNavbars();
 $( ".tab1" ).removeClass('active');
$( ".tab2" ).addClass('active');

$.get( "http://www.dateorduck.com/privacy.html", function( data ) {

$( ".privacy-inner" ).html(data);

});


}



//check if on mobile
//}
var pagingalbumurl;
var pagingurl;
var photonumber;
var albumend;
var addedsmallarray;
var addedlargearray;
var addedheight = [];
var addedwidth = [];
function getPhotos(albumid){
$( ".photoloader").show();
$( ".loadmorebuttonphotos").hide();

var retrieveurl;
if (!pagingurl) {photonumber = 0;retrieveurl = 'https://graph.facebook.com/v2.4/'+albumid+'/photos?limit=8&fields=id,source,width,height&access_token=' + f_token}
else {retrieveurl = pagingurl}

$.getJSON(retrieveurl,
      function(response) {


$( ".swipebuttondone").addClass("disabled");

$( ".photoloader").hide();

if (response.data.length === 0){$( ".loadmorebuttonphotos").hide();$( "#nophotosfound").show();return false;}

console.log(response);



pagingurl = response.paging.next;



for (i = 0; i < response.data.length; i++) { 


var alreadyselected = addedsmallarray.indexOf(response.data[i].source);
console.log(response.data[i]);

if (alreadyselected == -1) {
    swiperPhotos.appendSlide('<div class="swiper-slide slidee slidee_'+photonumber+' largeurl_'+response.data[i].source+' smallurl_'+response.data[i].source+' id_'+response.data[i].id+'" style="background-image:url(\''+response.data[i].source+'\');height:180px;width:180px;background-size:cover;background-position:50% 50%;"><div style="width:40px;height:40px;border-radius:50%;position:absolute;top:50%;left:50%;margin-left:-28px;margin-top:-28px;"><i class="pe-7s-check check_'+photonumber+' pe-4x" style="display:none;color:#4cd964;"></i></div><input type="hidden" class="width_'+response.data[i].id+'" value="'+response.data[i].width+'"><input type="hidden" class="height_'+response.data[i].id+'" value="'+response.data[i].height+'"><br></div>');
}

else {
    swiperPhotos.appendSlide('<div class="swiper-slide slidee slidee_'+photonumber+' largeurl_'+response.data[i].source+' smallurl_'+response.data[i].source+' id_'+response.data[i].id+' slidee-selected" style="background-image:url(\''+response.data[i].source+'\');height:180px;width:180px;background-size:cover;background-position:50% 50%;"><div style="width:40px;height:40px;border-radius:50%;position:absolute;top:50%;left:50%;margin-left:-28px;margin-top:-28px;"><i class="pe-7s-check check_'+photonumber+' pe-4x" style="display:block;color:#4cd964;"></i></div><input type="hidden" class="width_'+response.data[i].id+'" value="'+response.data[i].width+'"><input type="hidden" class="height_'+response.data[i].id+'" value="'+response.data[i].height+'"></div>');
}

photonumber ++;




}





if (response.data.length > 0 && response.data.length < 8) {

$( ".loadmorebuttonphotos").hide();$( "#nomorephotos").show();}
else{$( ".loadmorebuttonphotos").show();}


     });



}




function closePhotos(){
$( ".albumblock").show();
$( ".leftalbum").show();
$( ".leftphoto").hide();
$( "#nomorephotos").hide();
$( "#nophotosfound").hide();
$( ".loadmorebuttonphotos").hide();
if (albumend === true){$( ".loadmorebuttonalbums").hide();$( "#nomorealbums").show();}
else {$( ".loadmorebuttonalbums").show();$( "#nomorealbums").hide();}
swiperPhotos.removeAllSlides();
swiperPhotos.destroy();

photonumber = 0;
pagingurl = false;
}

function closeAlbums(){
myApp.closeModal('.photopopup');
addedsmallarray = [];
addedlargearray = [];
pagingalbumurl = false;
albumend = false;
$( ".swipebuttondone").removeClass("disabled");
}

function photosPopup(){

photosliderupdated = false;


addedsmallarray = f_smallurls;
addedlargearray = f_largeurls;

        
         var popupHTML = '<div class="popup photopopup">'+
                   

       

                   
                                 '<div class="views tabs toolbar-fixed">'+

  '<div class="view tab active">'+
'<div class="navbar" style="background-color:#2196f3;color:white;">'+
 '   <div class="navbar-inner">'+
  '      <div class="left">'+
  '<i class="pe-7s-angle-left pe-3x leftalbum" onclick="closeAlbums()" style="margin-left:-10px;"></i>'+
  '<i class="pe-7s-angle-left pe-3x leftphoto" onclick="closePhotos()" style="display:none;margin-left:-10px;"></i>'+
'  </div>'+
   '     <div class="center photocount">'+
'0 photos selected'+
   '</div>'+
    '    <div class="right"><a href="#" onclick="closeAlbums()" class="noparray" style="color:white;">Done</a><a href="#" class="yesparray" onclick="getPhotoURL()" style="display:none;color:white;">Save</a></div>'+
    '</div>'+
'</div>'+
    '<div class="pages navbar-fixed">'+
     ' <div data-page="photospage" class="page">'+
      '  <div class="page-content" style="padding-bottom:0px;background-color:white;">'+
          
                       '<div class="col-25 photoloader" style="position:absolute;top:50%;left:50%;margin-left:-13.5px;margin-top:-13.5px;">'+
  '      <span class="preloader"></span>'+
   '   </div>'+
          
          '<div class="list-block media-list albumblock" style="margin:0px;z-index:999999;"><ul class="albumul" style="z-index:99999999999;"></ul></div>'+
          
                   '<div class="swiper-container swiper-photos">'+
 '   <div class="swiper-wrapper" >'+

    '</div>'+
'</div>'+    

	     
	     
'<a href="#" class="button loadmorebuttonalbums" onclick="loadAlbums()" style="font-size:17px;border:0;border-radius:0px;background-color:#2196f3;color:white;display:none;margin:10px;">Load more albums</a>'+
'<a href="#" class="button loadmorebuttonphotos" onclick="getPhotos()" style="font-size:17px;border:0;border-radius:0px;background-color:#2196f3;color:white;display:none;margin:10px;">Load more photos</a>'+
'<div id="nomorephotos" style="display:none;width:100%;text-align:center;"><p>No more photos available in this album.</p></div>'+
'<div id="nophotosfound" style="display:none;width:100%;text-align:center;"><p>No photos found in this album.</p></div>'+
'<div id="nomorealbums" style="display:none;width:100%;text-align:center;"><p>No more albums to load.</p></div>'+
                   
                   '<div><div><div>'+
                   
 
                   
                   '<div>'+
                    '<div>'+
                   
                  '</div>'
  myApp.popup(popupHTML);

if (addedlargearray.length === 1){$( ".photocount").text(addedlargearray.length + ' photo selected');}
else {$( ".photocount").text(addedlargearray.length + ' photos selected');}

photoPermissions();

}

function loadAlbums(){

$( ".photoloader").show();
$( ".loadmorebuttonalbums").hide();
var retrievealbumurl;
if (!pagingalbumurl) {retrievealbumurl = 'https://graph.facebook.com/v2.4/'+f_uid+'/albums?limit=20&fields=id,count,name&access_token=' + f_token}
else {retrievealbumurl = pagingalbumurl}

$.getJSON(retrievealbumurl,
      function(response) {
	


   if(response.data.length == 0){
   



	   	   myApp.alert('Upload photos to Facebook to make them available to use in this app.', 'No photos are available');myApp.closeModal('.photopopup');return false;

	   
   }
	

	

      

pagingalbumurl = response.paging.next;



	if (response.data.length > 0){
      for (i = 0; i < response.data.length; i++) {
            

      $( ".albumul" ).append(
      

      
     ' <li onclick="getAlbum('+response.data[i].id+')">'+
           ' <div class="item-content">'+
               ' <div class="item-media">'+
                  '  <i class="pe-7s-photo-gallery pe-lg"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                   ' <div class="item-title-row">'+
                      '  <div class="item-title">'+response.data[i].name+'</div>'+
                                            '  <div class="item-after">'+response.data[i].count+'</div>'+
                    '</div>'+

                '</div>'+
           ' </div>'+
       ' </li>'
      );
      }
      }
      
      if (response.data.length < 20) {$( ".loadmorebuttonalbums").hide();$( "#nomorealbums").show();$( ".photoloader").hide();albumend = true;}
else{$( ".loadmorebuttonalbums").show();}
      

      });


}

function getAlbum(albumid){
$( ".albumblock").hide();
$( ".loadmorebuttonalbums").hide();
$( "#nomorealbums").hide();
$( ".leftalbum").hide();
$( ".leftphoto").show();

swiperPhotos = myApp.swiper('.swiper-photos', {
slidesPerView:2,
slidesPerColumn:1000,
virtualTranslate:true,
slidesPerColumnFill:'row',
 spaceBetween: 3,
onClick:function(swiper, event){if (sexuality){processUpdate();  myApp.sizeNavbars();  }

				$( ".noparray").hide();
$( ".yesparray").show();
				
if ($( ".slidee_" + swiper.clickedIndex).hasClass('slidee-selected')){$( ".slidee_" + swiper.clickedIndex).removeClass('slidee-selected');$( ".close_" + swiper.clickedIndex).show();$( ".check_" + swiper.clickedIndex).hide();

  var largeurl = swiper.clickedSlide.classList[3].replace("largeurl_", ""); 
  var smallurl = swiper.clickedSlide.classList[4].replace("smallurl_", "");
  var photoselectedid = swiper.clickedSlide.classList[5].replace("id_", "");


var indexdeletedsm = addedsmallarray.indexOf(smallurl);
addedsmallarray.splice(indexdeletedsm, 1);




var indexdeletedsl = addedlargearray.indexOf(smallurl);
addedlargearray.splice(indexdeletedsl, 1);

addedheight.splice(indexdeletedsl, 1);
addedwidth.splice(indexdeletedsl, 1);

console.log(addedheight);

}
else{$( ".slidee_" + swiper.clickedIndex).addClass('slidee-selected');$( ".close_" + swiper.clickedIndex).hide();$( ".check_" + swiper.clickedIndex).show();

  var largeurl = swiper.clickedSlide.classList[3].replace("largeurl_", ""); 
  var smallurl = swiper.clickedSlide.classList[4].replace("smallurl_", "");
  var photoselectedid = swiper.clickedSlide.classList[5].replace("id_", "");
addedsmallarray.push(smallurl);
addedlargearray.push(largeurl);

var widthselected = $( ".width_"+photoselectedid).val();
var heightselected = $( ".height_"+photoselectedid).val();



addedheight.push(heightselected);
addedwidth.push(widthselected);




}





if (addedlargearray.length === 1){$( ".photocount").text(addedlargearray.length + ' photo selected');}
else {$( ".photocount").text(addedlargearray.length + ' photos selected');}



}

  });

 getPhotos(albumid);






swiperPhotos.updateContainerSize();
swiperPhotos.updateSlidesSize();


}

function getPhotoURL(){
photonumber = 0;
pagingurl = false;
pagingalbumurl = false;
albumend = false;



var newsmall = addedsmallarray.toString();
var newlarge = addedlargearray.toString();

var newwidth = addedwidth.toString();
var newheight = addedheight.toString();

firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/updatephotos.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,largeurls:newlarge,smallurls:newsmall,height:newheight,width:newwidth} )
  .done(function( data ) {
$( ".swipebuttondone").removeClass("disabled");
if (addedlargearray.length ===0){if ($( ".reorderbutton" ).hasClass( "disabled" )){}else {$( ".reorderbutton" ).addClass('disabled');}
if ($( ".deleteallbutton" ).hasClass( "disabled" )){}else {$( ".deleteallbutton" ).addClass('disabled');}



}

if (addedlargearray.length > 0){if ($( ".reorderbutton" ).hasClass( "disabled" )){$( ".reorderbutton" ).removeClass('disabled');}
if ($( ".deleteallbutton" ).hasClass( "disabled" )){$( ".deleteallbutton" ).removeClass('disabled');}
}




updatephotoslider(); 


  //swiperPhotos.removeAllSlides();
//swiperPhotos.destroy();
  myApp.closeModal('.photopopup');

});

    }).catch(function(error) {
  // Handle error
});

}

var photosliderupdated;

function updatephotoslider(){
	
$( ".yesparray").addClass("disabled");
if (photosliderupdated){return false;}
	photosliderupdated = true;
myswiperphotos.removeAllSlides();


	alert(addedlargearray.length);
if (addedlargearray.length > 0){



myswiperphotos.removeAllSlides();

for (i = 0; i < addedlargearray.length; i++) { 





   
      $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\''+addedlargearray[i]+'\');background-size:cover;background-position:50% 50%;"><div class="button" style="border:0;border-radius:0px;background-color:#ff3b30;color:white;position:absolute;bottom:10px;right:5px;" onclick="deleteIndividual()">Remove</div></div>');
   
}

myswiperphotos.update();
$( ".photosliderinfo" ).addClass('pictures');
       if (addedlargearray.length === 1){       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photo to your profile');
}
else{       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photos to your profile');
}

       
  addedsmallarray = [];
 addedlargearray = [];
}


else {

myswiperphotos.removeAllSlides();

   f_smallurls = [];
  f_largeurls = [];
  addedheight = [];
  addedwidth = [];
  
     $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?width=828\');background-size:cover;background-position:50% 50%;\');"></div>');
    $( ".photosliderinfo" ).removeClass('pictures');
   $( ".photosliderinfo" ).html('Add photos to your profile below');

}

}



function reorderPhotos(){
if (sexuality){processUpdate();  myApp.sizeNavbars();  }
         var popupHTML = '<div class="popup redorderpopup">'+
                   

       

                   
                                 '<div class="views tabs toolbar-fixed">'+

  '<div class="view tab active">'+
'<div class="navbar" style="background-color:#2196f3;color:white;">'+
 '   <div class="navbar-inner">'+
  '      <div class="left">'+
  '<i class="pe-7s-angle-left pe-3x leftalbum" style="margin-left:-10px;" onclick="closeReorder()"></i>'+

'  </div>'+
   '     <div class="center">'+
'Order Photos'+
   '</div>'+
    '    <div class="right"><a href="#" onclick="changeOrder()" style="color:white;">Save</a></div>'+
    '</div>'+
'</div>'+
    '<div class="pages navbar-fixed">'+
     ' <div data-page="redorderpage" class="page">'+
      '  <div class="page-content" style="background-color:white;padding-bottom:0px;">'+
          
'<p style="width:100%;text-align:center;background-color:#ccc;color:#6d6d72;;padding-top:10px;padding-bottom:10px;">Drag photos to re-order</p>'+
          
' <div class="list-block media-list" style="width:25%;float:left;margin-top:0px;">'+
   ' <ul class="numbersul" style="background-color:transparent;">'+
     ' </ul>'+
'</div>'+
         ' <div class="list-block sortable" style="width:75%;float:left;margin-top:0px;">'+
   ' <ul class="sortableul">'+
     ' </ul>'+
'</div>'+
          
             


                   
                   '<div><div><div>'+
                   
 
                   
                   '<div>'+
                    '<div>'+
                   
                  '</div>'
  myApp.popup(popupHTML);

for (i = 0; i < f_largeurls.length; i++) {
$( ".numbersul" ).append(
'<li style="margin-top:10px;">'+
          '  <div class="item-content" style="height:80px;">'+
                '<div class="item-inner reorderinner">'+

                   '     <div class="item-title badge" style="position:absolute;top:50%;left:50%;margin-top:-10px;margin-left:-20px;">'+i+'</div>'+


                '</div>'+
          '  </div>'+
        '</li>'
);
$( ".sortableul" ).append(
' <li style="margin-top:10px;">'+
      '  <div class="item-content sortdivb" style="background-image:url(\''+f_largeurls[i]+'\');background-size:cover;background-position:50% 50%;height:80px;">'+
       ' </div>'+
       ' <div class="sortable-handler" style="width:100%;height:80px;"></div>'+
     ' </li>'

);
}


  myApp.sortableOpen();

}

function closeReorder(){
  myApp.closeModal('.redorderpopup');
}

function changeOrder(){
var newurl = [];

$( ".sortdivb" ).each(function() {

var bg = $(this).css("background-image");
bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');

newurl.push(bg);
});




myswiperphotos.removeAllSlides();
for (i = 0; i < newurl.length; i++) { 




   $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\''+newurl[i]+'\');background-size:cover;background-position:50% 50%;"><div class="button" style="border:0;border-radius:0px;background-color:#ff3b30;color:white;position:absolute;bottom:10px;right:5px;" onclick="deleteIndividual()"><i class="pe-7s-trash pe-lg"></i> Remove</div></div>');
   
}
  myApp.closeModal('.redorderpopup');
myswiperphotos.update();
$( ".photosliderinfo" ).addClass('pictures');

       
       
              if (f_largeurls.length === 1){       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photo to your profile');
}
else{       $( ".photosliderinfo" ).html('You have added '+f_largeurls.length+' photos to your profile');
}
       
var newsmall = newurl.toString();
var newlarge = newurl.toString();

firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/updatephotos.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,largeurls:newlarge,smallurls:newsmall} )
  .done(function( data ) {


});
    }).catch(function(error) {
  // Handle error
});
f_largeurls = newurl;

}

function deleteAllPhotos(){
  myApp.confirm('Are you sure?', 'Remove all photos', function () {

if (sexuality){processUpdate();  myApp.sizeNavbars();  }
deletedphoto = false;

myswiperphotos.removeAllSlides();
   $( ".wrapper-photos" ).append('<div class="swiper-slide" style="height:250px;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?width=828\');background-size:cover;background-position:50% 50%;\');"></div>');
$( ".photosliderinfo" ).removeClass('pictures');

   $( ".photosliderinfo" ).html('Add');

   $( ".photosliderinfo" ).html('Add photos to your profile below');

myswiperphotos.update();
  $( ".reorderbutton" ).addClass('disabled');
    $( ".deleteallbutton" ).addClass('disabled');
f_largeurls = [];
f_smallurls = [];

var newsmall = "";
var newlarge = "";
var newwidth = "";
var newheight = "";

firebase.auth().currentUser.getToken().then(function(idToken) { 
$.post( "http://www.dateorduck.com/updatephotos.php", { projectid:f_projectid,token:idToken,currentid:firebase.auth().currentUser.uid,uid:f_uid,largeurls:newlarge,smallurls:newsmall,height:newheight,width:newwidth} )
  .done(function( data ) {
console.log('deleted all');

});
  }).catch(function(error) {
  // Handle error
});









});


}
var f_smallurls = [];
var f_largeurls = [];
var photosloaded;

function swipePopup(chosen){
$( '.picker-sub' ).hide();
myApp.closeModal('.picker-sub');

photosloaded = false;

var sliderwidth = $( document ).width();
var sliderheight = $( document ).height();

var popupHTML = '<div class="popup prefpop">'+

'<div class="views tabs toolbar-fixed">'+

  '<div id="tab99" class="view-99 view tab active">'+

    '<div class="toolbar tabbar swipetoolbar" style="background-color:#ccc;z-index:9999999999;position:absolute;bottom:0px;">'+
' <div class="toolbar-inner" style="padding:0;">'+

       //   '   <a href="#" class="button tab-link tab-swipe pan0 active" onclick="swipePref(0)" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-filter pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
         '   <a href="#" class="button tab-link tab-swipe pan0 " onclick="swipePref(0)" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-clock pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
        
          '  <a href="#" class="button tab-link tab-swipe pan1" onclick="swipePref(1)" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-info pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
          '  <a href="#" class="button tab-link tab-swipe pan2" onclick="swipePref(2);" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-camera pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
          '  <a href="#" class="button tab-link tab-swipe pan3" onclick="swipePref(3)" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-config pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
      

 '</div>'+
 '</div>'+
    
'<div class="navbar" style="background-color:#2196f3;">'+

 '   <div class="navbar-inner">'+

  '      <div class="left" style="color:white;"></div>'+
   '     <div class="center swipetext" style="color:white;">Availability'+
         //'<div style="width:70px;height:70px;border-radius:50%;background-image:url(\''+f_image+'\');background-size:cover;background-position:50% 50%;margin-top:30px;z-index:100;border:5px solid #2196f3"></div>'+

   '</div>'+
    '    <div class="right"><a href="#" onclick="updateUser();" style="color:white;display:none" class="donechange swipebuttondone">Done</a><a href="#" style="color:white;display:none;" class="close-popup doneunchange swipebuttondone">Done</a></div>'+
    

    
    '</div>'+
'</div>'+

  '  <div class="pages">'+
 '     <div data-page="home-3" class="page">'+
   '     <div class="page-content" style="padding-top:54px;background-color:white;">'+

'<div class="swiper-container swiper-prefer" style="min-height:100%;">'+

    '<div class="swiper-wrapper">'+
'<div class="swiper-slide">'+
        
         '<div class="slide-pref pref-0">'+
        
        

'<div class="list-block media-list availblock" style="margin-bottom:0px;margin-top:0px;">'+
 '   <ul class="availul" style="padding-left:10px;padding-right:10px;padding-bottom:20px;">'+

  '  </ul>'+
    '<div class="list-block-label hiderowpref">Make it easier for your matches to organise a time to meet you.</div>'+

'</div> '+
        
 



        '</div>'+
        '</div>'+
       
        '<div class="swiper-slide" >'+
        

 '<div class="slide-pref pref-1">'+

  '<div style="background-color:transparent;width:100%;padding-bottom:10px;" class="registerdiv">'+
   '<div style="border-radius:50%;width:70px;height:70px;margin:0 auto;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+


'</div>'+
          


'<div class="list-block" style="margin-top:0px;">'+
' <ul class="aboutul">'+









  '<div class="list-block-label registerdiv" style="margin-top:10px;margin-bottom:10px;">To get started, tell us about you and who you are looking to meet. </div>'+

      

'<li class="newam" style="clear:both;">'+
 '     <div class="item-content">'+

  '      <div class="item-inner">'+
      '<div class="item-title label">I am</div>'+
   '       <div class="item-input">'+
    '        <input type="text" placeholder="..." readonly id="picker-describe">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+
      
       
'<li class="newme">'+
 '     <div class="item-content">'+

  '      <div class="item-inner">'+
      '<div class="item-title label">Preference</div>'+
   '       <div class="item-input">'+
    '        <input type="text" placeholder="..." readonly id="picker-describe2">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+
      
'<li class="align-top hiderowpref">'+
 '     <div class="item-content">'+
   //'<div class="item-media" style="border-radius:50%;width:70px;height:70px;background-image:url(\'https://graph.facebook.com/'+f_uid+'/picture?type=normal\');background-size:cover;background-position:50% 50%;"></div>'+
  '      <div class="item-inner">'+
      '<div class="item-title label">About Me</div>'+
          '  <div class="item-input">'+
 '   <textarea class="resizable" onkeyup="keyUp()" maxlength="100" id="userdescription" style="width: calc(100% - 40px);min-height:88px;max-height:176px;" placeholder="Hide"></textarea>'+
  '</div>'+
    '    </div>'+
     ' </div>'+
    '</li>'+
    '<p id="maxdescription" class="hiderowpref" style="float:right;color:#ccc;font-size:12px;margin-top:-20px;margin-right:5px;margin-bottom:-5px;">0 / 100</p>'+

      
' <li class="hiderowpref hometownli" style="clear:both;margin-top:0px;">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Hometown</div>'+
        '  <div class="item-input hometown-input">'+
     '   <textarea class="resizable" id="homesearch" onclick="newHometown()" onblur="checkHometown()" placeholder="Hide"  style="min-height:60px;max-height:132px;"></textarea>'+
           ' </div>'+
       ' </div>'+
      '</div>'+

    '</li>'+
    
        ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Status</div>'+
        '  <div class="item-input status-div">'+
          '    <input type="text" placeholder="Hide" id="status-input" name="name" readonly >'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
    

    
         ' <li class="hiderowpref">'+
      


      
      
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Industry</div>'+
        '  <div class="item-input industry-div">'+
          '    <input type="text" id="industry-input" name="name" placeholder="Hide" readonly >'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+

       ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Zodiac</div>'+
        '  <div class="item-input zodiac-div">'+
          '    <input type="text" id="zodiac-input" name="name" placeholder="Hide" readonly >'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
    ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Politics</div>'+
        '  <div class="item-input politics-div">'+
          '    <input type="text" id="politics-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+

      ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Religion</div>'+
        '  <div class="item-input religion-div">'+
          '    <input type="text" id="religion-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
      

  






    
  ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Ethnicity</div>'+
        '  <div class="item-input ethnicity-div">'+
          '    <input type="text" id="ethnicity-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+

' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Eye color</div>'+
        '  <div class="item-input eyes-div">'+
          '    <input type="text" id="eyes-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
    ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Body Type</div>'+
        '  <div class="item-input body-div">'+
          '    <input type="text" id="body-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
    

  
     
       ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Height</div>'+
        '  <div class="item-input height-div">'+
          '    <input type="text" id="height-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+
       ' <li class="hiderowpref">'+
      '<div class="item-content">'+
       ' <div class="item-inner">'+
        '  <div class="item-title label">Weight</div>'+
        '  <div class="item-input weight-div">'+
          '    <input type="text" id="weight-input" name="name" placeholder="Hide" readonly>'+
         ' </div>'+
       ' </div>'+
      '</div>'+
    '</li>'+

  
  '</ul>'+
  '<div class="list-block-label hiderowpref">All fields are optional and will be hidden on your profile unless completed.</div>'+
'</div>'+
       
       '</div>'+
                '</div>'+
      
                        '<div class="swiper-slide">'+
                        '<div class="slide-pref pref-2">'+


        '<div class="col-25 photoswiperloader" style="width:57.37px;top:50%;margin-top: -28.7px;top:50%;position: absolute;left: 50%;margin-left: -28.7px;">'+
  '      <span class="preloader"></span>'+
   '   </div>'+

'<div class="swiper-container container-photos" style="width:'+sliderwidth+'px;height:250px;">'+
    '<div class="swiper-wrapper wrapper-photos">'+


    '</div>'+
    '<div class="swiper-pagination"></div>'+
'</div>'+

'<p style="width:100%;text-align:center;background-color:#ccc;color:#6d6d72;padding-top:10px;padding-bottom:10px;" class="photosliderinfo"></p>'+



 ' <div class="buttons-row">'+
          '<a href="#" class="button active" onclick="photosPopup();" style="font-size:17px;border:0;border-radius:0px;background-color:#4cd964;margin-left:5px;margin-right:5px;">Add</a>'+
          '<a href="#" class="button reorderbutton active disabled" onclick="reorderPhotos();" style="font-size:17px;border:0;border-radius:0px;margin-right:5px;">Re-order</a>'+
            '<a href="#" class="button deleteallbutton active disabled" onclick="deleteAllPhotos();" style="font-size:17px;border:0;border-radius:0px;margin-right:5px;background-color:#ff3b30;color:white">Clear</a>'+
        '</div>'+
'<div class="list-block" style="margin-top:0px;">'+
' <ul">'+
        '<div class="list-block-label hiderowpref">Photos can be uploaded from your Facebook account.</div>'+
 '</ul></div>'+
    
                        '</div>'+
                        '</div>'+
  
            '<div class="swiper-slide">'+
            '<div class="slide-pref pref-3">'+
            
  

'<div class="content-block-title" style="margin-top:20px;">Search options</div>'+

  //  '<p class="buttons-row" style="padding-left:10px;padding-right:10px;">'+
 // '<a href="#" id="distance_10" onclick="changeRadius(10)" class="button button-round radiusbutton" style="border:0;border-radius:0px;">10 km</a>'+
 // '<a href="#" id="distance_25" onclick="changeRadius(25)" class="button button-round radiusbutton" style="border:0;border-radius:0px;">25 km</a>'+
 //   '<a href="#" id="distance_50" onclick="changeRadius(50)" class="button button-round radiusbutton active" style="border:0;border-radius:0px;">50 km</a>'+
 //   '<a href="#" id="distance_100" onclick="changeRadius(100)" class="button button-round radiusbutton" style="border:0;border-radius:0px;">100 km</a>'+
//'</p>'+


            
'<div class="list-block" style="margin-top:0px;">'+
' <ul>'+
'<li style="clear:both;">'+
 '     <div class="item-content">'+

  '      <div class="item-inner">'+
      '<div class="item-title label" style="width:120px;">Search radius</div>'+
   '       <div class="item-input">'+
    '        <input type="text" placeholder="..." readonly id="distance-input">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+
'<li style="clear:both;">'+
 '     <div class="item-content">'+

  '      <div class="item-inner">'+
      '<div class="item-title label" style="width:120px;"></div>'+
   '       <div class="item-input">'+
     '     </div>'+
      '  </div>'+
      '</div>'+
    '</li>'+
    '</ul>'+
'</div>'+
                                 '<div class="content-block-title" style="margin-top:-54px;">Sounds</div>'+
            
           
          ' <div class="list-block media-list">'+
    '<ul>'+
           ' <li>'+
         '   <div class="item-content">'+
             '   <div class="item-inner" style="float:left;">'+
              '<div class="item-title label" style="width:calc(100% - 62px);float:left;font-size:17px;font-weight:normal;">Turn off sounds</div>'+
              '   <div class="item-input" style="width:52px;float:left;">'+
'<label class="label-switch">'+
   ' <input type="checkbox" id="soundnotif" onchange="processUpdate();  myApp.sizeNavbars();">'+
    '<div class="checkbox"  ></div>'+
 ' </label>'+
  ' </div>'+
               ' </div>'+
           ' </div>'+
        '</li>'+

           '<div class="content-block-title" style="margin-top:20px;">Blocked profiles</div>'+
       ' <li>'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
                  '  <div class="item-title-row">'+
                     '   <div class="item-title button blockbutton active disabled" onclick="unblock()" style="font-size:17px;border:0;border-radius:0px;">Unblock all </div>'+
                    '</div>'+
               ' </div>'+
           ' </div>'+
        '</li>'+
    
    
                        '<div class="content-block-title" style="margin-top:20px;">My Account</div>'+
       '<li onclick="logout()">'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
                  '  <div class="item-title-row">'+
                     '   <div class="item-title active button" style="border:0;border-radius:0px;font-size:17px;">Logout</div>'+
                    '</div>'+
          
    ' </div>'+
       
    ' </div>'+
    '</li>'+


         ' <li onclick="deleteAccount()">'+
         '   <div class="item-content">'+

             '   <div class="item-inner">'+
                  '  <div class="item-title-row">'+
                     '   <div class="item-title button" style="font-size:17px;border-color:#ff3b30;background-color:#ff3b30;color:white;border:0;border-radius:0px;">Delete Account</div>'+
                    '</div>'+
               ' </div>'+
           ' </div>'+
        '</li>'+

    '</ul>'+
'</div>  '+
 
 		'</div>'+
                '</div>'+
  
 
  
  
    '</div>'+
'</div>'+

       ' </div>'+
      '</div>'+
    '</div>'+

 //tabs
      '</div>'+



'</div>'+
  //tabs

'</div>';

myApp.popup(popupHTML);

	
if (blocklist){
if (blocklist.length){$( ".blockbutton" ).removeClass('disabled');}
}

if(sexuality){$( ".doneunchange" ).show();$( ".registerdiv" ).hide();$('.hiderowpref').removeClass('hiderowpref');}

if(!sexuality){
	       $( ".swipetoolbar" ).hide();
	      }




	
//if (radiussize) {distancepicker.cols[0].setValue(radiussize);}
distancepicker = myApp.picker({
    input: '#distance-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + ($( document ).width()/2) + "px");distancepicker.cols[0].setValue(radiussize);distancepicker.cols[1].setValue(radiusunit);if (sexuality){processUpdate();  myApp.sizeNavbars();  }
},
	onClose:function (p, values, displayValues){radiussize = distancepicker.value[0];
	radiusunit = distancepicker.value[1];},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
'Search Distance'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       
        {
            values: ('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100').split(' ')
        },
         {
            textAlign: 'left',
            values: ('Kilometres Miles').split(' ')
        },
    ]
});  
	
var industrypicker = myApp.picker({
    input: '#industry-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (industry_u) {industrypicker.cols[0].setValue(industry_u);} if (sexuality){processUpdate();  myApp.sizeNavbars();  }
},
onChange:function (p, values, displayValues){$( '#industry-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'industry\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Accounting', 'Administration','Advertising','Agriculture','Banking and finance', 'Business', 'Charity', 'Creative arts','Construction','Consulting', 'Design', 'Education','Energy','Events', 'Engineering','Environment','Healthcare','Hospitality','HR and Recruitment', 'IT','Law','Law Enforcement','Leisure','Management','Manufacturing', 'Marketing','Media','Other','Pharmaceuticals','PR','Property','Public Services','Retail','Sales','Science','Security','Social Care','Small business','Sport','Tourism','Transport','Utilities','Voluntary work']
       }
     ]
});   

	var findustrypicker = myApp.picker({
    input: '#f-industry-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (f_industry_u) {findustrypicker.cols[0].setValue(f_industry_u);} if (sexuality){processUpdate();  myApp.sizeNavbars();  }
},
onChange:function (p, values, displayValues){$( '#f-industry-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'f_industry\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Accounting', 'Administration','Advertising','Agriculture','Banking and finance', 'Business', 'Charity', 'Creative arts','Construction','Consulting', 'Design', 'Education','Energy','Events', 'Engineering','Environment','Healthcare','Hospitality','HR and Recruitment', 'IT','Law','Law Enforcement','Leisure','Management','Manufacturing', 'Marketing','Media','Other','Pharmaceuticals','PR','Property','Public Services','Retail','Sales','Science','Security','Social Care','Small business','Sport','Tourism','Transport','Utilities','Voluntary work']
       }
     ]
}); 


var statuspicker = myApp.picker({
    input: '#status-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (status_u) {statuspicker.cols[0].setValue(status_u);} if (sexuality){processUpdate();  myApp.sizeNavbars();  }},
onChange:function (p, values, displayValues){$( '#status-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'status\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Single', 'Married', 'Engaged','Open relationship', 'Committed relationship','It\'s Complicated']
       }
     ]
}); 

	
	
var heightpicker = myApp.picker({
    input: '#height-input',
     onChange:function (p, values, displayValues){$( '#height-input' ).addClass("profilevaluechosen");},
     onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (height_u) {


     if (height_u == 122) {var heightset = '122 cm (4\' 0\'\')';}
     if (height_u == 124) {var heightset = '124 cm (4\' 1\'\')';}
     if (height_u == 127) {var heightset = '127 cm (4\' 2\'\')';}
     if (height_u == 130) {var heightset = '130 cm (4\' 3\'\')';}
     if (height_u == 132) {var heightset = '132 cm (4\' 4\'\')';}
          if (height_u == 135) {var heightset = '135 cm (4\' 5\'\')';}
     if (height_u == 137) {var heightset = '137 cm (4\' 6\'\')';}
     
     if (height_u == 140) {var heightset = '140 cm (4\' 7\'\')';}
     if (height_u == 142) {var heightset = '142 cm (4\' 8\'\')';}
     if (height_u == 145) {var heightset = '145 cm (4\' 9\'\')';}
     if (height_u == 147) {var heightset = '147 cm (4\' 10\'\')';}
     if (height_u == 150) {var heightset = '150 cm (4\' 11\'\')';}
     if (height_u == 152) {var heightset = '152 cm (5\' 0\'\')';}
     if (height_u == 155) {var heightset = '155 cm (5\' 1\'\')';}
          if (height_u == 157) {var heightset = '157 cm (5\' 2\'\')';}
          if (height_u == 160) {var heightset = '160 cm (5\' 3\'\')';}
          if (height_u == 163) {var heightset = '163 cm (5\' 4\'\')';}
               if (height_u == 165) {var heightset = '165 cm (5\' 5\'\')';}
                    if (height_u == 168) {var heightset = '168 cm (5\' 6\'\')';}
                         if (height_u == 170) {var heightset = '170 cm (5\' 7\'\')';}
                              if (height_u == 173) {var heightset = '173 cm (5\' 8\'\')';}
                                   if (height_u == 175) {var heightset = '175 cm (5\' 9\'\')';}
                                        if (height_u == 178) {var heightset = '178 cm (5\' 10\'\')';}
                                             if (height_u == 180) {var heightset = '180 cm (5\' 11\'\')';}
                                                  if (height_u == 183) {var heightset = '183 cm (6\' 0\'\')';}
                                                       if (height_u == 185) {var heightset = '185 cm (6\' 1\'\')';}
                                                            if (height_u == 188) {var heightset = '185 cm (6\' 2\'\')';}
                                                                 if (height_u == 191) {var heightset = '191 cm (6\' 3\'\')';}
                                                                      if (height_u == 193) {var heightset = '193 cm (6\' 4\'\')';}
                                                                           if (height_u == 195) {var heightset = '195 cm (6\' 5\'\')';}
                                                                                if (height_u == 198) {var heightset = '198 cm (6\' 6\'\')';}
                                                                                     if (height_u == 201) {var heightset = '201 cm (6\' 7\'\')';}
                                                                                          if (height_u == 203) {var heightset = '203 cm (6\' 8\'\')';}
     

     
     heightpicker.cols[0].setValue(heightset);}},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'height\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['122 cm (4\' 0\'\')','124 cm (4\' 1\'\')','127 cm (4\' 2\'\')','130 cm (4\' 3\'\')','132 cm (4\' 4\'\')','135 cm (4\' 5\'\')','137 cm (4\' 6\'\')','140 cm (4\' 7\'\')','142 cm (4\' 8\'\')','145 cm (4\' 9\'\')','147 cm (4\' 10\'\')','150 cm (4\' 11\'\')','152 cm (5\' 0\'\')','155 cm (5\' 1\'\')','157 cm (5\' 2\'\')','160 cm (5\' 3\'\')','163 cm (5\' 4\'\')','165 cm (5\' 5\'\')','168 cm (5\' 6\'\')','170 cm (5\' 7\'\')','173 cm (5\' 8\'\')','175 cm (5\' 9\'\')','178 cm (5\' 10\'\')','180 cm (5\' 11\'\')','183 cm (6\' 0\'\')','185 cm (6\' 1\'\')','188 cm (6\' 2\'\')','191 cm (6\' 3\'\')','193 cm (6\' 3\'\')','195 cm (6\' 4\'\')','198 cm (6\' 5\'\')','201 cm (6\' 6\'\')','203 cm (6\' 8\'\')']
       },

     ]
}); 

	
	
var weightpicker = myApp.picker({
    input: '#weight-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (weight_u) {

         
         weightpicker.cols[0].setValue(weight_u + ' kg (' + Math.round(weight_u* 2.20462262) + ' lbs)');}},
onChange:function (p, values, displayValues){$( '#weight-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'weight\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="center">' +
                   'Weight'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {

            values: (function () {
                var arr = [];
                for (var i = 45; i <= 150; i++) { arr.push(i + ' kg (' + Math.round(i* 2.20462262) + ' lbs)'); }
                return arr;
            })(),
       },
     ]
}); 


var bodypicker = myApp.picker({
    input: '#body-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (body_u) {bodypicker.cols[0].setValue(body_u);}},
onChange:function (p, values, displayValues){$( '#body-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'body\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Athletic','Average', 'Slim', 'Large', 'Muscular','Unimportant']
       }
     ]
}); 

	

var eyespicker = myApp.picker({
    input: '#eyes-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (eyes_u) {eyespicker.cols[0].setValue(eyes_u);}},
onChange:function (p, values, displayValues){$( '#eyes-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'eyes\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Amber', 'Blue', 'Brown','Grey','Green','Hazel','Other']
       }
     ]
}); 

var ethnicitypicker = myApp.picker({
    input: '#ethnicity-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (ethnicity_u) {ethnicitypicker.cols[0].setValue(ethnicity_u);}},
onChange:function (p, values, displayValues){$( '#ethnicity-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'ethnicity\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Asian', 'Black', 'Latin / Hispanic','Mixed','Middle Eastern','Native American','Other','Pacific Islander','White']
       }
     ]
}); 

var politicspicker = myApp.picker({
    input: '#politics-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (politics_u) {politicspicker.cols[0].setValue(politics_u);}},
onChange:function (p, values, displayValues){$( '#politics-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'politics\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Left / Liberal', 'Centre','Right / Conservative','Not interested']
       }
     ]
}); 

var zodiacpicker = myApp.picker({
    input: '#zodiac-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (zodiac_u) {zodiacpicker.cols[0].setValue(zodiac_u);}},
onChange:function (p, values, displayValues){$( '#zodiac-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'zodiac\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn','Aquarius','Pisces']
       }
     ]
}); 

var religionpicker = myApp.picker({
    input: '#religion-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (sexuality){processUpdate();  myApp.sizeNavbars();  } if (religion_u) {religionpicker.cols[0].setValue(religion_u);}},
onChange:function (p, values, displayValues){$( '#religion-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'religion\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Atheist','Agnostic','Christianity','Islam','Buddhism','Hindusim','Sikhism','Judaism','Other']
       }
     ]
}); 
$( ".slide-pref" ).hide();
mySwiper = myApp.swiper('.swiper-prefer', {

onSlideChangeEnd:function(swiper){$( ".page-content" ).scrollTop( 0 );},
	onInit:function(swiper){$( ".swipetoolbar" ).show();$( ".pan" + swiper.activeIndex ).addClass('active');},
onSlideChangeStart:function(swiper){




$( ".page-content" ).scrollTop( 0 );
$( ".tab-swipe").removeClass('active');
$( ".pan" + swiper.activeIndex ).addClass('active');

if (swiper.activeIndex == 0){$( ".swipetext" ).text('Availability');
$( ".slide-pref" ).hide();$( ".pref-0").show();$( ".swipetoolbar" ).show();
}
if (swiper.activeIndex == 1){$( ".swipetext" ).text('Profile');
$( ".slide-pref" ).hide();$( ".pref-1").show();$( ".swipetoolbar" ).show();
}
if (swiper.activeIndex == 2){$( ".swipetext" ).text('Photos');getData();
$( ".slide-pref" ).hide();$( ".pref-2").show();$( ".swipetoolbar" ).show();
}
if (swiper.activeIndex == 3){$( ".swipetext" ).text('Settings');
$( ".slide-pref" ).hide();$( ".pref-3").show();$( ".swipetoolbar" ).show();
}

if (!sexuality){$( '.swipetext' ).text("Welcome, " + f_first);mySwiper.lockSwipes();}


}
});   


swipePref(chosen);
	setTimeout(function(){ $( ".swipetoolbar" ).show(); }, 3000);
myApp.sizeNavbars();  
var dateinfo = [];

var s_namesonly = [];
var d = new Date();
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var daynumber;

var todayday = weekday[d.getDay()];



console.log(todayday);
s_namesonly.push(todayday);

        
var f_available_array; 
var s_alldays_values = [];
var s_alldays_names = [];

var tonight = new Date();
tonight.setHours(23,59,59,999);
var tonight_timestamp = Math.round(tonight/1000);

daynumber;


daynumber = d.getDate();

if (daynumber == '1' || daynumber == '21' || daynumber == '31'){dending = 'st'}
else if (daynumber == '2' || daynumber == '22'){dending = 'nd'}
else if (daynumber == '3' || daynumber == '23'){dending = 'rd'}
else {dending = 'th'}



dateinfo.push(daynumber + dending + ' ' + monthNames[d.getMonth()] + ', ' + d.getFullYear());

s_alldays_values.push(tonight_timestamp);



s_alldays_names.push('Today');


var tomorrow_timestamp = tonight_timestamp + 86400;
var tomorrowdate = new Date(Date.now() + 86400);
var tomorroww = new Date(d.getTime() + 24 * 60 * 60 * 1000);
var tomorrowday = weekday[tomorroww.getDay()];




daynumber = tomorroww.getDate();



if (daynumber == '1' || daynumber == '21' || daynumber == '31'){dending = 'st'}
else if (daynumber == '2' || daynumber == '22'){dending = 'nd'}
else if (daynumber == '3' || daynumber == '23'){dending = 'rd'}
else {dending = 'th'}



dateinfo.push(daynumber + dending + ' ' + monthNames[tomorrowdate.getMonth()] + ', ' + tomorrowdate.getFullYear());

console.log('tomorrow is' + tomorrowday);
s_namesonly.push(tomorrowday);

s_alldays_values.push(tomorrow_timestamp);
s_alldays_names.push('Tomorrow');

for (i = 1; i < 7; i++) { 
var newunix = tomorrow_timestamp + (86400 * i);
s_alldays_values.push(newunix);
var dat_number = i + 1;
var datz = new Date(Date.now() + dat_number * 24*60*60*1000);
daynumber = datz.getDate();
var dending;

if (daynumber == '1' || daynumber == '21' || daynumber == '31'){dending = 'st'}
else if (daynumber == '2' || daynumber == '22'){dending = 'nd'}
else if (daynumber == '3' || daynumber == '23'){dending = 'rd'}
else {dending = 'th'}

n = weekday[datz.getDay()];
qqq = weekday[datz.getDay() - 1];
console.log(n);
s_alldays_names.push(n + ' ' + daynumber + dending);

dateinfo.push(daynumber + dending + ' ' + monthNames[datz.getMonth()] + ', ' + datz.getFullYear());

s_namesonly.push(n);
}
s_namesonly.push(n);
console.log(s_namesonly);

console.log(s_alldays_values);

for (i = 0; i < s_alldays_names.length; i++) { 




if (i==0 | i==2 || i==4 || i==6){
$( ".availul" ).append(
'<li class="li_'+s_alldays_values[i]+' availrec" id="aa_'+s_alldays_values[i]+'" style="height:44px;float:left;width:100%;text-align:center;margin-bottom:10px;padding-top:10px;color:white;" onclick="openAvail('+s_alldays_values[i]+')">'+
'<div class="readd_'+s_alldays_values[i]+'"></div>'+
        '   <input type="text" placeholder="'+s_alldays_names[i]+'" readonly id="picker'+s_alldays_values[i]+'" style="height:44px;text-align:center;margin-top:-10px;font-size:17px;color:white;"></li><input type="hidden" class="suppdate_'+s_alldays_values[i]+'" value="'+dateinfo[i]+'">'
);
setPicker();
}
else if (i==1 || i==3 || i==5 || i==7) {
$( ".availul" ).append(
'<li class="li_'+s_alldays_values[i]+' availrec" id="aa_'+s_alldays_values[i]+'" style="height:44px;float:left;width:100%;text-align:center;margin-bottom:10px;padding-top:10px;color:white;" onclick="openAvail('+s_alldays_values[i]+')">'+
'<div class="readd_'+s_alldays_values[i]+'"></div>'+
        '<input type="text" placeholder="'+s_alldays_names[i]+'" readonly id="picker'+s_alldays_values[i]+'" style="height:44px;text-align:center;margin-top:-10px;font-size:17px;color:white;"></li><input type="hidden" class="suppdate_'+s_alldays_values[i]+'" value="'+dateinfo[i]+'">'
);
setPicker();
}

var alreadyavailchosen = 0;
var columnone;
var columntwo;
var idtochange;
for(var k = 0; k < availarray.length; k++) {
    
    if (availarray[k].id == s_alldays_values[i]){
    
    alreadyavailchosen = 1;columntwo = availarray[k].time;columnone = availarray[k].day;

    idtochange = s_alldays_values[i];$( '.li_'+ idtochange ).addClass('selecrec');$( "#picker"+ idtochange ).val( columnone + " " + columntwo ); }
    
    else{
    alreadyavailchosen = 0;
    }
    
    }




function setPicker(){



var myavailpicker = myApp.picker({
    
    input: '#picker' + s_alldays_values[i],
    onOpen: function (p){if (sexuality){processUpdate();  myApp.sizeNavbars();  }},
    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeAvail(\''+s_alldays_values[i]+'\',\''+s_alldays_names[i]+'\',\''+s_namesonly[i]+'\');">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [


        {
            textAlign: 'left',
         
            values: (s_namesonly[i] + ',').split(',')
        },
        {
            textAlign: 'left',
         
            values: ('Anytime Morning Midday Afternoon Evening').split(' ')
        },

    ]
});  


 

 
}



}








if (myphotosarray){



}
else {

}

       if (f_description){


$( "#userdescription" ).val(f_description);
var inputlengthd = $( "#userdescription" ).val().length;  
$( "#maxdescription" ).text(inputlengthd + ' / 100 ');

}



if (radiussize){

$( ".radiusbutton" ).removeClass( "active" );
$( "#distance_" + radiussize ).addClass( "active" );


}




if (offsounds == 'Y'){$('#soundnotif').prop('checked', true);}
else{$('#soundnotif').prop('checked', false);}


if (f_age) {$( ".savebutton" ).removeClass('disabled');}
if (!sexuality){$( "#distance-input" ).val( '100 Kilometres');}
	else {$( "#distance-input" ).val( radiussize + ' ' +radiusunit);
}
if(hometown_u){$( "#homesearch" ).val( hometown_u );}
if(industry_u){$( "#industry-input" ).val( industry_u );}
if(status_u){$( "#status-input" ).val( status_u );}
if(politics_u){$( "#politics-input" ).val( politics_u );}
if(eyes_u){$( "#eyes-input" ).val( eyes_u );}
if(body_u){$( "#body-input" ).val( body_u );}
if(religion_u){$( "#religion-input" ).val( religion_u );}
if(zodiac_u){$( "#zodiac-input" ).val( zodiac_u );}
if(ethnicity_u){$( "#ethnicity-input" ).val( ethnicity_u );}
if(weight_u){$( "#weight-input" ).val( weight_u + ' kg (' + Math.round(weight_u* 2.20462262) + ' lbs)' );}
if (height_u) {
     

     if (height_u == 122) {var heightset = '122 cm (4\' 0\'\')';}
     if (height_u == 124) {var heightset = '124 cm (4\' 1\'\')';}
     if (height_u == 127) {var heightset = '127 cm (4\' 2\'\')';}
     if (height_u == 130) {var heightset = '130 cm (4\' 3\'\')';}
     if (height_u == 132) {var heightset = '132 cm (4\' 4\'\')';}
          if (height_u == 135) {var heightset = '135 cm (4\' 5\'\')';}
     if (height_u == 137) {var heightset = '137 cm (4\' 6\'\')';}
     
     if (height_u == 140) {var heightset = '140 cm (4\' 7\'\')';}
     if (height_u == 142) {var heightset = '142 cm (4\' 8\'\')';}
     if (height_u == 145) {var heightset = '145 cm (4\' 9\'\')';}
     if (height_u == 147) {var heightset = '147 cm (4\' 10\'\')';}
     if (height_u == 150) {var heightset = '150 cm (4\' 11\'\')';}
     if (height_u == 152) {var heightset = '152 cm (5\' 0\'\')';}
     if (height_u == 155) {var heightset = '155 cm (5\' 1\'\')';}
          if (height_u == 157) {var heightset = '157 cm (5\' 2\'\')';}
          if (height_u == 160) {var heightset = '160 cm (5\' 3\'\')';}
          if (height_u == 163) {var heightset = '163 cm (5\' 4\'\')';}
               if (height_u == 165) {var heightset = '165 cm (5\' 5\'\')';}
                    if (height_u == 168) {var heightset = '168 cm (5\' 6\'\')';}
                         if (height_u == 170) {var heightset = '170 cm (5\' 7\'\')';}
                              if (height_u == 173) {var heightset = '173 cm (5\' 8\'\')';}
                                   if (height_u == 175) {var heightset = '175 cm (5\' 9\'\')';}
                                        if (height_u == 178) {var heightset = '178 cm (5\' 10\'\')';}
                                             if (height_u == 180) {var heightset = '180 cm (5\' 11\'\')';}
                                                  if (height_u == 183) {var heightset = '183 cm (6\' 0\'\')';}
                                                       if (height_u == 185) {var heightset = '185 cm (6\' 1\'\')';}
                                                            if (height_u == 188) {var heightset = '185 cm (6\' 2\'\')';}
                                                                 if (height_u == 191) {var heightset = '191 cm (6\' 3\'\')';}
                                                                      if (height_u == 193) {var heightset = '193 cm (6\' 4\'\')';}
                                                                           if (height_u == 195) {var heightset = '195 cm (6\' 5\'\')';}
                                                                                if (height_u == 198) {var heightset = '198 cm (6\' 6\'\')';}
                                                                                     if (height_u == 201) {var heightset = '201 cm (6\' 7\'\')';}
                                                                                          if (height_u == 203) {var heightset = '203 cm (6\' 8\'\')';}
                                                                                          $( "#height-input" ).val( heightset );
                                                                                          }

if (f_age && f_gender) {$( "#picker-describe" ).val( f_gender + ", " + f_age );}



if (f_interested) {$( "#picker-describe2" ).val( f_interested + ", between " + f_lower + ' - ' + f_upper );}




pickerDescribe = myApp.picker({
    input: '#picker-describe',
    rotateEffect: true,
onClose:function (p){
$( ".popup-overlay" ).css("z-index","10500");
},
onOpen:   function (p){

if (sexuality){processUpdate();  myApp.sizeNavbars();  }
$('.picker-items-col').eq(0).css('width','50%');

$('.picker-items-col').eq(1).css('width','50%');


           //  $( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");

var gendercol = pickerDescribe.cols[0];
var agecol = pickerDescribe.cols[1];
if (f_age) {agecol.setValue(f_age);}
if (f_gender) {gendercol.setValue(f_gender);}





    
},




onChange:    function (p, value, displayValue){
        
        if (!f_age){
        var fpick = pickerDescribe.value;
        var spick = pickerDescribe2.value;
        
        if (fpick && spick) {
        if(!sexuality){sexuality=true;$( ".registerdiv" ).slideUp();$('.hiderowpref').removeClass('hiderowpref');$( ".swipetoolbar" ).show();$( '.swipetext' ).text("Profile");mySwiper.unlockSwipes();$( ".donechange" ).show();$( ".doneunchange" ).hide();myApp.sizeNavbars(); }
        $( ".savebutton" ).removeClass( "disabled" );}
        else {$( ".savebutton" ).addClass( "disabled" );}
        }
        
        
        
    },
formatValue: function (p, values, displayValues) {
        return displayValues[0] + ', ' + values[1];
    },    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    'I Am'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
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

    onClose:function (p){
$( ".popup-overlay" ).css("z-index","10500");
},
    onChange:    function (p, value, displayValue){
        
        if (!f_age){
        var fpick = pickerDescribe.value;
        var spick = pickerDescribe2.value;
        
        if (fpick && spick) {
                if(!sexuality){sexuality=true;$( ".registerdiv" ).slideUp();$('.hiderowpref').removeClass('hiderowpref');$( ".swipetoolbar" ).show();$( '.swipetext' ).text("Profile");mySwiper.unlockSwipes();$( ".donechange" ).show();$( ".doneunchange" ).hide();myApp.sizeNavbars(); }
        $( ".savebutton" ).removeClass( "disabled" );}
        else {$( ".savebutton" ).addClass( "disabled" );}
        }
        
        
        
    },
    onOpen:   function (p){if (sexuality){processUpdate();  myApp.sizeNavbars();  }
          //   $( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");
$('.picker-items-col').eq(0).css('width','33%');

$('.picker-items-col').eq(1).css('width','33%');
			   $('.picker-items-col').eq(2).css('width','33%');

    var interestedcol = pickerDescribe2.cols[0];
var lowercol = pickerDescribe2.cols[1];
var uppercol = pickerDescribe2.cols[2];
if (f_interested) {interestedcol.setValue(f_interested);}
if (f_lower) {lowercol.setValue(f_lower);}
if (f_upper) {uppercol.setValue(f_upper);}

    
},


formatValue: function (p, values, displayValues) {
        
        if (values[1] > values[2]) {        return displayValues[0] + ', between ' + values[2] + ' - ' + values[1];}
        else {        return displayValues[0] + ', between ' + values[1] + ' - ' + values[2];
}
        
    },    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    'Preference'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
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
  
  
  }
  
  
function swipePref(index){$( ".pref-" + index).show();mySwiper.slideTo(index);
			 
			 
			 }

function navPicker(){



myApp.pickerModal(
    '<div class="picker-modal picker-sub" style="height:88px;">' +
      '<div class="toolbar tabbar" style="z-index:9999;background-color:#ccc;">' +
        '<div class="toolbar-inner" style="padding:0;">' +
         
         '   <a href="#" class="button tab-link tab-swipe home1 " onclick="swipePopup(0);" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-clock pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
        
          '  <a href="#" class="button tab-link tab-swipe home2" onclick="swipePopup(1);" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-info pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
          '  <a href="#" class="button tab-link tab-swipe home3" onclick="swipePopup(2);" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-camera pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
          '  <a href="#" class="button tab-link tab-swipe home4" onclick="swipePopup(3);" style="border-radius:0;font-size:17px;border:0;text-align:center;"><i class="pe-7s-config pe-lg" style="width:22px;margin:0 auto;"></i></a>'+
      

         
      '</div>' +
      '</div>' +
      '<div class="picker-modal-inner close-picker" style="height:44px;background-color:#2196f3;text-align:center;">' +
        
        '<i class="pe-7s-angle-down pe-2x " style="font-size:34px;margin-top:5px;color:white;"></i>'+
        
      '</div>' +
    '</div>'
  );

}

function removeProfileSet(pickertype){





$( "#" + pickertype + "-input").remove();
$( "." + pickertype + "-div").append( '<input type="text" id="'+pickertype+'-input" name="name" placeholder="Hide" readonly >' );

if (pickertype=='industry'){

var industrypicker = myApp.picker({
    input: '#industry-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (industry_u) {industrypicker.cols[0].setValue(industry_u);}


},
             onChange:function (p, values, displayValues){$( '#industry-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'industry\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Accounting', 'Administration','Advertising','Agriculture','Banking and finance', 'Business', 'Charity', 'Creative arts','Construction','Consulting', 'Design', 'Education','Energy','Events', 'Engineering','Environment','Healthcare','Hospitality','HR and Recruitment', 'IT','Law','Law Enforcement','Leisure','Management','Manufacturing', 'Marketing','Media','Other','Pharmaceuticals','PR','Property','Public Services','Retail','Sales','Science','Security','Social Care','Small business','Sport','Tourism','Transport','Utilities','Voluntary work']
       }
     ]
});  


}

if (pickertype=='status'){

var statuspicker = myApp.picker({
    input: '#status-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (status_u) {statuspicker.cols[0].setValue(status_u);}},
             onChange:function (p, values, displayValues){$( '#status-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'status\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Single', 'Married', 'Engaged','Open relationship', 'Committed relationship','It\'s Complicated']
       }
     ]
}); 

}

if (pickertype=='politics'){

var politicspicker = myApp.picker({
    input: '#politics-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (politics_u) {politicspicker.cols[0].setValue(politics_u);}},
             onChange:function (p, values, displayValues){$( '#politics-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'politics\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Left / Liberal', 'Centre','Right / Conservative','Not interested']
       }
     ]
}); 

}

if (pickertype=='zodiac'){

var zodiacpicker = myApp.picker({
    input: '#zodiac-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (zodiac_u) {zodiacpicker.cols[0].setValue(zodiac_u);}},
             onChange:function (p, values, displayValues){$( '#zodiac-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'zodiac\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn','Aquarius','Pisces']
       }
     ]
}); 

}

if (pickertype=='religion'){
var religionpicker = myApp.picker({
    input: '#religion-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (religion_u) {religionpicker.cols[0].setValue(religion_u);}},
             onChange:function (p, values, displayValues){$( '#religion-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'religion\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Atheist','Agnostic','Christianity','Islam','Buddhism','Hindusim','Sikhism','Judaism','Other']
       }
     ]
}); 
}
if (pickertype=='ethnicity'){
var ethnicitypicker = myApp.picker({
    input: '#ethnicity-input',
             onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (ethnicity_u) {ethnicitypicker.cols[0].setValue(ethnicity_u);}},
             onChange:function (p, values, displayValues){$( '#ethnicity-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'ethnicity\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Asian', 'Black', 'Latin / Hispanic','Mixed','Middle Eastern','Native American','Other','Pacific Islander','White']
       }
     ]
}); 
}

if (pickertype=='height'){
var heightpicker = myApp.picker({
    input: '#height-input',
     onChange:function (p, values, displayValues){$( '#height-input' ).addClass("profilevaluechosen");},
     onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (height_u) {

     if (height_u == 122) {var heightset = '122 cm (4\' 0\'\')';}
     if (height_u == 124) {var heightset = '124 cm (4\' 1\'\')';}
     if (height_u == 127) {var heightset = '127 cm (4\' 2\'\')';}
     if (height_u == 130) {var heightset = '130 cm (4\' 3\'\')';}
     if (height_u == 132) {var heightset = '132 cm (4\' 4\'\')';}
          if (height_u == 135) {var heightset = '135 cm (4\' 5\'\')';}
     if (height_u == 137) {var heightset = '137 cm (4\' 6\'\')';}
     
     if (height_u == 140) {var heightset = '140 cm (4\' 7\'\')';}
     if (height_u == 142) {var heightset = '142 cm (4\' 8\'\')';}
     if (height_u == 145) {var heightset = '145 cm (4\' 9\'\')';}
     if (height_u == 147) {var heightset = '147 cm (4\' 10\'\')';}
     if (height_u == 150) {var heightset = '150 cm (4\' 11\'\')';}
     if (height_u == 152) {var heightset = '152 cm (5\' 0\'\')';}
     if (height_u == 155) {var heightset = '155 cm (5\' 1\'\')';}
          if (height_u == 157) {var heightset = '157 cm (5\' 2\'\')';}
          if (height_u == 160) {var heightset = '160 cm (5\' 3\'\')';}
          if (height_u == 163) {var heightset = '163 cm (5\' 4\'\')';}
               if (height_u == 165) {var heightset = '165 cm (5\' 5\'\')';}
                    if (height_u == 168) {var heightset = '168 cm (5\' 6\'\')';}
                         if (height_u == 170) {var heightset = '170 cm (5\' 7\'\')';}
                              if (height_u == 173) {var heightset = '173 cm (5\' 8\'\')';}
                                   if (height_u == 175) {var heightset = '175 cm (5\' 9\'\')';}
                                        if (height_u == 178) {var heightset = '178 cm (5\' 10\'\')';}
                                             if (height_u == 180) {var heightset = '180 cm (5\' 11\'\')';}
                                                  if (height_u == 183) {var heightset = '183 cm (6\' 0\'\')';}
                                                       if (height_u == 185) {var heightset = '185 cm (6\' 1\'\')';}
                                                            if (height_u == 188) {var heightset = '185 cm (6\' 2\'\')';}
                                                                 if (height_u == 191) {var heightset = '191 cm (6\' 3\'\')';}
                                                                      if (height_u == 193) {var heightset = '193 cm (6\' 4\'\')';}
                                                                           if (height_u == 195) {var heightset = '195 cm (6\' 5\'\')';}
                                                                                if (height_u == 198) {var heightset = '198 cm (6\' 6\'\')';}
                                                                                     if (height_u == 201) {var heightset = '201 cm (6\' 7\'\')';}
                                                                                          if (height_u == 203) {var heightset = '203 cm (6\' 8\'\')';}
     

     
     heightpicker.cols[0].setValue(heightset);}},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'height\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['122 cm (4\' 0\'\')','124 cm (4\' 1\'\')','127 cm (4\' 2\'\')','130 cm (4\' 3\'\')','132 cm (4\' 4\'\')','135 cm (4\' 5\'\')','137 cm (4\' 6\'\')','140 cm (4\' 7\'\')','142 cm (4\' 8\'\')','145 cm (4\' 9\'\')','147 cm (4\' 10\'\')','150 cm (4\' 11\'\')','152 cm (5\' 0\'\')','155 cm (5\' 1\'\')','157 cm (5\' 2\'\')','160 cm (5\' 3\'\')','163 cm (5\' 4\'\')','165 cm (5\' 5\'\')','168 cm (5\' 6\'\')','170 cm (5\' 7\'\')','173 cm (5\' 8\'\')','175 cm (5\' 9\'\')','178 cm (5\' 10\'\')','180 cm (5\' 11\'\')','183 cm (6\' 0\'\')','185 cm (6\' 1\'\')','188 cm (6\' 2\'\')','191 cm (6\' 3\'\')','193 cm (6\' 3\'\')','195 cm (6\' 4\'\')','198 cm (6\' 5\'\')','201 cm (6\' 6\'\')','203 cm (6\' 8\'\')']
       },

     ]
}); 
}

if (pickertype=='weight'){

var weightpicker = myApp.picker({
    input: '#weight-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (weight_u) {

         
         weightpicker.cols[0].setValue(weight_u + ' kg (' + Math.round(weight_u* 2.20462262) + ' lbs)');}},
onChange:function (p, values, displayValues){$( '#weight-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'weight\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="center">' +
                   'Weight'+
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {

            values: (function () {
                var arr = [];
                for (var i = 45; i <= 150; i++) { arr.push(i + ' kg (' + Math.round(i* 2.20462262) + ' lbs)'); }
                return arr;
            })(),
       },
     ]
}); 

}

if (pickertype=='eyes'){var eyespicker = myApp.picker({
    input: '#eyes-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (eyes_u) {eyespicker.cols[0].setValue(eyes_u);}},
onChange:function (p, values, displayValues){$( '#eyes-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'eyes\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Amber', 'Blue', 'Brown','Grey','Green','Hazel','Other']
       }
     ]
}); 
}

if (pickertype=='body'){
var bodypicker = myApp.picker({
    input: '#body-input',
         onOpen: function (p){$( '.picker-items-col-wrapper' ).css("width", + $( document ).width() + "px");if (body_u) {bodypicker.cols[0].setValue(body_u);}},
onChange:function (p, values, displayValues){$( '#body-input' ).addClass("profilevaluechosen");},
     toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left" onclick="removeProfileSet(\'body\')">' +
                    '<a href="#" class="link close-picker" style="color:#ff3b30">Cancel</a>' +
                '</div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>' +
        '</div>',
    cols: [
       {
         values: ['Athletic','Average', 'Slim', 'Large', 'Muscular','Unimportant']
       }
     ]
}); 
}

}

function actionSheet(){



var first_number,second_number;

if (Number(f_uid) > Number(targetid) ) {second_number = f_uid;first_number = targetid;}
else {first_number = f_uid;second_number = targetid;}

if  ($('.chatpop').length === 0 || ($('.chatpop').length === 1 &&   $('.chatpop').css('z-index') === '10000')){

var disabledattribute;
if (targetreported){disabledattribute=true;}else{disabledattribute=false;}

  var buttons = [
        {
            text: 'View Profile',
            bold: true,
            onClick: function () {
  
  
  
  
                if ($('.infopopup').length > 0) {
scrolltoTop();
}
else{questions();scrolltoTop();}
                
                
            }
        },
        {
            text: 'View Profile Photos ('+new_all[myPhotoBrowser.swiper.activeIndex].photocount+')',
            bold: true,
            onClick: function () {
                                if ($('.infopopup').length > 0) {
myApp.closeModal() ;backtoProfile();
}
else{}
                
                
            }
        },
        {
            text: 'View Photo Bombs (0)',
            disabled:true,
            color: 'green',
            onClick: function () {
                
                imagesPopup();
                
            }
        },
        {
            text: 'Block',
            onClick: function () {
                
                more();
                
            }
        },{
            text: 'Report',
disabled:disabledattribute,
            onClick: function () {
                
                report();
                
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];

}

else {


var elementPos = new_all.map(function(x) {return x.id; }).indexOf(targetid);



//var elementPos = new_all.findIndex(x => x.id==targetid);




var disabledattribute;
if (targetreported){disabledattribute=true;}else{disabledattribute=false;}

  var buttons = [
        {
            text: 'View Profile',
            bold: true,
            onClick: function () {
                
  if($( ".center" ).hasClass( "close-popup" )){
 myApp.closeModal('.chatpop');

                if ($('.infopopup').length > 0) {
scrolltoTop();
}
else{questions();scrolltoTop();}
  
  }else{viewscroll = true;singleUser(targetid,targetname);}


                
                
            }
        },
        {
            text: 'View Profile Photos ('+new_all[elementPos].photocount+')',
            bold: true,
            onClick: function () {
                  
                   if($( ".center" ).hasClass( "close-popup" )){
 myApp.closeModal('.chatpop');

backtoProfile();
  
  }else{viewphotos = true;singleUser(targetid,targetname);}
                                


                
                
            }
        },
                {    text: 'View Photo Bombs (0)',
            disabled:true,
            color: 'green',
            onClick: function () {
                
                imagesPopup();
                
            }
        },
        {
            text: 'Block',
            onClick: function () {
                
                more();
                
            }
        },{
            text: 'Report',
disabled:disabledattribute,
            onClick: function () {
                
                report();
                
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];

}






    myApp.actions(buttons);
    
    
    
    var photobombsheet = firebase.database().ref('photochats/' + first_number + '/'+ second_number);
photobombsheet.once('value', function(snapshot) {
if(snapshot.val()){$(".color-green").removeClass('disabled');


$(".color-green").html('View Photo Bombs ('+snapshot.numChildren()+')');

}
});
 
 
    
}
