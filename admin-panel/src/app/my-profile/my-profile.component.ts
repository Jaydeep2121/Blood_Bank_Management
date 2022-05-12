import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home-component/home.service';
import { CustomValidators } from '../public/_helpers/custom-validators';
import { MyprofileService } from './myprofile.service';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  text: string = '';
  image: string = '';
  constructor(
    private homeSer: HomeService,
    private proSer: MyprofileService,
    public dialog: MatDialog
  ) {
    this.homeSer.isAuthenticate();
  }

  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
    },
    { validators: CustomValidators.passwordsMatching }
  );
  ngOnInit(): void {
    this.form.disable();
    this.proSer.getadmin().subscribe((val) => this.patchData(val));
  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  patchData(val: any) {
    this.proSer.change(val);
    this.form.patchValue({
      name: val[0].name,
      email: val[0].email,
      mobile: val[0].mobile,
      password: val[0].password,
    });
  }
  UpdAdminForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('name', value['name']);
    formData.append('mobile', value['mobile']);
    formData.append('email', value['email']);
    formData.append('password', value['password']);
    formData.append('imageUrl', this.image);
    if (this.form.valid) {
      this.proSer.updateAdminData(formData);
    }
  }
  editClick() {
    this.form.disabled ? this.form.enable() : this.form.disable();
  }
  openDialog() {
    this.dialog.open(ViewProfileComponent);
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get mobile(): FormControl {
    return this.form.get('mobile') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  get imageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }
}
