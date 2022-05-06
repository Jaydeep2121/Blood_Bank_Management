import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/home-component/home.service';
import { MyprofileService } from 'src/app/my-profile/myprofile.service';
import { ViewProfileComponent } from 'src/app/my-profile/view-profile/view-profile.component';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {
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
    },
    { validators: CustomValidators.passwordsMatching }
  );
  ngOnInit(): void {
    this.form.disable();
    this.proSer.getadmin().subscribe((val) => this.patchData(val));
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
    delete this.form.value.passwordConfirm;
    this.proSer.updateAdminData(this.form.value);
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

}
