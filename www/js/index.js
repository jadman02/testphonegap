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
       
        
        //firebaseauthchange
        
        firebase.auth().onAuthStateChanged(function(user) {
 
  
  
  if (user) {
      
      
      
       console.log(user);
       console.log('yes user');// User is signed in.

       f_uid = user.providerData[0].uid;
        f_name = user.providerData[0].displayName;
         f_first = f_name.substr(0,f_name.indexOf(' '));
         f_email = user.providerData[0].email;
          f_image = user.providerData[0].photoURL;
                 console.log('change in auth state' + f_name);
   
   console.log(f_uid);
   var ttt = String(f_uid);
   console.log(ttt);
   var tttt = String(ttt);
   console.log(tttt);
   
  // $( "#profilepic" ).empty();
  // $( "#profilepic" ).append('<div style="float:left;height:30px;width:30px;border-radius:5px;margin-right:5px;background-size:cover;background-position:50% 50%;background-image:url(\'http://graph.facebook.com/'+f_uid+'/picture?type=normal\');"></div>');




  var notifcount = firebase.database().ref('notifications/' +f_uid).on('value', function(snapshot) {

var notificationscount = 0;

var objs = snapshot.val();

//If existing notifications, get number of unseen messages, delete old notifications
if (snapshot.val()){

$.each(objs, function(i, obj) {

if (obj.to_uid == f_uid) {
    
    if (obj.received =='N') {notificationscount = notificationscount + obj.new_message_count;$('#buzzer')[0].play();}
    
    
    
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




    
