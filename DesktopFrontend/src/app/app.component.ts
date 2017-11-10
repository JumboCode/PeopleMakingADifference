import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  volunteers: any = [];

  value = '';
  edit : boolean[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
  	this.loadItems();
  }

  // Gets the items into this.items by reading through the file
  loadItems() {
  	this.http.get("http://localhost:5000/")
 	.map(res => res.json())
	.subscribe(json => {
		this.volunteers = json;

    // set up editing button
    for (var i = 0; i < this.volunteers.length; ++i) {
      this.edit.push(false);
    }
		console.log(json);
	});
  }

  postAssignment(user_id, input_assignment) {
    this.http.post("http://localhost:5000/update_assignment", { uid : user_id, assignment : input_assignment })
	  .subscribe()
  }

  postLocation(user_id, input_location) {
    this.http.post("http://localhost:5000/update_location", { uid : user_id, location : input_location })
	  .subscribe()
  }

  postMessage(input_message){
    this.http.post("http://localhost:5000/update_message", { message : input_message })
  .subscribe()
  }

  update(value: string) {
	  this.value = value
  }

  enableEditing(i: number) {
    this.edit[i] = true;
  }

}
