import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent, SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { CommonEventsService } from 'app/services/shared/common-events.service';
import { AuthService } from 'app/user/auth.service';
import 'rxjs/Rx' ;

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

  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    private common: CommonEventsService,
    protected auth : AuthService,
    protected http : HttpClient
  ) 
  {
    super(translator, authHttp, toastr, auth);
  }

  ngOnInit()
  {
    $("body").removeClass("login-body");

    this.loading = true;
  	this.loadEntities();
  }

  /**
   * Trigger the search event when the Enter key is pressed inside the search form.
   *
   * @param   Event   any   Key event
   * @return  [type]  void
   */
  searchOnKey(event: any) : void
  {
    if(event.key == "Enter") this.search();
  }

  /**
   * Get all entities matching with the entered search query.
   *
   * @param   Event   any   Key event
   * @return  [type]  void
   */
  search() : void
  {
    super.searchEntities(1, false);
  }

  /**
   * Download selected file.
   *
   * @param   Number  id          Document Id
   * @param   String  filename    Document filename
   * @param   String  mimetype    Document file MimeType
  * @return   [type]  void
   */
  downloadFile(id : number, filename : string, mimetype: string) : void
  {
    let options = new RequestOptions({responseType: ResponseContentType.Blob});

    this.authHttp.get(this.apiUrl + "/document/" + id, options).subscribe(

      data => {

        if( ! data._body ) return;

        var blob = new Blob([data._body], { type: mimetype });
        
        if (window.navigator && window.navigator.msSaveOrOpenBlob) 
        {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } 
        else 
        {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      },

      error => {
        console.log(error); // TODO: handle forbidden error
        this.auth.checkJwtHasExpiredInServerRequest(error);
      }

    ); 
  }

}