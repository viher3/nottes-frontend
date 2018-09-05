import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent, SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { CommonEventsService } from 'app/services/shared/common-events.service';
import { AuthService } from 'app/user/auth.service';

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

  constructor(
  	protected toastr: ToastrService,
    protected authHttp: AuthHttp,
    protected translator: TranslateService,
    private common: CommonEventsService,
    protected auth : AuthService
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
   * Trigger the search event when the Enter key is pressed inside the search form.
   *
   * @param   Event   any   Key event
   * @return  [type]  void
   */
  search() : void
  {
    super.searchEntities(1, false);
  }

}