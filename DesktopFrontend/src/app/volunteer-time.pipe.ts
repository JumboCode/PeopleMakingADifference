import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'volunteerTime'})
export class VolunteerTimePipe implements PipeTransform {
  transform(value: any): string {
    if(typeof value == "number") return new Date(value).toLocaleDateString('en-US', {
      day: 'numeric',
      year: '2-digit',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return '';
  }
}