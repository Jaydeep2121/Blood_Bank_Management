import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  maxDate  = new Date();
  regForm: FormGroup;
  text: any;
  image: any;
  GroupArray: any = [];
  userID: string = '';
  constructor(private ser: UserServiceService) {
    this.ser.currval.subscribe((val) => (this.userID = val));
    this.ser.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
  }

  ngOnInit(): void {
    this.getUserByid(this.userID);
    this.formData();
  }
  formData() {
    this.regForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      dob: new FormControl('', [Validators.required]),
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
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  UpdateUserForm() {
    const value = this.regForm.value;
    let formData = new FormData();
    formData.append('name', value['userName']);
    formData.append('email', value['userEmail']);
    formData.append('dob', value['dob']);
    formData.append('gender', value['gender']);
    formData.append('mobile', value['userCont']);
    formData.append('password', value['userPass']);
    formData.append('imageUrl', this.image);
    formData.append('blood_group', value['blood_group']);
    if (this.regForm.valid) {
      this.ser.UpdateUser(formData,this.userID);
    }
  }
  getUserByid(id: string) {
    this.ser.editUser(id).subscribe((val) => {
      this.regForm.patchValue({
        userName: val.name,
        userEmail: val.email,
        dob:val.dob,
        gender: val.gender,
        userCont: val.mobile,
        userPass: val.password,
        blood_group: val.blood_group,
      });
    });
  }
}
