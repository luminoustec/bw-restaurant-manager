import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;
  statusList: any;



  orders = [];

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private restaurantService: RestaurantService,
  private orderService: OrderService) { }

  ngOnInit() {
	  
	    this.loggedInUser = this.tokenService.GetPayLoad();
		this.GetAllOrders(this.loggedInUser._id);	
  }
  
   GetAllOrders(id){
    this.orderService.GetAllDeliveredOrders(id).subscribe(data => {
      console.log(data);
      //this.orders = data.ordersByUser.reverse();
	  
	  this.orders = data.ordersByOwner.reverse();

      console.log(this.orders);
    });
  }

  ViewOrderInfo(order){
    this.router.navigate(['details',order._id]);
  }

}
