import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error: boolean = false;
  errorMessage: string;

  constructor(private router: Router, public afAuth: AngularFireAuth, private _cookieService:CookieService) { }

  ngOnInit() {
  }

  demoNavigate(){
    this.router.navigate(['/dashboard']);
  }

  doLogin(username: any, password: any){
    this.afAuth.auth.signInWithEmailAndPassword(username.value, password.value)
    .then((user)=>{
      user.getIdToken().then((token)=>{
          this._cookieService.put("userFirebaseToken", token)
      });
      this.router.navigate(['/dashboard']);
    }).catch((err)=>{
      this.error = true;
      this.errorMessage = "Incorrect username or password.";
    });
  }

}
