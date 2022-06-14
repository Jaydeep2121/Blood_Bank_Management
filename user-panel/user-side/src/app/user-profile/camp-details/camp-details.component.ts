import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-camp-details',
  templateUrl: './camp-details.component.html',
  styleUrls: ['./camp-details.component.css'],
})
export class CampDetailsComponent implements OnInit {
  form: FormGroup;
  CampArray: any = [];
  userID: string;
  campID: string;
  Camplist: any[];
  selectname: any;
  constructor(private serv: ProfileService) {}

  ngOnInit(): void {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getcampdata();
      }
    });
    this.getcampdata();
    this.formdata();
  }
  formdata() {
    this.form = new FormGroup({
      camp_name: new FormControl('', [Validators.required]),
    });
  }
  getcampdata() {
    this.serv.getCamp().subscribe((data: any) => (this.Camplist = [...data]));
    this.serv.editUser(localStorage.getItem('eid')).subscribe((val) => {
      this.userID = val._id;
      this.serv
        .getAppoint(val._id)
        .subscribe((val: any) => (this.CampArray = [...val]));
    });
  }
  deleteCamp(id: string) {
    this.serv.deletecamp(id);
  }
  updateCamp(id: string) {
    this.campID = id;
    this.serv.getpatchAppoint(this.userID, this.campID).subscribe((val) => {
      this.selectname = val.refcamp.camp_name;
    });
    document.getElementById('modalidform').click();
  }
  updForm() {
    if (!this.form.valid) {
      return;
    }
    this.serv.UpdateAppoint(
      this.userID,
      this.campID,
      this.form.value
    );
    document.getElementById('close').click();
  }
}
