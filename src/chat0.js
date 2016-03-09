import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {Cookie} from './cookie.js';

import 'fetch';

@inject(HttpClient, Router)
export class Chat {
  heading = 'Chat';
  chats = [];
  newMessage = '';
  roomId = false;
  nickName = false;

  constructor(http, router) {

    this.router = router;
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://127.0.0.1:1337/');
    });
    this.http = http;




  }

  activate(params) {
    console.log("params.roomid"+params.roomid);



    return this.http.fetch('chats?sort=createdAt DESC&limit=10')
      .then(response => response.json())
      .then(chats => {
        this.chats = chats.reverse();
      });
  }


  checkNick(){
    if(typeof Cookie.get("nickname") != 'undefined' ){
      this.nickName = Cookie.get("nickName");
    //  alert("welcome back"+ this.nickName);
    }else{
        alert("No nickname set, sending yoy back to rooms page");
        this.router.navigate("room");
    }
  }

  checkRoomId(){
    if(typeof Cookie.get("roomId") != 'undefined' ){
      this.roomId = Cookie.get("roomId");
    //  alert("welcome back"+ this.nickName);
    }else{
        alert("No roomId set, sending yoy back to rooms page");
        this.router.navigate("room");
    }
  }

  attached() {
      this.scrolbot();
  }

    scrolbot(){
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
        //alert("scrolling");
    }


  submit() {
    var chatmsg = {
      chat: this.newMessage
    }
    this.http.fetch("chats", {
      method: "post",
      body: JSON.stringify(chatmsg)
    }).then(response => {
      this.isInserted = true;
      this.statusCode = response.status;
    });
    this.activate();
    this.newMessage = "";
    this.scrolbot();
  }
}
