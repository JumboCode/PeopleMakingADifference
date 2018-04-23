import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'volunteerDuration'})
export class VolunteerDurationPipe implements PipeTransform {
  transform(value: number): string {
    if(!(value > 0)) return '';
    const seconds = value / 1000;
    let hoursDuration = Math.floor(seconds / (60 * 60));
    let minutesDuration = Math.floor((seconds - (hoursDuration * (60 * 60))) / 60);
    minutesDuration = 15 * (Math.round(minutesDuration / 15));
    if(minutesDuration === 60){
      hoursDuration++;
      minutesDuration = 0;
    }
    return `${String(hoursDuration).padStart(2, '0')}:${String(minutesDuration).padStart(2, '0')}`
  }
}