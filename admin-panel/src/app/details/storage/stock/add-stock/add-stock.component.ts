import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/details/details.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  GroupArray: any = [];
  stockID: string = '';
  form: FormGroup = new FormGroup({
    volume: new FormControl(null, [Validators.required]),
    day_left: new FormControl(null, [Validators.required]),
    blood_group: new FormControl(null, [Validators.required]),
  });
  constructor(private ser: DetailsService) {
    this.ser.getGroup().subscribe((data: any) => this.GroupArray.push(...data));
  }
  addStockForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('volume', value['volume']);
    formData.append('day_left', value['day_left']);
    formData.append('blood_group', value['blood_group']);
    if (this.form.valid) {
      this.ser.AddStock(formData);
    }
  }
  ngOnInit(): void {
  }

  get day_left(): FormControl {
    return this.form.get('day_left') as FormControl;
  }

  get volume(): FormControl {
    return this.form.get('volume') as FormControl;
  }

  get blood_group(): FormControl {
    return this.form.get('blood_group') as FormControl;
  }
}
