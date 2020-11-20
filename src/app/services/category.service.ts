import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://multitier-restaurant.herokuapp.com/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/category/add-new-category` , body);
  }

  GetAllCategories(): Observable<any>{
    return this.http.get(`${BASEURL}/all-categories`);
  }
  
  GetAllUserCategory(id): Observable<any>{
    return this.http.get(`${BASEURL}/all-user-categories/${id}`);
  }


  getCategory(id): Observable<any>{
    return this.http.get(`${BASEURL}/category/${id}`);
  }

  editCategory(body): Observable<any>{
    console.log(body);
    return this.http.post(`${BASEURL}/category/edit-category` , body);
  }



  DeleteCategory(id): Observable<any>{
    return this.http.post(`${BASEURL}/delete-category/${id}`, {
      id,
    });
  }
}
