import { HttpClient } from '@angular/common/http';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { BloodAvaService } from './blood-ava.service';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-blood-ava',
  templateUrl: './blood-ava.component.html',
  styleUrls: ['./blood-ava.component.css'],
})
export class BloodAvaComponent implements OnInit {
  stocklist!: any;
  GroupArray: any = [];
  ComArray: any = [];
  page: number = 1;
  data: any;
  totalItems: any;
  sort: string = 'asc';
  itemsPerPage = 3;
  constructor(private serv: BloodAvaService, private http: HttpClient,private homSer:HomeService) {}
  form: FormGroup = new FormGroup({
    volume: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    blood_group: new FormControl(null, [Validators.required]),
    blood_compo: new FormControl(null, [Validators.required]),
  });
  addStockForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('volume', value['volume']);
    formData.append('refuser','628b4ad0a7abb1467744e748');
    formData.append('blood_group', value['blood_group']);
    formData.append('blood_compo', value['blood_compo']);
    if (this.form.valid) {
      this.serv.AddRequest(formData);
    }
  }
  ngOnInit(): void {
    this.homSer.isAuthenticate();
    this.serv
      .getGroup()
      .subscribe((data: any) => (this.GroupArray = [...data]));
    this.serv.getComp().subscribe((data: any) => (this.ComArray = [...data]));
    this.http
      .get<any>(`api/getStock?page=${1}&size=${this.itemsPerPage}`)
      .subscribe((res) => {
        this.stocklist = res;
        this.totalItems = res.length;
      });
  }
  gty(page: any) {
    this.http
      .get(`api/getStock?page=${page}&size=${this.itemsPerPage}`)
      .subscribe((data: any) => {
        this.stocklist = data;
        this.totalItems = data.length;
      });
  }
  onApply(sortwith: string) {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.serv.sortdata(this.sort, sortwith).subscribe((res) => {
      this.stocklist = res;
    });
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
