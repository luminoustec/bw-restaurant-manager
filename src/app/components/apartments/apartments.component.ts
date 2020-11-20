import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

	socket: any;
  users = [];
  loggedInUser: any;



  apartments = [];

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private apartmentService: ApartmentService) {

    }

  ngOnInit() {
	  this.loggedInUser = this.tokenService.GetPayLoad();
		this.GetAllApartments();
	  
  }
  
  GetAllApartments(){
    this.apartmentService.GetAllApartments().subscribe(data => {
      console.log(data);
      this.apartments = data.apartments;

      console.log(this.apartments);
    });
  }
  
  ViewApartmentInfo(apartment){
    this.router.navigate(['apartment',apartment._id]);
  }

}
