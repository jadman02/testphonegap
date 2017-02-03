// Initialize your app
var myApp = new Framework7({init: false});

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
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
       myApp.init();
        
        //firebaseauthchange
        
        firebase.auth().onAuthStateChanged(function(user) {
 
  
  if (user) {
      
      alert('user yes');
    
      alert(user.providerData[0].displayName);
     f_uid = user.providerData[0].uid;
        f_name = user.providerData[0].displayName;
         f_first = f_name.substr(0,f_name.indexOf(' '));
         f_email = user.providerData[0].email;
          f_image = user.providerData[0].photoURL;
                 console.log('change in auth state' + f_name);
    
  } else {
      $( ".ploader" ).show();
      $( ".loginbutton" ).show();
      $( ".login-loader" ).hide();

      alert('no user');
      
//startApp();
      


    
    // No user is signed in.
  }

     });
    
        
        
        
        
        
        
        
        
    }
};


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




    
