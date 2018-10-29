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
  selector: 'file-upload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.scss']
})
export class FileUploadComponent implements OnInit {

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

  constructor(
    private fileService : FileService
  ) 
  {
    
  }

  ngOnInit()
  {
    this.fileService.isUploading.subscribe(uploading => {
      this.uploading = uploading;
    });
  }

  /**
   * Upload selected file/s to the server.
   *
   * @return  [type]  void
   */
  uploadFiles() : void
  {
    this.fileService.uploadFiles(this.selectedFiles);
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