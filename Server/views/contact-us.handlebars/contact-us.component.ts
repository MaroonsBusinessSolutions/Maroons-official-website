import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  
  
  constructor() { }

  ngOnInit(): void {
  }
  // onFormSubmit() {
  //   // console.log('Name:' + this.contactForm.get('name').value);
  //   console.log(this.userForm.value);
  // };
}
