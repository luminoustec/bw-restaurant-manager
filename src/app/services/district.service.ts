import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }
  
  addDistrict(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/district/add-new-district` , body);
  }
  
  GetAllDistricts(): Observable<any>{
    return this.http.get(`${BASEURL}/all-districts`);
  }
  
  getDistrict(id): Observable<any>{
    return this.http.get(`${BASEURL}/district/${id}`);
  }
  
  DeleteDistrict(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-district/${id}`, {
      id,
    });
  }
  
  editDistrict(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/district/edit-district` , body);
  }
}
