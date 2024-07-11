import { Component } from '@angular/core';
import {   ElementRef } from '@angular/core';
import { FormControl , FormGroup , Validators} from '@angular/forms'
import  intlTelInput from 'intl-tel-input';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent  {
  selectedOption :any =[];
  registerForm : FormGroup ;
  constructor(private elementRef: ElementRef ,public DataService:DataService) {
    this.registerForm = new FormGroup({
      individualName : new FormControl('', [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]),
      individualEmail : new FormControl('',  [Validators.required , Validators.email]),
      individualPhoneNumber : new FormControl ('',[Validators.required ,Validators.pattern(/^(?:(?:\+|00)966)?\s*0?5\d{8}$|^(?:(?:\+|00)20)?\s*1[0-2]\d{8}$/)]),
      individualSelect : new FormControl('' , Validators.required),
    })
  }
  
  ngAfterViewInit() {
    const inputElement = this.elementRef.nativeElement.querySelector('#phone');
    const iti = intlTelInput(inputElement, {
      initialCountry: 'auto',
      separateDialCode: true,
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });

    // Handle change event to update input value with selected country dial code
    inputElement.addEventListener('countrychange', () => {
      const selectedCountry = iti.getSelectedCountryData();
      const dialCode = selectedCountry.dialCode;
      const number = iti.getNumber();
      const formattedNumber = `+${dialCode} ${number}`;
      inputElement.value = formattedNumber;
    });
  }
  ngOnInit() {
    this.getData();
  }
   getData(){
    return this.DataService.getEduRoutesData().subscribe((info)=>{

      this.selectedOption = info.data ;
      console.log(this.selectedOption)

    })

   }
}
