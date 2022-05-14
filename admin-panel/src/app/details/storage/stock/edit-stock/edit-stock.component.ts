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
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css'],
})
export class EditStockComponent implements OnInit {
  GroupArray: any = [];
  ComArray: any = [];
  stockID: string = '';
  form: FormGroup = new FormGroup({
    volume: new FormControl(null, [Validators.required]),
    day_left: new FormControl(null, [Validators.required]),
    blood_group: new FormControl(null, [Validators.required]),
    blood_compo: new FormControl(null, [Validators.required])
  });
  constructor(private ser: DetailsService) {
    this.ser.currval.subscribe((val) => (this.stockID = val));
    this.ser.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
    this.ser.getComp().subscribe((data: any) => this.ComArray=[...data]);
  }

  ngOnInit(): void {
    this.getStockByid(this.stockID);
  }
  UpdateStockForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('volume', value['volume']);
    formData.append('day_left', value['day_left']);
    formData.append('blood_group', value['blood_group']);
    formData.append('blood_compo', value['blood_compo']);
    if (this.form.valid) {
      this.ser.UpdateStock(formData);
    }
  }
  getStockByid(id: string) {
    this.ser.editStock(id).subscribe((val) => {
      this.form.patchValue({
        volume: val.volume,
        day_left: val.day_left,
        blood_group: val.blood_group,
        blood_compo:val.blood_compo
      });
    });
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

  get blood_comp(): FormControl {
    return this.form.get('blood_compo') as FormControl;
  }
}
