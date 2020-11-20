import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

   constructor(private http: HttpClient) { }
  
  addApartment(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/apartment/add-new-apartment` , body);
  }
  
  GetAllApartments(): Observable<any>{
    return this.http.get(`${BASEURL}/all-apartments`);
  }
  
  getApartment(id): Observable<any>{
    return this.http.get(`${BASEURL}/apartment/${id}`);
  }
  
  DeleteApartment(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-apartment/${id}`, {
      id,
    });
  }
  
  editApartment(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/apartment/edit-apartment` , body);
  }
}
