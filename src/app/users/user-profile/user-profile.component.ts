import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { AccountServiceProxy, UserDetailsDto } from '@shared/service-proxies/service-proxies';
import { debug } from 'console';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  extends AppComponentBase implements OnInit{
id:number;
isLoading = false;
showModal: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;
tendenyName = this.appSession.tenant.name;
user:UserDetailsDto=new UserDetailsDto();
isEditing: boolean = false; 
updatedFullName: string = '';
 updatedWebsite: string = ''; 

  constructor(injector: Injector,
                private _userService: AccountServiceProxy,
                private router: Router,
                private common:CommonService,
                private route: ActivatedRoute) {
      super(injector); 
    }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']; 
    });
    this.getuserDetails();
  }
  getuserDetails()
  {
    this.isLoading=true
      this._userService.getUserDetailById(this.id).subscribe(res=>{
        if(res){
          this.user=res;
          this.isLoading=false
        }
        else{
          this.isLoading=false
          this.notify.error("user not found");
        }
      })
  } openImageUploadModal(): void {
    this.showModal = true;
  }
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updatedFullName = this.user.name;
      this.updatedWebsite = this.user.webSiteUrl;
    }
  }
  saveProfileChanges() {
    if (!this.updatedFullName || this.updatedFullName.trim() === '') {
      this.notify.error('Full Name is required.');
      return;
    }
  
    this.user.name = this.updatedFullName.trim();
    this.user.webSiteUrl = this.updatedWebsite;
    this.user.id = this.id;
    this.isLoading = true;
  
    this._userService.updateUserProfile(this.user).subscribe(
      (res) => {
        if (res) {
          this.notify.success('Profile updated successfully!');
          this.toggleEdit();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.notify.error('Failed to update profile');
        }
      },
      (error) => {
        this.isLoading = false;
        this.notify.error('Error updating profile');
      }
    );
  }
  

  closeImageUploadModal(): void {
    this.showModal = false;
    this.selectedImage = null; 
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfilePic(): void {
    this.isLoading = true;
  
    if (!this.selectedImage) {
      this.isLoading = false;
      this.notify.error('Please select an image to upload');
      return;
    }
  
    // Validate file format
    const allowedFormats = ['jpeg', 'jpg', 'png', 'gif'];
    const fileExtension = (this.selectedImage as string).split(';')[0].split('/')[1];
  
    if (!allowedFormats.includes(fileExtension.toLowerCase())) {
      this.isLoading = false;
      this.notify.error('Invalid file format. Please upload a JPEG, JPG, PNG, or GIF image.');
      return;
    }
  
    const base64Image = this.selectedImage as string;
    this.user.id = this.id;
    this.user.profilePicture = base64Image;
  
    this._userService.updateUserProfile(this.user).subscribe(
      (res) => {
        if (res) {
          this.notify.success('Profile picture updated successfully!');
          this.user.profilePicture = base64Image;
          this.common.updateProfilePicture(base64Image);
          this.closeImageUploadModal();
        } else {
          this.notify.error('Failed to update profile picture');
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.notify.error('Error uploading profile picture');
      }
    );
  }
  
backToList()
{
  this.router.navigate(["app/leads"]);
}
formatCategory(category: string): string {
  if (!category) return '';
  return category.replace(/([a-z])([A-Z])/g, '$1 $2'); // Insert space before capital letters
}

}
