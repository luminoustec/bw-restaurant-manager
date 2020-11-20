import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantId: any;
  restaurant : any;


  constructor(private fb: FormBuilder,
  private restaurantService : RestaurantService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');

    console.log(this.restaurantId);

    this.GetPost();

  }

  GetPost(){
    console.log(this.restaurantId);
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(data =>{
        console.log(data);
        this.restaurant = data.restaurant;
    });
  }

  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }

  EditRestaurant(restaurant){
      this.router.navigate(['restaurant-edit',restaurant._id]);
  }

  DeleteRestaurant(restaurant){

    this.restaurantService.DeleteRestaurant(this.restaurantId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/address/city/all']);

     });


  }



}
