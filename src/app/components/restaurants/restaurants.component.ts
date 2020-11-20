import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;



  restaurants = [];
  
  

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private restaurantService: RestaurantService) {

    }

  ngOnInit() {

    this.loggedInUser = this.tokenService.GetPayLoad();
	
	console.log(this.loggedInUser);
    //this.GetAllRestaurant();
	
	this.GetAllUserRestaurant(this.loggedInUser._id);
  }


  GetAllRestaurant(){
    this.restaurantService.GetAllRestaurants().subscribe(data => {
      console.log(data);
      this.restaurants = data.restaurants;

      console.log(this.restaurants);
    });
  }
  
  GetAllUserRestaurant(id){
	  
	  this.restaurantService.GetAllUserRestaurant(id).subscribe(data => {
      console.log(data);
      this.restaurants = data.restaurantByUser;

      console.log(this.restaurants);
    });
	  
  }

  ViewResturantInfo(restaurant){
    this.router.navigate(['restaurant',restaurant._id]);
  }

}
