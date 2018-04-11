import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent } from 'app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ListComponent implements OnInit {

  constructor(
  	private toastr: ToastrService,
  	private authHttp: AuthHttp
  ) { }

  private apiUrl: string = AppConfig.settings.api.api_url;
  public  nottes: JSON;
  public  selectedItems: number[] = [];
  public  selectedAll: boolean = false;

  ngOnInit()
  {
  	this.loadEntities();
  }

  loadEntities()
  {
	  this.authHttp.get(this.apiUrl + "/notte").subscribe(

      data => {
        this.nottes = data.json(); 
      },
      err => {
        console.log(err);
      }
        
    );
  }

  selectFromList(item)
  {
    if( this.selectedItems.indexOf(item) > -1 ) 
    {
      // remove item
      var index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index, 1);
    }
    else
    {
      // add item
      this.selectedItems.push(item);
    }
  }

  selectAll(event)
  {
    this.selectedItems = [];
    if( ! event.target.checked ) return;

    // add all items
    for(var i in this.nottes) 
    {
      this.selectedItems.push(this.nottes[i]);
    }
  }

  isSelected(item)
  {
    if( this.selectedItems.indexOf(item) > -1 ) return true;
    return false;
  }

}
