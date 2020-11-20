import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  socket: any;
  users = [];
  loggedInUser: any;



  items = [];

  constructor(private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
  private itemService: ItemService) { }

  ngOnInit() {

    this.loggedInUser = this.tokenService.GetPayLoad();
	
	//console.log(this.loggedInUser);
    this.GetAllItemsByUser(this.loggedInUser._id);
  }

  GetAllItemsByUser(id){


    //this.itemService.GetAllItems().subscribe(data => {
	this.itemService.GetItemByUser(id).subscribe(data => {	
		

      this.items = data.items;

      console.log(this.items);
    });
	
	
  }

  ViewItemInfo(item){
    this.router.navigate(['item-info', item._id]);
  }

}
