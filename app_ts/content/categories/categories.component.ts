import{Component,OnInit} from '@angular/core';
import {CategoryServiceComponent} from '../../service/category.service';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {Growl} from 'primeng/primeng';
import { Message } from '../order/interfaces/message';

@Component({
    selector:'categories',
    templateUrl:'app_ts/content/categories/categories.html',
    styleUrls:['src/css/left-navbar.css'],
    directives:[ROUTER_DIRECTIVES],

})

export class Categories implements OnInit{
   private categories: Categories[];
   private errorMessage: string;
   private msgs:Message[];


    constructor(private _contactService:CategoryServiceComponent){}
  
      getCategories(){
            this._contactService.getAllCategories()
                .subscribe(
                    categories => this.categories = categories,
                    error => this.errorMessage = <any>error)
    }
    
       ngOnInit() {
           console.log('categories init')
        //  this.getCategories();
       }

       showOrderCount(){
            console.log('showOrderCount()')
           this.msgs=[];
            this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
       }
}
