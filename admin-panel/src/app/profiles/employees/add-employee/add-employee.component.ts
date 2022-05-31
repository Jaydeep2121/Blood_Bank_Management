import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  regForm: FormGroup;
  constructor(private ser: EmployeeService, public router: Router) {}
  text: any;
  image: any;
  GroupArray: any = [];

  ngOnInit(): void {
    this.formData();
    this.ser.getGroup().subscribe((data: any) => (this.GroupArray = [...data]));
  }
  formData() {
    this.regForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        userEmail: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
          ),
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
      },
      { validators: CustomValidators.passwordsMatching }
    );
  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  addEmpForm() {
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
    this.ser.addEmp(formData);
    this.regForm.reset();
  }
}
