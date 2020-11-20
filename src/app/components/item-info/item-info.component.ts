import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  itemId: any;
  item : any;


  constructor(private fb: FormBuilder,
  private categoryService : CategoryService,
  private route: ActivatedRoute,
  private router: Router,
  private itemService: ItemService) { }


  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');

    console.log(this.itemId);

    this.GetItem();
  }

  GetItem(){
    console.log(this.itemId);
    this.itemService.getItem(this.itemId).subscribe(data =>{
        console.log(data);
        this.item = data.item;
    });
  }

  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }

  EditItem(item){
      this.router.navigate(['item-edit',item._id]);
  }

  DeleteItem(item){

    this.itemService.DeleteItem(this.itemId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/item/all']);

     });


  }

}
