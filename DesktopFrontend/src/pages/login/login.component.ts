import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  error: boolean = false;
  errorMessage: string;

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  demoNavigate(){
    this.router.navigate(['/dashboard']);
  }

  doLogin(username: any, password: any){
    this.afAuth.auth.signInWithEmailAndPassword(username.value, password.value)
    .then((user)=>{
      this.router.navigate(['/dashboard']);
    })
    .catch((err)=>{
      console.log('got here')
      this.error = true;
      this.errorMessage = "Incorrect username or password.";
    });
  }

}
