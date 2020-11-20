import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;
  userArr = [];
  onlineusers = [];

  constructor(private usersService: UsersService, private tokenService: TokenService, private router: Router) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
  }

  ngOnInit() {
      this.loggedInUser = this.tokenService.GetPayLoad();
      this.GetUsers();
      this.GetUser();


      this.socket.on('refreshPage', data =>{
        console.log(data);
        this.GetUsers();
        this.GetUser();
      });


  }

  GetUsers(){
    this.usersService.GetAllUser().subscribe(data => {
      _.remove(data.result, {username: this.loggedInUser.username});
      this.users = data.result;
    });
  }


  GetUser(){
    this.usersService.GetUserById(this.loggedInUser._id).subscribe(data => {
      this.userArr = data.result.following;
    });
  }

  FollowUser(user){
    this.usersService.FollowUser(user._id).subscribe(data =>{
      console.log(data);
      this.socket.emit('refresh' , {});
    });
  }

  CheckInArray(arr,id){
    const result = _.find(arr, ['userFollowed._id',id]);
    if(result){
      return true;
    }else{
      return false;
    }
  }

  online(event){
    this.onlineusers = event;
  }

  CheckIfOnline(name){
    const result = _.indexOf(this.onlineusers , name);
    if(result > -1){
      return true;
    } else {
      return false;
    }
  }

  ViewUser(user){
      this.router.navigate([user.username]);
      if(this.loggedInUser.username !== user.username){
          this.usersService.ProfileNotifications(user._id).subscribe(data => {
              this.socket.emit('refresh' , {} );
          },
        err => console.log(err));
      }
  }


}
