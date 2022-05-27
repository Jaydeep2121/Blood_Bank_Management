import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CampService } from '../services/camp.service';

@Component({
  selector: 'app-edit-camp',
  templateUrl: './edit-camp.component.html',
  styleUrls: ['./edit-camp.component.css'],
})
export class EditCampComponent implements OnInit {
  userID: string = '';
  minDate = new Date();
  constructor(private serv: CampService) {
    this.serv.currval.subscribe((val) => (this.userID = val));
  }
  form: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    camp_name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    conducted_by: new FormControl(null, [Validators.required]),
    organized_by: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.getUserByid(this.userID);
  }
  getUserByid(id: string) {
    this.serv.editUser(id).subscribe((val) => {
      this.form.patchValue({
        date: val.date,
        time: val.time,
        camp_name: val.camp_name,
        address: val.address,
        conducted_by: val.conducted_by,
        organized_by: val.organized_by,
      });
    });
  }
  UpdateUserForm() {
    if (this.form.valid) {
      this.serv.updCamp(this.form.value, this.userID);
    }
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
