import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { StreetService } from '../../services/street.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-street-info',
  templateUrl: './street-info.component.html',
  styleUrls: ['./street-info.component.css']
})
export class StreetInfoComponent implements OnInit {

  streetId: any;
	street : any;

    constructor(private fb: FormBuilder,
  private streetService : StreetService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
	  
	  this.streetId = this.route.snapshot.paramMap.get('id');

    console.log(this.streetId);

    this.GetPost();
  }
  
  GetPost(){
    console.log(this.streetId);
    this.streetService.getStreet(this.streetId).subscribe(data =>{
        console.log(data);
        this.street = data.street;
    });
  }
   TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }
  
  DeleteStreet(street){

    this.streetService.DeleteStreet(this.streetId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/restaurants/all']);

     });


  }
  
  
  
  EditStreet(street){
      this.router.navigate(['street-edit',street._id]);
  }

}
