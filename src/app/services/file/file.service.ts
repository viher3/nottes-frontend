import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from 'app/user/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'app/app.config';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs/Observable';
import { NavActionService } from 'app/services/shared/nav-action.service';
import { NottesService } from 'app/services/nottes/nottes.service';

/**
 * @class         FileService
 * @description   File service
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Injectable()
export class FileService
{
  /**
   * Upload state
   * @var Boolean
   */
  public uploading: boolean = false;

  /**
   * Authentication API Token
   * @var String
   */
  private authToken : string;

  /**
   * Upload files API endpoint
   * @var String
   */
  private apiUrl : string;

  /**
   * Is uploading event
   * @var EventEmitter
   */
  public isUploading : EventEmitter<boolean>;

  constructor(
    private http : HttpClient,
    private translator: TranslateService,
    private toastr : ToastrService,
    private auth : AuthService,
    private nottesService: NottesService,
    private navActionService: NavActionService
  ) 
  {
    this.isUploading = new EventEmitter();
    this.apiUrl = AppConfig.settings.api.api_upload_url;
    this.authToken = 'Bearer ' + localStorage.getItem(AppConfig.settings.users.session.tokenKey);
  }

  /**
   * Upload selected file/s to the server.
   *
   * @param   Array   selectedFiles     An array with the selected files for upload
   *
   * @return  [type]  void
   */
  uploadFiles(selectedFiles : any) : void
  {
    this.uploading = true;
    this.isUploading.emit(true);

    // Build formData object
    const formData : FormData = new FormData();

    for(let file of selectedFiles)
    {
      formData.append('files[]', file, file.name);
    };

    // Build options object
    const options = { 
      headers : new HttpHeaders({
        'Authorization' : this.authToken
      })
    };

    // Post request to API
    this.http.post(this.apiUrl, formData, options).subscribe(

      data => {

        this.uploading = false;
        this.isUploading.emit(false);

        // show success alert
        for(var i in data)
        {
          let filename = data[i].fileInfo.original_name;

          this.translator
            .get('components.uploads.create.success_mss', { file : filename })
            .subscribe( (translation: string) => {
              this.toastr.success(translation, null, { enableHtml: true });
          });
        }

        // reload all entities
        this.nottesService.reloadEntities();

        // redirect to dashboard
        this.navActionService.setAction('init');
      },
      error => {
        this.auth.checkJwtHasExpiredInServerRequest(error);
        this.uploading = false;
        this.isUploading.emit(false);
      }
    );
  }

}
