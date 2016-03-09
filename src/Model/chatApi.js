import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class ChatApi {

  constructor(http) {
    http.configure(config => {
      config
      .withBaseUrl('http://127.0.0.1:1337/')
      .withDefaults({
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
        }
      })
      .withInterceptor({
        request(request) {
          console.log(`Requesting ${request.method} ${request.url}`);
          return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
        },
        response(response) {
          console.log(`Received ${response.status} ${response.url}`);
          return response; // you can return a modified Response
        }
      });
    });
    this.http = http;
  }

  getRoom(roomId){
    // return this.http.fetch('chatroom?id=24 sort=createdAt DESC&limit=10')
    return this.http.fetch('chatroom?id='+ roomId)

      .then(response => response.json())
      .then(room => {
        return room;
      });
  }

  setMessage(chatMessage){
    console.log(chatMessage);
    return this.http.fetch("message", { method: "post", body: JSON.stringify(chatMessage)});
  }

}
