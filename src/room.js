import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Cookie} from './cookie.js';
import {Router} from 'aurelia-router';
import 'fetch';



@inject(HttpClient, Router)
export class Room {
  heading = 'Rooms';
  rooms = [];
  newRoom = '';
  newRoomId = false;
  nickName = "";
  cookie;

  constructor(http, router) {
    this.router = router;

    if(typeof Cookie.get("nickName") != 'undefined' ){
      this.nickName = Cookie.get("nickName");

    }
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://127.0.0.1:1337/');
    });
    this.http = http;
    this.handleBodyClick = e => {
      if(e.target.getAttribute('data-id')){
        e.target.style.backgroundColor = "red";
        console.log(e.target.getAttribute('data-id'));
        this.newRoomId = e.target.getAttribute('data-id');
      }
    };
  }

  activate() {
     return this.http.fetch('chatroom?sort=name ASC')
      .then(response => response.json())
      .then(rooms => {
        this.rooms = rooms;
      });
  }

  attached() {
      document.addEventListener('click', this.handleBodyClick);
  }

  detached() {
      document.removeEventListener('click', this.handleBodyClick);
  }

  redirect(){
     this.router.navigate("chat?roomid="+this.newRoomId);
  }


  submit() {

    if( !this.newRoomId && this.newRoom == ""){
      alert('No room choosen or no new room specified');
      return;
    }else{
      Cookie.set('roomId',  this.newRoomId);
    }

    if( this.nickName == ""){
      alert('You must specify a nickname [' + this.nickName + "]");
      return;
    }else{
      Cookie.set('nickName',  this.nickName);
    }

    // a new roomname was specified, lets create it
    if(this.newRoom != ""){
      var roomname = {
        name: this.newRoom
      }

      this.http.fetch(
        "chatroom", {
          method: "post",
          body: JSON.stringify(roomname)
        }
      )
      .then(



        (response) => {
          this.isInserted = true;
          this.statusCode = response.status;
          //console.log("resjsn:"+response.json());
          return response.json().then(json => {
            //console.log("json:"+json.id);

            this.newRoomId = json.id;
            Cookie.set('roomId',  this.newRoomId);
          });

        }
      );
    }

    this.newRoom = "";
  //  alert("entering room: "+ this.newRoomId + " with nickname: " + this.nickName);
    this.redirect();
  }
}
