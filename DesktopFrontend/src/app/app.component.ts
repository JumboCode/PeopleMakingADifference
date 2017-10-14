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
}

