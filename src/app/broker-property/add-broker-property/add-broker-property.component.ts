import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BrokerPropertyServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-broker-property',
  templateUrl: './add-broker-property.component.html',
  styleUrls: ['./add-broker-property.component.css']
})
export class AddBrokerPropertyComponent extends AppComponentBase {
 
  @Output() onSave = new EventEmitter<any>();
  propertyType = "";
  urlType: string = ''; // 'list' or 'single'
  urls: string[] = ['']; // Array to store URLs for single property option

  selectedFiles: File[] = [];
  saving = false;
  maxFileSize = 5048576; 
  fileSizeErrorMessages: string[] = [];
  isLoading = false;
  constructor(public injector: Injector, public bsModalRef: BsModalRef, private brokerProperty: BrokerPropertyServiceServiceProxy) {super(injector);}

  // Add a new URL input field
  addUrl(): void {
    this.urls.push('');
  }

  // Remove a specific URL input field
  removeUrl(index: number): void {
    if (this.urls.length > 1) {
      this.urls.splice(index, 1);
    }
  }

  // Save the data
  save(): void {
    
    this.isLoading = true
    if (this.urlType === 'list' && this.urls[0]) {
      this.brokerProperty.createPropertyWithListUrl(this.urls[0]).subscribe(res => {
        this.returnResponse();
      }, error=>{
        this.isLoading = false
      });
    } else if (this.urlType === 'single' && this.urls.every((url) => url.trim())) {
      this.brokerProperty.createPropertyWithUrl(this.urls).subscribe(res => {
        this.returnResponse();
      }, error=>{
        this.isLoading = false
      });
    }
    
    if(this.propertyType == 'pdf'){

      if (!this.selectedFiles.length) {
        this.notify.warn('Please select at least one valid file to upload!');
        return;
      }
    
      this.saving = true;
    
      // Map selected files to FileParameter format
      const fileParameters = this.selectedFiles.map((file) =>  ({
        fileName: file.name,
        data: file
      }));
    

      this.brokerProperty.uploadMultiPropertiesFromPDF(fileParameters).subscribe(res=>{
        this.returnResponse();
      }, error=>{
        this.isLoading = false
      })
    }


  }

  private returnResponse() {
    this.isLoading = false
    this.onSave.emit();
    this.bsModalRef.hide();
  }

  // Close the modal
  close(): void {
    this.bsModalRef.hide();
  }
  onFilesSelected(event: any): void {
    const newFiles: FileList = event.target.files;
    const validFiles: File[] = [];
    this.fileSizeErrorMessages = []; // Reset error messages

    Array.from(newFiles).forEach((file) => {
      if (file.size <= this.maxFileSize) {
        // Avoid duplicates by checking names
        if (!this.selectedFiles.some((existingFile) => existingFile.name === file.name)) {
          validFiles.push(file);
        }
      } else {
        this.fileSizeErrorMessages.push(`${file.name} exceeds the 5 MB limit.`);
      }
    });

    // Add valid files to the selected list
    this.selectedFiles.push(...validFiles);
  }

  
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}
