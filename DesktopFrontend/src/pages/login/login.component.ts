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

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  demoNavigate(){
    this.router.navigate(['/dashboard']);
  }

  demoLogin(){
    this.afAuth.auth.signInWithEmailAndPassword("invalid@gmail.com", "this is not real, it won't work")
    .then((user)=>{
      console.log(user);
    });
  }

}
