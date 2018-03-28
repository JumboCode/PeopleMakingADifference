import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  errorMessage = '';
  bowls: any = [];

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.loadItems();
  }

  // Gets the items into this.items by reading through the file
  loadItems() {
    this.http.get('http://localhost:5000/')
    .map(res => res.json())
    .subscribe(json => {
      this.bowls = json;
    }, this.showError('reach database'));
  }

  postAssignment(volunteer: any) {
    this.errorMessage = '';
    this.http.post('http://localhost:5000/update_assignment',
      {
        uid : volunteer.id,
        assignment : volunteer.new_assignment
      }
    )
    .subscribe(
      () => {
        volunteer.assignment = volunteer.new_assignment;
        console.log('updated assignment')
      }, 
      this.showError(`update assignment for ${volunteer.name}`));
  }

  postLocation(volunteer: any) {
    this.errorMessage = '';
    this.http.post('http://localhost:5000/update_location',
      {
        uid : volunteer.id,
        location : volunteer.new_location
      }
    )
    .subscribe(
      ()=>{
        volunteer.location = volunteer.new_location;
        console.log('updated location')
      }, 
      this.showError(`update location for ${volunteer.name}`));
  }

  postMessage(bowl: any) {
    if(!bowl.new_message || bowl.new_message === bowl.message){
      console.log("nope");
      return;
    }
    this.errorMessage = '';
    this.http.post('http://localhost:5000/update_message',
      {
        eventId: bowl.id,
        message : bowl.new_message
      }
    )
    .subscribe((res) => {
      bowl.message = bowl.new_message;
      console.log('updated message');
    }, this.showError(`update message for ${bowl.name}`));

  }

  enableEditing(volunteer: any) {
    volunteer.edit = true;
  }

  showError = (action: string) => (message: any) => {
    console.error(message);
    this.errorMessage = `Server error: Could not ${action}.`;
  }

  saveEdits(volunteer: any){
    if(volunteer.new_location !== volunteer.location && volunteer.new_location) {
      this.postLocation(volunteer);
    }

    if(volunteer.new_assignment !== volunteer.assignment && volunteer.new_assignment) {
      this.postAssignment(volunteer);
    }
    
    volunteer.edit = false;
  }

  goToCreateEvent(){
    this.router.navigate(['/create-event']);
  }

}
