import {Injectable} from '@angular/core';

// Represents a user of the app, and contains all the info needed to fetch from
// the server for this user
export class User {
  constructor(public id: number) {}
}

@Injectable()
export class UserService {
  user: User;

  // set the current user to:
  setUser(newUser: User) {
    this.user = newUser;
  }

  getUser() {
    return this.user;
  }
}