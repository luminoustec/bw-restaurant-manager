import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
	
	socket: any;
  users = [];
  loggedInUser: any;



  cities = [];

    constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private cityService: CityService) {

    }

  ngOnInit() {
	   this.loggedInUser = this.tokenService.GetPayLoad();
		this.GetAllCities();
  }
  
  GetAllCities(){
    this.cityService.GetAllCities().subscribe(data => {
      console.log(data);
      this.cities = data.cities;

      console.log(this.cities);
    });
  }
  
  ViewCityInfo(city){
    this.router.navigate(['city',city._id]);
  }

}
