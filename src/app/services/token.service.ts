import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  SetToken(token){
    this.cookieService.set('chat_token', token);

    //console.log(token);
  }

  GetToken(){
    return this.cookieService.get('chat_token');
  }

  DeleteToken(){
    this.cookieService.delete('chat_token');
  }

  GetPayLoad(){
    const token = this.GetToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }

    return payload.data;
  }

}
