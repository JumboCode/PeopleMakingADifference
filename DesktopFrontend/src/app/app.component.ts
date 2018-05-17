import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errorMessage = '';
  bowls: any = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.loadItems();
  }

  // Gets the items into this.items by reading through the file
  loadItems() {
    this.http.get('/')
    .map(res => res.json())
    .subscribe(json => {
      this.bowls = json;
    }, this.showError('reach database'));
  }

  postAssignment(volunteer: any, input_assignment: string) {
    this.errorMessage = '';
    this.http.post('/update_assignment',
      {
        uid : volunteer.id,
        assignment : input_assignment
      }
    )
    .subscribe(res => {
      volunteer.assignment = input_assignment;
    }, this.showError(`update assignment for ${volunteer.name}`));
  }

  postLocation(volunteer: any, input_location: string) {
    this.errorMessage = '';
    this.http.post('/update_location',
      {
        uid : volunteer.id,
        location : input_location
      }
    )
    .subscribe(res => {
      volunteer.location = input_location;
    }, this.showError(`update location for ${volunteer.name}`));
  }

  postMessage(bowl: any, input_message: string) {
    this.errorMessage = '';
    this.http.post('/update_message',
      {
        eventId: bowl.id,
        message : input_message
      }
    )
    .subscribe((res) => {
      bowl.message = input_message;
    }, this.showError(`update message for ${bowl.name}`));

  }

  enableEditing(volunteer: any) {
    volunteer.edit = !volunteer.edit;
  }

  showError = (action: string) => (message: any) => {
    console.error(message);
    this.errorMessage = `Server error: Could not ${action}.`;
  }

}
