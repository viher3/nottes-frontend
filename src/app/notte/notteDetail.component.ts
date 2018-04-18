import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudComponent, EncryptionPasswordComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'notte-detail',
  templateUrl: './notteDetail.component.html',
  styleUrls: ['./notteDetail.component.scss']
})
export class NotteDetailComponent extends CrudComponent implements OnInit {

  constructor(
    protected translator: TranslateService,
  	protected toastr: ToastrService,
  	protected authHttp: AuthHttp,
    private route: ActivatedRoute,
    protected router: Router
  ) 
  {
    super(translator, authHttp, toastr, "notte", "name", "/dashboard", router);
  }
  
  public  loading: boolean = false;
  private apiUrl: string = AppConfig.settings.api.api_url;
  public  notte: JSON;
  private id: number;
  private contentIsVisible: boolean = false;
  private submitedForm: boolean = false;
  private encryptionPassword: string;

  ngOnInit()
  {
    this.route.params.subscribe(params => 
    {
      this.id = +params["id"];
    });

    this.loading = true;
  	this.loadEntity();
  }

  loadEntity(encryptionPassword: string = "")
  {
    let entityEndpoint = this.apiUrl + "/notte/" + this.id;

    if(encryptionPassword.length) 
    {
      entityEndpoint += "?pwd=" + encodeURI( btoa(encryptionPassword) );
    }

    this.authHttp.get(entityEndpoint).subscribe(

      data => {

        this.notte = data.json(); 

        if( ! data.json().is_encrypted || data.json().is_decrypted ) 
        {
          this.contentIsVisible = true;
        }

        this.loading = false;
      },
      err => {

        let errorBody = JSON.parse(err._body);

        if(err.status == 404 || err.status == 401)
        {
          this.router.navigateByUrl('404');
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

  receiveEncryptionPassword($event) 
  {
    this.submitedForm = true;

    // get password
    this.encryptionPassword = $event;

    // reload entity
    this.loadEntity(this.encryptionPassword);
  }
}
