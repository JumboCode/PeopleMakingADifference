import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

// Represents a user of the app, and contains all the info needed to fetch from
// the server for this user
export class User {
  name: string;
  constructor(public id: number) {}
  setName(name: string){ this.name = name; }
}

@Injectable()
export class UserService {
  user: User;
  
  constructor(public storage: Storage){}

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
}
