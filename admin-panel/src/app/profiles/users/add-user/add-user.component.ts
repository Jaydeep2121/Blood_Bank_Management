import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private formbuild: FormBuilder,
    private ser: UserServiceService,
    private router: Router) { }

  formGroup: FormGroup;
  ngOnInit(): void {
    this.initializeForm();
  }

  // To initialize Form
  initializeForm() {
    this.formGroup = this.formbuild.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  // Add Employee When Submit Button Is Clicked
  addEmployee() {
    if (this.formGroup.valid) {
      let data = this.formGroup.value;
      this.ser.addEmployee(data).subscribe(() => {
        this.router.navigate(['/Crud']);
      });
    }
  }

}
