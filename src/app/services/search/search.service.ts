import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { listElements, paginationTransParams } from 'app/shared/parentComponents/list.interface'
import { AuthService } from 'app/user/auth.service';

@Injectable()
export class SearchService
{
  private searchResultTransParams = { value : "" };
  public  listElements: listElements = {};
  public  paginationTransParams: paginationTransParams;
  public  searchTerm : string = "";
  public  currentPaginationPosition: number = 0;
  public  loading: boolean = false;
  public  loadingMore: boolean = false;
  public  isSearch : boolean = false;

  public getSearchResultsEvent : EventEmitter<any>;

  constructor(
    protected translator: TranslateService,
    protected authHttp: AuthHttp,
    protected toastr: ToastrService,
    protected auth : AuthService
  ) 
  {
    this.getSearchResultsEvent = new EventEmitter();    
  }

  /**
   * Get all entities matching with the entered search query.
   *
   * @param   String  query   Search query
   * @return  [type]  void
   */
  search(query) : void
  {
    this.searchTerm = query;
    this.searchEntities(1);
  }

  setPaginationTranslations() : void
  {
    this.currentPaginationPosition = ( (this.listElements).current_page_number * (this.listElements).num_items_per_page );

    this.paginationTransParams = {
      "current" : this.currentPaginationPosition,
      "total" : this.listElements.total_count
    }
  }

  searchEntities(page: number = 1, append: boolean = false) : void
  {
      if( ! this.searchTerm.length ) return;

      this.isSearch   = true;

      if( ! append )
      {
        this.loading = true;
      }
      else
      {
        this.loadingMore = true;
      }

      let currItems = [];

      if( append && typeof this.listElements !== "undefined" )
      {
        currItems = this.listElements.items;
      }

      // TODO: sanitize searchTerm
      let apiUrl : string = AppConfig.settings.api.api_url;
      let entityEndpoint : string = apiUrl +  "/search/" + this.searchTerm + "?p=" + page;

      this.authHttp.get(entityEndpoint).subscribe(

        data => {

          this.listElements = data.json();

          if(append)
          {
            let newItems = this.listElements.items;

            this.listElements.items = [];

            for(let item of currItems)  this.listElements.items.push(item);
            for(let item of newItems)   this.listElements.items.push(item);
          }
          
          // set translation params
          this.setPaginationTranslations();
          this.setSearchTranslations();

          this.loading = false;
          this.loadingMore = false;

          this.getSearchResultsEvent.emit(this.listElements);

        },
        err => {

          this.auth.checkJwtHasExpiredInServerRequest(err);

          let errorBody = JSON.parse(err._body);

          if(err.status == 500)
          {
            console.log(err);
          }
          
          this.loading = false;
          this.loadingMore = false;
        }

      );
  }

  setSearchTranslations() : void
  {
      this.searchResultTransParams = {
        value : this.searchTerm
      }
  }
}
