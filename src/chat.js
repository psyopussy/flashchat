import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Cookie} from './cookie.js';
import {ChatApi} from './Model/chatApi.js';
import 'fetch';

@inject( Router, ChatApi)
export class Chat {

  heading = 'Chat';
  messages = [];
  newMessage = '';
  roomId = false;
  roomName = "";
  nickName = false;

  constructor(router, chatApi) {
    this.router = router;
    this.chatApi = chatApi;
  }

  activate(params) {
    console.log("params.roomid"+params.roomid);
    this.checkNick();
    this.checkRoomId();
    this.populate();
  }

  populate(){
      this.chatApi.getRoom(this.roomId)
      .then(room => {
        this.messages = room.messages;
        this.roomName = room.name;
       this.scrolbot();
      }
    ).catch(function(e) {
      console.log(e);
    });
  }

  attached() {
    //  this.scrolbot(); // nope.. guess not...
  }


  checkNick(){

    if(typeof Cookie.get("nickName") != 'undefined' ){
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
    }else{
      alert("No roomId set, sending yoy back to rooms page");
      this.router.navigate("room");
    }
  }

  scrolbot(){
      this.chatbox.scrollTop = this.chatbox.scrollHeight ;
  }

  submit() {
    var chatMessage = {
      content: this.newMessage,
      nickname: this.nickName,
      color: "black",
      parent: this.roomId,
    }
    this.chatApi.setMessage(chatMessage)
      .then(() => {this.populate();});

    this.newMessage = "";
    this.scrolbot();
  }
}
