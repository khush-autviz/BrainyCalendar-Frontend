import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})


export class FacebookService {
  
  constructor(private http: HttpClient ) {
    FB.init({
      appId: environment.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v15.0',
    });
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'pages_manage_metadata,leads_retrieval,pages_show_list,pages_read_engagement' }
      );
    });
  }

  getPages(accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.api(
        '/me/accounts',
        'GET',
        { access_token: accessToken },
        (response: any) => {
          if (response && !response.error) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        }
      );
    });
  }


}
