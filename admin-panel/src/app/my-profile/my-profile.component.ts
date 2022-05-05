import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home-component/home.service';
import { CustomValidators } from '../public/_helpers/custom-validators';
import { MyprofileService } from './myprofile.service';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(
    private homeSer:HomeService,
    private proSer:MyprofileService
    ) { 
    this.homeSer.isAuthenticate();
  }
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required])
    },
    { validators: CustomValidators.passwordsMatching }
  );
  ngOnInit(): void {
    this.proSer.getadmin().subscribe(val=>this.patchData(val));
  }
  patchData(val:any){
    this.form.patchValue({
      name: val[0].name,
      email: val[0].email,
      mobile: val[0].mobile,
      password: val[0].password
    });
  }
  UpdAdminForm(){
    delete this.form.value.passwordConfirm;
    this.proSer.updateAdminData(this.form.value)
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
