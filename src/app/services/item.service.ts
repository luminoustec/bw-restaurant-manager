import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/item/add-new-item` , body);
  }

   GetAllItems(): Observable<any>{
    return this.http.get(`${BASEURL}/all-items`);
  }
  
  GetItemByUser(id): Observable<any>{
    return this.http.get(`${BASEURL}/all-items-by-user/${id}`);
  }

  getItem(id): Observable<any>{
    return this.http.get(`${BASEURL}/item/${id}`);
  }

  editItem(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/item/edit-item` , body);
  }



  DeleteItem(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-item/${id}`, {
      id,
    });
  }
}
