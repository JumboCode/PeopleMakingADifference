import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-event',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})

export class CreateEventComponent implements OnInit {
  
  csvFile: any;
  nameFieldText: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmitClick() {
    let input = new FormData();
    input.append('csvFile', this.csvFile);
    input.append('eventName', this.nameFieldText);
    
    fetch(`http://54.202.94.38:5000/update_event`, {
      method: 'POST',
      body: input
    });
  }
  
  onFileChange(event: any) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.csvFile = file;
    }
  }
  
  onTitleChange(newText: string){
    this.nameFieldText = newText;
  }

}
