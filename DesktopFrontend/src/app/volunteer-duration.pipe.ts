import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'volunteerDuration'})
export class VolunteerDurationPipe implements PipeTransform {
  transform(value: number): string {
    if(!(value > 0)) return '';
    const seconds = value / 1000;
    const hoursDuration = Math.floor(seconds / (60 * 60));
    const minutesDuration = Math.floor((seconds - (hoursDuration * (60 * 60))) / 60);
    return `${String(hoursDuration).padStart(2, '0')}:${String(minutesDuration).padStart(2, '0')}`
  }
}