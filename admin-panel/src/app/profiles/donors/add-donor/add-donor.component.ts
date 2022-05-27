import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DetailsService } from 'src/app/details/details.service';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent implements OnInit {

  campNames: any = [];
  ComArray: any = [];
  stockID: string = '';
  form: FormGroup = new FormGroup({
    campfield: new FormControl(null, [Validators.required]),
    blood_compo: new FormControl(null, [Validators.required])
  });
  constructor(private ser: DonorService) {
    this.ser.GetCamp().subscribe((data: any) => this.campNames=[...data]);
    // this.ser.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
    // this.ser.getComp().subscribe((data: any) => this.ComArray=[...data]);
  }
  addStockForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('campfield', value['campfield']);
    formData.append('blood_compo', value['blood_compo']);
    if (this.form.valid) {
      // this.ser.AddStock(formData);
    }
  }
  ngOnInit(): void {
  }

  get campfield(): FormControl {
    return this.form.get('campfield') as FormControl;
  }

  get blood_comp(): FormControl {
    return this.form.get('blood_compo') as FormControl;
  }

}
