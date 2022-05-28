import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {
  campNames: any = [];
  userNames: any = [];
  stockID: string = '';
  form: FormGroup = new FormGroup({
    campfield: new FormControl(null, [Validators.required]),
    userfield: new FormControl(null, [Validators.required])
  });
  
  constructor(private ser: DonorService) {
    this.ser.GetCamp().subscribe((data: any) => this.campNames=[...data]);
    this.ser.GetUser().subscribe((data: any) => this.userNames=[...data]);
  }
  addAppForm() {
    if (this.form.valid) {
      this.ser.AddApp(this.form.value)
    }
  }
  ngOnInit(): void {
  }

  get campfield(): FormControl {
    return this.form.get('campfield') as FormControl;
  }

  get userfield(): FormControl {
    return this.form.get('userfield') as FormControl;
  }

}
