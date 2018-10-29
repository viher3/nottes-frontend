import { Component, Input, Output, OnInit } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { FileService } from 'app/services/file/file.service';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import 'rxjs/Rx';

/**
 * @class         FilePreviewComponent
 * @description   Component for file preview
 * @author        Alberto Vian - alberto@albertolabs.com
 */

@Component({
  selector: 'file-preview',
  templateUrl: './filePreview.component.html',
  styleUrls: ['./filePreview.component.scss']
})
export class FilePreviewComponent {

  @Input() id : number;
  @Input() creatorUser : string;
  @Input() filename : string;
  @Input() mimetype : string;
  @Input() filepath : string;

  constructor(
    private fileService : FileService
  ) 
  {
    
  }

  ngOnInit()
  {
    console.log(this.id);
  }
}