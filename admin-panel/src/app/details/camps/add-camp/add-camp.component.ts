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
  styleUrls: ['./add-camp.component.css'],
})
export class AddCampComponent implements OnInit {
  minDate = new Date();
  constructor(private serv: CampService) {}
  form: FormGroup = new FormGroup({
    dob: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    camp_name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    conducted_by: new FormControl(null, [Validators.required]),
    organized_by: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {}
  addUserForm() {
    if (this.form.valid) {
      this.serv.addCamp(this.form.value);
    }
  }
  deleteUser(userid: string) {
    this.serv.deleteCamp(userid);
  }
}
