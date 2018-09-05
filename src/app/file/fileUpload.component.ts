import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp } from 'angular2-jwt';
import { ListComponent, SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { CommonEventsService } from 'app/services/shared/common-events.service';
import { AuthService } from 'app/user/auth.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(
  	protected toastr: ToastrService,
    protected translator: TranslateService
  ) 
  {
    
  }

  public uploading: boolean = false;
  public loading: boolean = false;
  public uploader:FileUploader = new FileUploader({url: 'path_to_api'});

  ngOnInit()
  {
    this.loading = false;
  }
}