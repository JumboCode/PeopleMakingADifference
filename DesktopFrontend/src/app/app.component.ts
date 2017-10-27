import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  volunteers: any = [
  {
    id: 1,
    name: 'Tony Stark',
    assignment: 'Build Ironman suit to escape cave',
        location: 'Stark Tower'
  },
  {
    id: 2,
    name: 'Darth Vader',
    assignment: 'Use the Force (For evil)',
                location: 'The Death Star'
  },
    {
      id: 3,
      name: 'Claire Underwood',
      assignment: 'Scheme',
        location: "Washington"
    },
    {
      id: 4,
      name: 'Buffy the Vampire Slayer',
      assignment: 'Slay vampires',
        location: "Hellmouth"
    }
 ];

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

  postAssignment(i: number, user_id, input_assignment) {
    this.edit[i] = false;
    this.http.post("http://localhost:5000/update_assignment", { uid : user_id, assignment : input_assignment })
	  .subscribe()
  }

  postLocation(i: number, user_id, input_location) {
    this.edit[i] = false;
    this.http.post("http://localhost:5000/update_assignment", { uid : user_id, location : input_location })
	  .subscribe()
  }

  update(value: string) {
	  this.value = value
  }

  enableEditing(i: number) {
    this.edit[i] = true;
  }

}
