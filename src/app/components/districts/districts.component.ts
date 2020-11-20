import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;



  districts = [];

    constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private districtService: DistrictService) {

    }

  ngOnInit() {
	  
	   this.loggedInUser = this.tokenService.GetPayLoad();
		this.GetAllDistricts();
  }
  
  GetAllDistricts(){
    this.districtService.GetAllDistricts().subscribe(data => {
      console.log(data);
      this.districts = data.districts;

      console.log(this.districts);
    });
  }
  
  ViewDistrictInfo(district){
    this.router.navigate(['district',district._id]);
  }

}
