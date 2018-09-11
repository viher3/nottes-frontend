import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { ListComponent, SpinnerComponent } from 'app/shared';
import { TranslateService } from "@ngx-translate/core";
import { CommonEventsService } from 'app/services/shared/common-events.service';
import { AuthService } from 'app/user/auth.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

/**
 * @class         FileUploadComponent
 * @description   Component for uploading new files to the server.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'app-file-upload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.scss']
})
export class FileUploadComponent implements OnInit {

  /**
   * Loading state
   * @var Boolean
   */
  public loading: boolean = false;

  /**
   * Upload state
   * @var Boolean
   */
  public uploading: boolean = false;

  /**
   * Selected files from input
   * @var Array <File>
   */
  public selectedFiles: Array <File>;

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

  constructor(
  	private toastr : ToastrService,
    private translator : TranslateService,
    private authHttp : AuthHttp,
    private http : HttpClient,
    private auth : AuthService,
    private router : Router
  ) 
  {
    this.apiUrl = AppConfig.settings.api.api_upload_url;
    this.authToken = 'Bearer ' + localStorage.getItem(AppConfig.settings.users.session.tokenKey);
  }

  ngOnInit()
  {
    this.loading = false;
  }

  /**
   * Upload selected file/s to the server.
   *
   * @return  [type]  void
   */
  uploadFiles() : void
  {
    this.uploading = true;

    // Build formData object
    const formData : FormData = new FormData();

    for(let file of this.selectedFiles)
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

        // redirect to dashboard
        this.router.navigateByUrl('dashboard');
      },
      error => {
        this.auth.checkJwtHasExpiredInServerRequest(error);
        this.uploading = false;
      }
    );
  }

  /**
   * Trigger the click event on the file input.
   *
   * @return  [type]  void
   */
  openFileSelectionDialog() : void
  {
    $("input#fileInput").click();
  }

  /**
   * Add selected files into 'selectedFiles' var
   *
   * @param   <File>  event   Selected file from the dialog
   * @return  [type]  void
   */
  onFileSelected(event) : void
  {
    this.selectedFiles = event.target.files;
  }

  /**
   * Remove file from the selected files array
   *
   * @param   <File>  file  Selected file to remove
   * @return  [type]  void
   */
  removeFile(file) : void
  {
    var newSelectedFiles = [];

    for(var i in this.selectedFiles)
    {
      if(this.selectedFiles[i] == file || isNaN(Number(i)) ) continue;

      newSelectedFiles.push(this.selectedFiles[i]);
    }

    this.selectedFiles = newSelectedFiles;
  }
}