import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { StreetService } from '../../services/street.service';

@Component({
  selector: 'app-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.css']
})
export class StreetsComponent implements OnInit {
	
	socket: any;
  users = [];
  loggedInUser: any;



  streets = [];

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private streetService: StreetService) {

    }

  ngOnInit() {
	  
	  this.loggedInUser = this.tokenService.GetPayLoad();
		this.GetAllStreets();
  }
  
  GetAllStreets(){
    this.streetService.GetAllStreets().subscribe(data => {
      console.log(data);
      this.streets = data.streets;

      console.log(this.streets);
    });
  }
  
  ViewStreetInfo(street){
    this.router.navigate(['street',street._id]);
  }

}
