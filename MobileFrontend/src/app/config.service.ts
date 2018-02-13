import {Injectable} from '@angular/core';
import * as config from '../../ionic.config.json';

// allows different parts of the app to fetch configurable data
@Injectable()
export class ConfigService {
  getEndpointUrl(): string {
    if (config['DEV_MODE'] === true) {
      return config['DEV_SERVER'];
    }
    return config['PROD_SERVER'];
  }

  xwwwurlencode(dataObject: any): string {
    // x-www-encoded expects key=value&key=value&key=value
    return Object.keys(dataObject)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(dataObject[key])}`)
      .join('&');
  }
}