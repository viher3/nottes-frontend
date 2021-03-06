import { Component, Input, Output } from '@angular/core';
import { AppConfig } from 'app/app.config';
import { FileService } from 'app/services/file/file.service';
import { NottesService } from 'app/services/nottes/nottes.service';
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
  @Input() documentId : number;
  @Input() creatorUser : string;
  @Input() filename : string;
  @Input() mimetype : string;
  @Input() filepath : string;

  constructor(
    private fileService : FileService,
    private nottesService: NottesService
  ) 
  {
    
  }

  /**
   * Download selected file.
   *
   * @return  [type]  void
   */
  download() : void
  {
    this.fileService.downloadFile(this.documentId, this.filename, this.mimetype);
  }

  /**
   * Remove an entity
   *
   * @param   Object      item    Entity object
   * @return  [type]      void
   */ 
  remove() : void
  {
    var item = { 
      "id" : this.id,
      "name" : this.filename
    };
    
    this.nottesService.removeEntity(item);
  }
}