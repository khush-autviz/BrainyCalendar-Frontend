import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@node_modules/@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { BrokerProperty, BrokerPropertyServiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent extends AppComponentBase {
  property: any;
  constructor(
    injector: Injector,
    private _propertyService: BrokerPropertyServiceServiceProxy,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }
  
  ngOnInit(): void {
    const propertyId = +this.route.snapshot.paramMap.get('id')!;
    this._propertyService.getPropertyById(propertyId).subscribe((data) => {
      this.property = data;
    });
  }
  getCallDetails(property){
    this.notify.success("Fetching transcript and recording, please wait.");
    this._propertyService.getPropertyById(property.id).subscribe(res=>{
      this.notify.success("Updated Successfully");
    })
  }
}
