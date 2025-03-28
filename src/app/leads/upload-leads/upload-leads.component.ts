import { ChangeDetectorRef, Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BackgroundSchedulerServiceServiceProxy, ExcelEnum, ExcelServiceProxy, FileType, GetMappingHeaderForLead } from '@shared/service-proxies/service-proxies';

import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-upload-leads',
  templateUrl: './upload-leads.component.html',
  styleUrls: ['./upload-leads.component.css']
})
export class UploadLeadsComponent extends AppComponentBase {
  file: any = null;
  isLoading;
  customerNameError =false
  phoneNumberError= false
  emailError= false
  headers: string[] = [];
  mappingFields = [
    { label: 'Customer Name', field: 'customerName', selectedHeader: '' },
    { label: 'Customer Phone Number', field: 'customerPhoneNumber', selectedHeader: '' },
    { label: 'Customer Email', field: 'customerEmail', selectedHeader: '' },
  ];
  @Output() onSave = new EventEmitter<any>();
  constructor(public injector: Injector, public bsModalRef: BsModalRef, private excelService: ExcelServiceProxy,
    private backgroundService: BackgroundSchedulerServiceServiceProxy, private cdr:ChangeDetectorRef) { super(injector) }

  close(): void {
    this.bsModalRef.hide();
  }

  async onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    this.file = {
      fileName: selectedFile.name,
      data: selectedFile
    };

    this.cdr.detectChanges(); // Manually trigger change detection

    const inputExcelType = this.file.fileName.split(".");
    const ExcelTypeList = ["csv", "xlsx"];

    if (ExcelTypeList.includes(inputExcelType[inputExcelType.length - 1].toLowerCase())) {
      this.isLoading = true;
      try {
        let mappingResult = await this.excelService
          .getLeadMappingHeaders(this.file, FileType._0, ExcelEnum._0, "")
          .toPromise();

        this.headers.push(
          mappingResult.customerEmail, 
          mappingResult.customerName, 
          mappingResult.customerPhoneNumber
        );

        this.mappingFields.forEach((field) => {
          field.selectedHeader = mappingResult[field.field] || '';
        });
      } catch (error) {
        this.notify.error("Error processing file");
      }
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.notify.error(this.l('Uploaded file format not supported'));
    }
  }

  isMappingValid(): boolean {
    return this.mappingFields.every((field) => field.selectedHeader);
  }

 
  

  save(): void {
    if (this.file) {
      this.isLoading = true;
      let mapping = new GetMappingHeaderForLead();
      this.mappingFields.forEach((field) => {
        mapping[field.field] = field.selectedHeader;
      });
      this.backgroundService.importExcel(this.file, FileType._0, ExcelEnum._1, JSON.stringify(mapping)).subscribe(res => {
        this.isLoading = false;
        abp.message.info("Leads are being updated. Please wait and check your email for the lead upload status.", '', {
          position: 'top-right', // 'top-center' will center the notification on top
          closeButton: true, // Optionally, enable a close button
          hideAfter: 5000 // Optional: Set how long the notification should stay (in milliseconds)
        });
        this.onSave.emit();
        this.bsModalRef.hide();
      }, err => {
        this.isLoading = false;
      })

    }
  }
}
