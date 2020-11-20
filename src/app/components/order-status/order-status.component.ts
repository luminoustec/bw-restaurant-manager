import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import * as M from 'materialize-css';





@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  orderId: any;
  order : any;

  postForm: FormGroup;
  status: any;

  restaurants = [];

  constructor(private fb: FormBuilder,
    private restaurantService : RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

    ngOnInit() {
      this.orderId = this.route.snapshot.paramMap.get('id');

      console.log(this.orderId);

       this.restaurants = [
        {id: 'Queued', text: 'Queued'},
        {id: 'Delivered', text: 'Delivered'},
        {id: 'Canceled', text: 'Canceled'},
    ];

      this.init();

      this.GetOrder();

      const dropDownELement = document.querySelectorAll('select');
          M.FormSelect.init(dropDownELement, {

      });

    }

    GetOrder(){
      console.log(this.orderId);
      this.orderService.getOrder(this.orderId).subscribe(data =>{
          console.log(data);
          this.order = data.order;
      });
    }

    init(){
      this.postForm = this.fb.group({
        statusId: ['', Validators.required],


      })
    }

    TimeFromNow(time){
      //return moment(time).fromNow();

      return moment(time).format("MMM Do YYYY")
    }

    OrderStatus(order){
        this.router.navigate(['order-status',order._id]);
    }

    SubmitPost(){
      let body;

        body = {
          orderId: this.orderId,
          statusId: this.postForm.value.statusId,
       }

       console.log(body);

       this.orderService.updateStatus(body).subscribe(data => {
         console.log(data);

         this.postForm.reset();

         this.router.navigate(['/order/all']);
       });

    }

}
