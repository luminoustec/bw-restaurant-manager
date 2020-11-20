import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  orderId: any;
  order : any;

  constructor(private fb: FormBuilder,
    private restaurantService : RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

    ngOnInit() {
      this.orderId = this.route.snapshot.paramMap.get('id');

      console.log(this.orderId);

      this.GetOrder();

    }

    GetOrder(){
      console.log(this.orderId);
      this.orderService.getOrder(this.orderId).subscribe(data =>{
          console.log(data);
          this.order = data.order;
      });
    }

    TimeFromNow(time){
      //return moment(time).fromNow();

      return moment(time).format("MMM Do YYYY")
    }

    OrderStatus(order){
        this.router.navigate(['order-status',order._id]);
    }


}
