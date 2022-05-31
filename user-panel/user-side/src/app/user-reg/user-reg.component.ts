import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisService } from './regis.service';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css'],
})
export class UserRegComponent implements OnInit {
  regForm: FormGroup;
  text: any;
  image: any;
  GroupArray: any = [];
  constructor(
    private serv: RegisService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.formData();
    this.serv.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
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
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  onSubmit() {
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
    this.serv.RegiUser(formData);
    this.regForm.reset();
    this.router.navigate(['/login']);
  }
}
