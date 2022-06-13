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
  userID:string;
  name:string;
  email:string;
  imagPath:string;
  GroupArray: any = [];
  CampArray: any = [];
  constructor(
    private serv: ProfileService,
    private aser:HomeService,
    private lser:LoginService
  ) {}

  ngOnInit(): void {
    this.aser.isAuthenticate();
    this.userID=localStorage.getItem('eid');
    this.getUserByid(this.userID);
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getUserByid(this.userID);
      }
    });
    this.serv.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
    this.formData();
  }
  getUserByid(id: string) {
    this.serv.editUser(id).subscribe((val) => {
      this.name=val.name;this.email=val.email;
      this.userID=val._id;
      this.imagPath = val.imageUrl[0].path;
      this.regForm.patchValue({
        userName: val.name,
        userEmail: val.email,
        gender: val.gender,
        userCont: val.mobile,
        blood_group: val.blood_group,
      });
      this.serv.getAppoint(val._id).subscribe((val: any) =>{
        this.CampArray=[...val];
        console.log(val);
      }) 
    });
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
    if (this.regForm.valid) {
      this.serv.UpdateUser(formData,this.userID);
    }
  }
}

