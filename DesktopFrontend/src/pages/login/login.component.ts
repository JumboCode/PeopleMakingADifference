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

  doLogin(username: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
    .then((user)=>{
      this.router.navigate(['/dashboard']);
    })
    .catch((err)=>{
      this.error = true;
      this.errorMessage = "Incorrect username or password.";
    });
  }

}
