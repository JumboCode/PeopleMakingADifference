import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform} from 'ionic-angular';

// this weird thing comes from a cordova plugin - don't worry about it
declare var SMS: any;

// Represents a user of the app, and contains all the info needed to fetch from
// the server for this user
export class User {
  name: string;
  code: string;
  constructor(public id: number) {}
  setName(name: string): void { this.name = name; }
  setCode(code: string): void { this.code = code; }
  getCode(): string { return this.code; }
  hasCode(): boolean { return this.code && this.code.length > 0; }
}

@Injectable()
export class UserService {
  user: User;
  debug: boolean;
  
  constructor(public storage: Storage, 
  public platform: Platform){}

  // set the current user to:
  setUser(newUser: User): void {
    this.user = newUser;
  }

  getUser(): User {
    return this.user;
  }
  
  saveUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready()
      .then(() => {
        this.storage.set('saved_user', JSON.stringify(this.getUser()))
        .then(save_result => {
          console.log('saved user', save_result);
          resolve(save_result);
        });
      });
    });
  }
  
  loadUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready()
      .then(() => {
        this.storage.get('saved_user')
        .then(saved_user => {
          // not truthy - this definitely works for localstorage, but the other
          // persistent storage drivers might return something else. 
          // documentation is unclear.
          if(!saved_user){
            resolve(false);
            return;
          }
          
          // storage is <string, string> so rehydrate the string as an anonymous object
          saved_user = JSON.parse(saved_user);
      
          // use the parameters of the anonymous object to create a new typed object
          let ressurected = new User(saved_user.id); 
          ressurected.setName(saved_user.name);
          
          this.user = ressurected; 
          resolve(this.user);
        });
      });
    });
  }
  
  deleteUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready()
      .then(() => {
        this.storage.remove('saved_user')
        .then(deleted_user => {
          console.log('deleted user', deleted_user);
          resolve(deleted_user);
        }); 
      });
    }); 
  }

  watchForVerificationText(): Promise<boolean> {
    return new Promise((resolve, reject)=>{
      if(!this.debug){
        resolve(false);
      }
      this.platform.ready().then(() => {
        if(this.platform.is('android') && SMS){
          SMS.startWatch(()=>{
            document.addEventListener('onSMSArrive', this.handleIncomingSms);
            resolve(true);
          }, err => {
            resolve(false);
          });
        } else {
          resolve(false);
        }
      })
    });
  }

  handleIncomingSms = (e: any): void => {
    let sms = e.data;
    let filtered = sms.body.match(/(Sent from your Twilio trial account - )?Your PMD verification code is: ([0-9]{5})/);
    if(filtered){
      this.user.setCode(filtered[2]);
      document.removeEventListener('onSMSArrive', this.handleIncomingSms);
    }
  }

  setDebug(mode: boolean): void {
    this.debug = mode;
  }

  getDebug(): boolean {
    return this.debug;
  }
}
