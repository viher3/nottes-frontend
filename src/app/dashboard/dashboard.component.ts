import { Component, OnInit, Input, Output } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent, SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { CommonEventsService } from 'app/services/shared/common-events.service';
import { NottesService } from 'app/services/nottes/nottes.service';
import { AuthService } from 'app/user/auth.service';
import { NavActionService } from 'app/services/shared/nav-action.service';
import { SearchService } from 'app/services/search/search.service';

/**
 * @class         DashboardComponent
 * @description   Dashboard component.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ListComponent implements OnInit {

  private apiUrl : string = AppConfig.settings.api.api_url;
  private contentIsVisible: boolean = false;
  private submitedForm: boolean = false;
  private encryptionPassword: string;
  public  notte: any;
  public  id : number;
  public  action : string = "init";
  public  loadingMore : boolean = false;

  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    private common: CommonEventsService,
    protected auth : AuthService,
    protected http : HttpClient,
    private nottesService: NottesService,
    private navActionService: NavActionService,
    private searchService : SearchService
  ) 
  {
    super(translator, authHttp, toastr, auth);
  }

  ngOnInit()
  {
    $("body").removeClass("login-body");

    // set last action value
    this.action = this.navActionService.getAction();

    // subscribe to 'navActionEmitter' event
    this.navActionService.navActionEmitter$.subscribe(newAction => {
      this.action = newAction;
    });

    // subscribe to 'reloadEntitiesEmitter' event
    this.nottesService.reloadEntitiesEmitter$.subscribe(notteId => {
      
      this.reloadEntites("");

      if(notteId) 
      {
        this.loadEntity(notteId);
      }

    });

    // subscribe to 'getSearchResultsEvent' event
    this.searchService.getSearchResultsEvent.subscribe(listElements => {
      this.listElements = listElements;
    });
    
    // subscribe to 'getPaginationTranslationsEvent' event
    this.searchService.getPaginationTranslationsEvent.subscribe(paginationTransParams => {
      this.paginationTransParams = paginationTransParams;
    });
    
    // subscribe to 'getSearchTranslationsEvent' event
    this.searchService.getSearchTranslationsEvent.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
    });
    
    // subscribe to 'isSearchEvent' event
    this.searchService.isSearchEvent.subscribe(isSearchValue => {
      this.isSearch = isSearchValue;
    });
    
    // subscribe to 'isLoadingMoreSearchEvent' event
    this.searchService.isLoadingMoreSearchEvent.subscribe(isLoadingMoreValue => {
      this.loadingMore = isLoadingMoreValue;
    });

    // subscribe to 'loadEntitiesEvent' event
    this.nottesService.loadEntitiesEvent.subscribe(listElements => {
      this.listElements = listElements;
    });

    // subscribe to 'isLoadingNottesEvent' event
    this.nottesService.isLoadingNottesEvent.subscribe(isLoading => {
      this.loading = isLoading;
    });

    // subscribe to 'isLoadingMoreNottesEvent' event
    this.nottesService.isLoadingMoreNottesEvent.subscribe(isLoadingMore => {
      this.loadingMore = isLoadingMore;
    });

    // subscribe to 'setNottesPaginationTranslationsEvent' event
    this.nottesService.setNottesPaginationTranslationsEvent.subscribe(paginationTransParams => {
      this.paginationTransParams = paginationTransParams;
    });

    // subscribe to 'isUploading' event
    this.nottesService.setNottesPaginationTranslationsEvent.subscribe(paginationTransParams => {
      this.paginationTransParams = paginationTransParams;
    });

    this.nottesService.loadEntities();
  }

  /**
   * Load more entities request
   *
   * @return  [type]  void
   */
  loadMoreRequest() : void
  {
    if(this.loadingMore) return;

    let nextPage = Number(this.listElements.current_page_number) + 1;
    
    if(this.isSearch)
    {
      this.searchService.searchEntities(nextPage, true);
    }
    else
    {
      this.loadEntities(nextPage, true);
    }
  }

  /**
   * Handle the load entity click event
   *
   * @param   Object    item    Item object
   * @return  [type]    void
   */
  loadEntityEvent(item : any) : void
  {
    if(item.type == "link")
    {
      window.open(item.content, '_blank');
    }
    else if(item.type == "doc")
    {
      this.loadEntity(item.id);
    }
    else if(item.type == "file")
    {
      this.notte = item;
      this.navActionService.setAction('filePreview');
    }
  }

  /**
   * Load a notte entity
   *
   * @param   Number  id                        Entity Id
   * @param   String  encryptionPassword        Encryption password for the notte
   */
   // TODO: Move into nottes.service.ts
  loadEntity(id : number, encryptionPassword: string = "")
  {
    // reset default values
    this.action = "showEntity";
    this.contentIsVisible = false;
    this.loading = true;
    this.notte = {};

    // API request
    this.nottesService.loadEntity(id).subscribe(

      data => {

        this.notte = data.json();

        if( ! this.notte.is_encrypted || this.notte.is_decrypted ) 
        {
          this.contentIsVisible = true;
        }

        this.loading = false;
      },
      err => {

        this.auth.checkJwtHasExpiredInServerRequest(err);

        let errorBody = JSON.parse(err._body);

        if(err.status == 404 || err.status == 401)
        {
          // this.router.navigateByUrl('404');
        }
        else if(err.status == 500 && errorBody.error == "wrong_encryption_password")
        {
          // wrong encryption password
          this.translator.get('components.docs.detail.wrong_encryption_password').subscribe( (translation: string) => {
            this.toastr.error(translation);
          });
        }
        
        this.loading = false;
      }

    );
  }

  /**
   * Handle the reload entities event after removing an entity 
   *   
   * @param   Boolean   $event    Return the boolean result of an entity removing action
   * @return  [type]  void
   */
  reloadEntites($event) : void
  {
    this.notte = {};
    this.nottesService.loadEntities();
  }

  /**
   * Set contentIsVisible value when change event is fired from child component 
   *
   * @param   Boolean   $event    true|false
   * @return  [type]    void
   */
  setContentIsVisibleChange($event) : void
  {
    this.contentIsVisible = $event;
  }

  /**
   * Set loading value when event is fired from child component 
   *
   * @param   Boolean   $event    true|false
   * @return  [type]    void
   */
  setLoadingEvent($event) : void
  {
    console.log("ENTRA LOADING");
    this.loading = $event;
  }

  /**
   * Remove an entity
   *
   * @param   Object      item    Entity object
   * @return  [type]      void
   */ 
  removeEntity(item) : void
  {
    this.nottesService.removeEntity(item);
  }

   /**
   * Edit an entity
   *
   * @param   Object      item    Entity object
   * @return  [type]      void
   */
  editEntity(item) : void
  {
    if(item.type == "doc")
    {
      this.notte = item;
      this.navActionService.setAction('editNotte');
    }
    else if(item.type == "link")
    {
      this.notte = item;
      this.navActionService.setAction('editLink');
    }
  }

  loadEntities(page: number = 1, append: boolean = false) : void
  {
    this.nottesService.loadEntities(page, append);
  }
}