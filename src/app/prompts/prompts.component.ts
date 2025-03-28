import { ChangeDetectorRef, Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { NotifyService } from '@node_modules/abp-ng2-module';
import { CallEnum, CreateUpdateIndustryPromptDto, IndustryPromptDto, IndustryPromptServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { NgForm } from '@angular/forms';
import { CallEnumState } from '@shared/AppEnums';
import { create } from 'domain';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.css']
})
export class PromptsComponent {
  allPrompts = [];
  @ViewChild("promptForm") promptForm!: NgForm; // Reference to the child component
  @Input() height: number = 90;
  @Output() heightChange = new EventEmitter<number>();
  @Input() isParentExistPromt = false;

  selectedPrompt = new IndustryPromptDto();
  selectedPromptId = 0;
  @Output() formStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading = false
  tab = CallEnumState.Outbound
  CallEnumState = CallEnumState

  ngOnInit() {
    this.onTabChange();
  }

  constructor(private industryPromptService: IndustryPromptServiceProxy, private appSession: AppSessionService,
    private notify: NotifyService) { }

  onTabChange() {
    this.getSamplePrompt();
    this.getDefaultPrompt();
  }

  onFormStatusChange() {
    this.formStatusChange.emit(this.isFormValid());
  }

  onSelectPromptChange() {
    let selectedPrompt = this.allPrompts.find(x => x.id == this.selectedPromptId)
    if (!selectedPrompt) {
      this.selectedPrompt = new IndustryPromptDto();
    }
    else {
      this.selectedPrompt = selectedPrompt;
    }
    this.onFormStatusChange();
  }

  saveAndDefault() {
    abp.message.confirm(
      "Prompt will be set as default and will be used by ai agent while calling to customer",
      undefined,
      (result: boolean) => {
        if (result) {
          this.save(result);
        }
      }
    );
  }
  save(isDefault = false) {
    this.isLoading = true;
    if (this.selectedPrompt.title && this.selectedPrompt.prompt) {
      var createPrompt = new CreateUpdateIndustryPromptDto();
      createPrompt.industry = this.appSession.tenant.industry;
      createPrompt.prompt = this.selectedPrompt.prompt;
      createPrompt.title = this.selectedPrompt.title;
      createPrompt.callType = this.tab;
      createPrompt.firstMessage = this.selectedPrompt.firstMessage;
      this.industryPromptService.createOrUpdate(this.selectedPrompt.id, isDefault, createPrompt).subscribe(res => {
        this.onTabChange();
        this.notify.success("SuccessFully Updated");
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
    }
    else {
      this.notify.error("Kindly fill all required field");
    }
  }
  
  getDefaultPrompt() {
    this.isLoading = true;
    this.industryPromptService.getDefaultPrompt(this.tab).subscribe(res => {
      if (res && res.id) {
        this.selectedPrompt = res;
        this.selectedPromptId = res.id;
      }
      setTimeout(() => {
        this.onFormStatusChange();
      }, 10);
      this.isLoading = false;
    }, err => {
      this.selectedPrompt = new IndustryPromptDto();
      this.isLoading = false;
    })
  }

  getSamplePrompt() {
    this.isLoading = true;
    this.industryPromptService.getAll(this.tab).subscribe(res => {
      this.allPrompts = res;      
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }

  isFormValid(): boolean {
    return this.promptForm?.valid || false;
  }

  adjustHeight(event: any) {
    this.height = event.target.scrollHeight;
    this.heightChange.emit(this.height);
  }
}
