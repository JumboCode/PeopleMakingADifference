import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, App} from 'ionic-angular/index';
import {CheckOutReminded} from '../pages/check_out_reminded/check_out_reminded';
import {User} from './user.service';
import {FCM} from '@ionic-native/fcm';
import {Platform} from 'ionic-angular';
// allows the app to receive push notifications
@Injectable()
export class PushService {
  private navCtrl: NavController;
  constructor(
    public storage: Storage, 
    public fcm: FCM,
    public platform: Platform,
    private app: App
  ){
    this.platform.ready().then(()=>{
      this.navCtrl = app.getActiveNavs()[0];
      if(this.platform.is('android')){
        fcm.onNotification().subscribe(data => {
          if(data['intent'] && data['intent'] === 'checkout_reminder'){
            this.navCtrl.push(CheckOutReminded);
          }
        });
      }
    });
  }

  register(user: User, endpoint: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.platform.ready().then(()=>{
        this.fcm.getToken().then(token => {
          this.send_token(endpoint, token, user.id)
          .then(response => resolve(response))
          .catch(err => reject(err));
        });
        this.fcm.onTokenRefresh().subscribe(token => {
          this.send_token(endpoint, token, user.id)
          .then(response => console.log('refreshed token.'))
          .catch(err => console.error('error refreshing token', err));
        });
      })
      
      
    });
  }

  send_token(endpoint: string, token: string, uid: number): Promise<any>{
    return new Promise((resolve, reject) => {
      fetch(
        `${endpoint}update_token`, 
        {
          method: 'POST',
          body: JSON.stringify(
            {
              uid: uid,
              token: token
            }
          ),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
      )
      .then(blob => blob.text())
      .then(text => resolve(text))
      .catch(err => reject(err));
    });
  }
}