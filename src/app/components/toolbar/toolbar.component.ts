import { TokenService } from '../../services/token.service';
import { Component, OnInit, AfterViewInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from '../../services/users.service';


import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit , AfterViewInit {

  @Output() onlineUsers = new EventEmitter();

  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: any;
  imageVersion : any;

  constructor(private tokenService: TokenService, private router: Router,
    private usersService: UsersService,
  private msgService: MessageService) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    console.log(this.user);

	/**
    const dropDownELement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownELement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
	*/

	
    const dropDownELementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropDownELementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });


	const dropDownELementAddress = document.querySelectorAll('.dropdown-trigger2');
    M.Dropdown.init(dropDownELementAddress, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });
	
	const dropDownELementAddressAdd = document.querySelectorAll('.dropdown-trigger3');
    M.Dropdown.init(dropDownELementAddressAdd, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });
	
	const dropDownELementAdd = document.querySelectorAll('.dropdown-trig4');
    M.Dropdown.init(dropDownELementAdd, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });
	
	const dropDownELements= document.querySelectorAll('.dropdown-trigger5');
    M.Dropdown.init(dropDownELements, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });





    this.socket.emit('online' , {room: 'global' , user: this.user.username});

    this.GetUser();



    this.socket.on('refreshPage', data =>{
      this.GetUser();
    });



  }

  ngAfterViewInit(){
      this.socket.on('usersOnline', (data) => {
        this.onlineUsers.emit(data);
      });
  }

  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }

  GoToHome(){
    this.router.navigate(['restaurants/all']);
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  GetUser(){
    this.usersService.GetUserById(this.user._id).subscribe(data => {
        this.imageId = data.result.picId;
        this.imageVersion = data.result.picVersion;

        this.notifications = data.result.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
        this.chatList = data.result.chatList;
        console.log(this.chatList);
        this.CheckIfRead(this.chatList);
    }, err =>{
      if(err.error.token = null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  MarkAll(){
    this.usersService.MarkAllAsRead().subscribe(data => {

      console.log(data);

      this.socket.emit('refresh', {});
    });
  }

  MessageDate(data){
    return moment(data).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastweek: 'DD/MM/YYYY',
        sameElse: 'DD/MM/YYYY',
    });
  }

  CheckIfRead(arr){
    const checkArr = [];
    for( let i = 0; i < arr.length ; i++) {
        const receiver = arr[i].msgId.message[arr[i].msgId.message.length -1];
        if(receiver.isRead === false && receiver.receivername === this.user.username){
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
    }
  }

  GoToChatPage(name){
    this.router.navigate(['chat', name]);
    this.msgService.MarkMessages(this.user.username,name).subscribe(data =>{
        console.log(data);
        this.socket.emit('refresh', {});
    });
  }

  MarkAllMessages(){
    this.msgService.MarkAllMessages().subscribe(data => {
        this.socket.emit('refresh', {} );
        this.msgNumber = 0;
    });
  }



}
