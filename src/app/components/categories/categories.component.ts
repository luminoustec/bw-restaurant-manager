import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;



  categories = [];

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private categoryService: CategoryService) { }

  ngOnInit() {

    this.loggedInUser = this.tokenService.GetPayLoad();
    //this.GetAllCategories();
	
	this.GetAllUserCategory(this.loggedInUser._id);
  }

  GetAllCategories(){





    this.categoryService.GetAllCategories().subscribe(data => {

      this.categories = data.categories;

      console.log(this.categories);
    });
  }
  
  GetAllUserCategory(id){





    this.categoryService.GetAllUserCategory(id).subscribe(data => {

      this.categories = data.categoryByUser;

      console.log(this.categories);
    });
  }


  ViewCategoryInfo(category){
    this.router.navigate(['category-info', category._id]);
  }

}
