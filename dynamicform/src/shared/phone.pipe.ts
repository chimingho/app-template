import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode, AsYouType } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  //google libphonenumber https://github.com/google/libphonenumber
  //3rd party libphonenumber https://www.npmjs.com/package/libphonenumber-js
  transform(phoneValue: string, country: any): any {
    try {
      if (!phoneValue) return '';
      phoneValue = phoneValue.replace(/["() -]/g, "");
      if (phoneValue.length > 10) return phoneValue;

      //const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
      //let rslt = regex.exec(phoneValue);
      //if (rslt) phoneValue = rslt[0];

      const phoneNumber = parsePhoneNumber("+1 " + phoneValue);
      return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }
}
