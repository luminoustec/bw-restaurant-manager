import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  constructor(private http: HttpClient) { }
  
  addStreet(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/street/add-new-street` , body);
  }
  
  GetAllStreets(): Observable<any>{
    return this.http.get(`${BASEURL}/all-streets`);
  }
  
  getStreet(id): Observable<any>{
    return this.http.get(`${BASEURL}/street/${id}`);
  }
  
  DeleteStreet(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-street/${id}`, {
      id,
    });
  }
  
  editStreet(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/street/edit-street` , body);
  }
}
