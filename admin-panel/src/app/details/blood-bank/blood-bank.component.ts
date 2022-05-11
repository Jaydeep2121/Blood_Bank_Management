import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/home-component/home.service';
import { BviewProfileComponent } from './bview-profile/bview-profile.component';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css'],
})
export class BloodBankComponent implements OnInit {
  text: string = '';
  image: string = '';
  constructor(
    private homeSer: HomeService,
    private detSer: DetailsService,
    public dialog: MatDialog
  ) {
    this.homeSer.isAuthenticate();
  }

  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      timing: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, Validators.required),
      address: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
    },
    { validators: CustomValidators.passwordsMatching }
  );
  ngOnInit(): void {
    this.form.disable();
    this.detSer.getbank().subscribe((val) => this.patchData(val));
  }
  patchData(val: any) {
    this.detSer.change(val);
    this.form.patchValue({
      name: val[0].name,
      timing: val[0].timing,
      mobile: val[0].contact,
      address: val[0].address,
    });
  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name;
    this.image = imgFile.target.files[0];
  }
  UpdbnkForm() {
    const value = this.form.value;
    let formData = new FormData();
    formData.append('name', value['name']);
    formData.append('timing', value['timing']);
    formData.append('mobile', value['mobile']);
    formData.append('address', value['address']);
    formData.append('imageUrl', this.image);
    if (this.form.valid) {
      this.detSer.updateBankData(formData);
    }
  }
  editClick() {
    this.form.disabled ? this.form.enable() : this.form.disable();
  }
  openDialog() {
    this.dialog.open(BviewProfileComponent);
  }
  get timing(): FormControl {
    return this.form.get('timing') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get mobile(): FormControl {
    return this.form.get('mobile') as FormControl;
  }

  get address(): FormControl {
    return this.form.get('address') as FormControl;
  }
  get imageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }
}
