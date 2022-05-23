import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { CustomValidators } from '../public/_helpers/custom-validators';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  regForm: FormGroup;
  text: any;
  image: any;
  GroupArray: any = [];
  constructor(private serv: ProfileService,private aser:HomeService,private lser:LoginService) {}

  ngOnInit(): void {
    this.aser.isAuthenticate();
    this.lser.currval.subscribe(data=>{
      console.log(data);
    })
    this.serv.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
    this.formData();
  }
  getUserByid(id: string) {
    console.log(id)
    //this.serv.editUser(id).subscribe((val) => {
      //console.log(val);
      // this.regForm.patchValue({
      //   name: val.name,
      //   email: val.email,
      //   gender: val.gender,
      //   mobile: val.mobile,
      //   password: val.password,
      //   blood_group: val.blood_group,
      // });
    // });
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
        Validators.pattern('^([6789]{1})([234789]{1})([0-9]{8})$'),  
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
    console.log(formData)
    // this.serv.RegiUser(formData);
    // this.regForm.reset();
  }
}

