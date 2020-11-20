import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  socket: any;
  topPosts = [];
  user: any;

  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayLoad();
    this.AllPosts();

    this.socket.on('refreshPage', data =>{
      this.AllPosts();
    });
  }

  AllPosts(){
    this.postService.getAllPosts().subscribe(data => {
      this.topPosts = data.top;
    }, err =>{
      if(err.error.token = null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  LikePost(post){
    this.postService.addLike(post).subscribe(data =>{
      console.log(data);
      this.socket.emit('refresh', {});
    },
    err => console.log(err));
  }

  CheckInLikesArray(arr, username){
    return _.some(arr, {username: username});
  }

  OpenCommentBox(post){
    this.router.navigate(['post',post._id]);
  }

}
