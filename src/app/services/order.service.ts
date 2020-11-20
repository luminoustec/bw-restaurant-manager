import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  addOrder(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/order/add-new-order` , body);
  }

  GetOrdersByUser(id): Observable<any>{
    //return this.http.get(`${BASEURL}/orders-user/${id}`);
	
	return this.http.get(`${BASEURL}/orders-restaurant-owner/${id}`);
  }

  GetAllOrders(): Observable<any>{
    return this.http.get(`${BASEURL}/orders-all`);
  }
  
  GetAllDeliveredOrders(id): Observable<any>{
    return this.http.get(`${BASEURL}/delivered-orders-restaurant-owner/${id}`);
  }
  
  GetAllCanceledOrders(id): Observable<any>{
    return this.http.get(`${BASEURL}/canceled-orders-restaurant-owner/${id}`);
  }
  

  getOrder(id): Observable<any>{
    return this.http.get(`${BASEURL}/get-order/${id}`);
  }

  updateStatus(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/order/update-status` , body);
  }

}
