
import { Component, OnInit, AfterViewInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.css']
})
export class ToolbarsComponent implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {

  }


  GoToLogin(){
    this.router.navigate(['']);
  }

  GoToSignUp(){

    this.router.navigate(['signup']);
  }

}
