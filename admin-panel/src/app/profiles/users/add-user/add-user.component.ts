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
  maxDate  = new Date();
  constructor(private ser: UserServiceService, public router: Router) {}
  regForm: FormGroup;
  text: any;
  image: any;
  GroupArray: any = [];
  ngOnInit(): void {
    this.formData();
    this.ser.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
  }

  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  formData() {
    this.regForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      gender: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
      userCont: new FormControl('', [
        Validators.required,
        Validators.pattern('^([6789]{1})([0-9]{1})([0-9]{8})$'),  
      ]),
      passwordConfirm: new FormControl('', [Validators.required]),
      blood_group: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    },{ validators: CustomValidators.passwordsMatching });
  }
  addUserForm() {
    if (!this.regForm.valid) {
      return;
    }
    const value = this.regForm.value;
    let formData = new FormData();
    formData.append('name', value['userName']);
    formData.append('email', value['userEmail']);
    formData.append('gender', value['gender']);
    formData.append('mobile', value['userCont']);
    formData.append('password', value['userPass']);
    formData.append('imageUrl', this.image);
    formData.append('blood_group', value['blood_group']);
    this.regForm.reset();
    this.ser.addUser(formData);
  }
}
