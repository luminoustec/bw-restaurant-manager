import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }
  
  addCity(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/city/add-new-city` , body);
  }
  
  GetAllCities(): Observable<any>{
    return this.http.get(`${BASEURL}/all-cities`);
  }
  
  getCity(id): Observable<any>{
    return this.http.get(`${BASEURL}/city/${id}`);
  }
  
  DeleteCity(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-city/${id}`, {
      id,
    });
  }
  
  editCity(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/city/edit-city` , body);
  }
}
