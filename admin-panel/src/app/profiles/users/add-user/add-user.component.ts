import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(private ser: UserServiceService, public router: Router) {}
  srcResult: any;
  GradeArray: any = [
    'Select',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
  ];
  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required),
      mobilenum: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
      selectopt:new FormControl(null,[Validators.required]),
      profile:new FormControl(null,[Validators.required])
    },
    { validators: CustomValidators.passwordsMatching }
  );
  ngOnInit(): void {}
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  addEmployee() {
    console.log(this.form.value);
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get mobilenum(): FormControl {
    return this.form.get('mobilenum') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
  get selectopt():FormControl{
    return this.form.get('grade') as FormControl;
  }
  get profile():FormControl{
    return this.form.get('profile') as FormControl;
  }
}
