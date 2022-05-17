import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.css']
})
export class EditDonorComponent implements OnInit {

  text: any;
  image: any;
  GroupArray: any = [];
  userID: string = '';
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
      blood_group: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
    },
    { validators: CustomValidators.passwordsMatching }
  );
  constructor(private ser: DonorService) {
    this.ser.currval.subscribe((val) => (this.userID = val));
    this.ser.getGroup().subscribe((data: any) => this.GroupArray=[...data]);
  }

  ngOnInit(): void {
    this.getUserByid(this.userID);
  }

  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  UpdateDonorForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('name', value['name']);
    formData.append('email', value['email']);
    formData.append('gender', value['gender']);
    formData.append('mobile', value['mobile']);
    formData.append('password', value['password']);
    formData.append('imageUrl', this.image);
    formData.append('blood_group', value['blood_group']);
    if (this.form.valid) {
      this.ser.UpdateDonor(formData,this.userID);
    }
  }
  getUserByid(id: string) {
    this.ser.editDonor(id).subscribe((val) => {
      this.form.patchValue({
        name: val.name,
        email: val.email,
        gender: val.gender,
        mobile: val.mobile,
        password: val.password,
        blood_group: val.blood_group,
      });
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
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
  get blood_group(): FormControl {
    return this.form.get('blood_group') as FormControl;
  }
  get imageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }

}
