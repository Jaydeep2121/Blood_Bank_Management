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
    date: new FormControl(null, [Validators.required]),
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
  get date(): FormControl {
    return this.form.get('date') as FormControl;
  }
  get time(): FormControl {
    return this.form.get('time') as FormControl;
  }
  get camp_name(): FormControl {
    return this.form.get('camp_name') as FormControl;
  }
  get address(): FormControl {
    return this.form.get('address') as FormControl;
  }
  get conducted_by(): FormControl {
    return this.form.get('conducted_by') as FormControl;
  }
  get organized_by(): FormControl {
    return this.form.get('organized_by') as FormControl;
  }
}
