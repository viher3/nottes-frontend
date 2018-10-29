import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { FileService } from 'app/services/file/file.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

/**
 * @class         FileUploadComponent
 * @description   Component for uploading new files to the server.
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'file-preview',
  templateUrl: './filePreview.component.html',
  styleUrls: ['./filePreview.component.scss']
})
export class FilePreviewComponent {

  constructor(
    private fileService : FileService
  ) 
  {
    
  }
}