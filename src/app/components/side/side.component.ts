import * as M from 'materialize-css';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  socket: any;
  user: any;
  userData: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
   }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.GetUser();

    const dropDownELement = document.querySelectorAll('.sidenav');
    M.Sidenav.init(dropDownELement, {

    });



    this.socket.on('refreshPage', () => {
        this.GetUser();
    });
  }

  GetUser(){
    this.usersService.GetUserById(this.user._id).subscribe(data =>{
      this.userData = data.result;

      console.log(this.userData);
    })
  }

}
