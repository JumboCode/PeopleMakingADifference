import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-event',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})

export class CreateEventComponent implements OnInit {
  
  csvFile: any;
  nameFieldText: string;
  feedback: string;
  showFeedback: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmitClick() {
    this.showFeedback = true;
    if(!this.nameFieldText){
      this.feedback = "Please add an event name.";
      return;
    }
    if(!this.csvFile){
      this.feedback = "Please attach a CSV file.";
      return;
    }

    let input = new FormData();
    input.append('csvFile', this.csvFile);
    input.append('eventName', this.nameFieldText);

    fetch(`/update_event`, {
      method: 'POST',
      body: input
    }).then(response => {
      response.text().then(text => {
        this.feedback = text;
      });
    })
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

  onReturnDashboardClick() {
    this.router.navigate(['/dashboard']);
  }

}
