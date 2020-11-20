import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

import io from 'socket.io-client';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  socket: any;
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService : PostService) {
    this.socket = io('https://multitier-restaurant.herokuapp.com');
  }

  ngOnInit() {
    this.init();
  }

  init(){
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    })
  }

  SubmitPost(){
    let body;
    if(!this.selectedFile){
      body = {
        post: this.postForm.value.post,

      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile
      }
    }


    console.log(body);
    this.postService.addPost(body).subscribe( data => {
       // console.log(data);
       this.socket.emit('refresh', {});
        this.postForm.reset();
    });
  }

  ReadAsBase64(file): Promise <any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve ,reject) => {
        reader.addEventListener('load' , () => {
          resolve(reader.result);
        });

        reader.addEventListener('error' , (event) => {
          reject(event);
        });

        reader.readAsDataURL(file);
    });

    return fileValue;
  }

  OnFileSelected(event){
    const file: File = event[0];

    this.ReadAsBase64(file).then(result => {
        this.selectedFile = result;
    }).catch(err => console.log(err));
  }

}
