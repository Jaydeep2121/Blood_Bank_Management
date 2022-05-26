import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CampService } from '../services/camp.service';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {

  constructor(private serv:CampService) { }
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required])
    }
  );
  ngOnInit(): void {
  }
  
  addUserForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('name', value['name']);
    if (this.form.valid) {
      this.serv.addCamp(formData);
    }
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
}
