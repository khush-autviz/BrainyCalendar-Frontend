import { Component } from '@angular/core';
import { LeadAnalysisData, LeadServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { CallProviderEnumState} from '@shared/AppEnums';
@Component({
  selector: 'app-lead-analysis',
  templateUrl: './lead-analysis.component.html',
  styleUrls: ['./lead-analysis.component.css']
})
export class LeadAnalysisComponent {
  analysisData = new LeadAnalysisData();
  isRetellCallProvided: boolean;
  sumOfLeads = 0;
  constructor(private leadService: LeadServiceServiceProxy,private commonService: CommonService, private appSession: AppSessionService) 
  {
    this.isRetellCallProvided = this.appSession.tenant.callProvider == CallProviderEnumState.Retell
  }

  ngOnInit(){
    this.commonService.analysisDataTriggered$.subscribe(res=>{
      this.getAnalysisData();
    })
  }


  private getAnalysisData() {
    this.sumOfLeads = 0;
    this.leadService.getAnalysisData().subscribe(res => {
      this.analysisData = res;
      if(this.isRetellCallProvided)
        this.analysisData.sourceLead.forEach(x=> this.sumOfLeads =  this.sumOfLeads + x.Total);
    });
  }
}
