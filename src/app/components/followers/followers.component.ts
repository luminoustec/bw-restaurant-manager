import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;
  socket : any;

  constructor(private tokenService: TokenService, private usersService : UsersService) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.GetUser();
    this.socket.on('refreshPage', () => {
        this.GetUser();
    });
  }

  GetUser(){
    this.usersService.GetUserById(this.user._id).subscribe(data => {
      console.log(data);
        this.followers = data.result.followers;
    }, err => console.log(err));
  }

}
