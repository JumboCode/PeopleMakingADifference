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
}