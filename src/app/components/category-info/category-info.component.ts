import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {

  categoryId: any;
  category : any;


  constructor(private fb: FormBuilder,
  private categoryService : CategoryService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    console.log(this.categoryId);

    this.GetCategory();
  }

  GetCategory(){
    console.log(this.categoryId);
    this.categoryService.getCategory(this.categoryId).subscribe(data =>{
        console.log(data);
        this.category = data.category;
    });
  }

  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }

  EditCategory(category){
      this.router.navigate(['category-edit',category._id]);
  }

  DeleteRestaurant(category){

    this.categoryService.DeleteCategory(this.categoryId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/category/all']);

     });


  }

}
