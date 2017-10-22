import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  volunteers: any;
  value = '';

  constructor(private http: Http) { }

  ngOnInit() {
  	this.loadItems();	
  }

  // Gets the items into this.items by reading through the file
  loadItems() {
  	this.http.get("http://pmd-server.herokuapp.com/")
 	.map(res => res.json())
	.subscribe(json => {
		this.volunteers = json;
		console.log(json);	
	});	
  }

  postAssignment(user_id, input_assignment) {
  this.http.post("http://pmd-server.herokuapp.com/", { id : user_id, assignment : input_assignment })
	.subscribe()
  }

  postLocation(user_id, input_location) {
  this.http.post("http://pmd-server.herokuapp.com/", { id : user_id, location : input_location })
	.subscribe()
  }

  update(value: string) {
	this.value = value
  }


}
