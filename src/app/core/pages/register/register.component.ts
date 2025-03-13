import { JsonPipe } from '@angular/common';
import { Component , inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

    apiError! : string;
    [x: string]: any;
    isCallingApi : boolean = false;
    subscription: Subscription = new Subscription();
    registerForm : FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

}, this.validateRePassword)

  _authService = inject(AuthService);
  _router = inject(Router);

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }else {
      this.apiError = '';
      
        if (this.subscription) this.subscription.unsubscribe()
        this.isCallingApi = true;
        this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
          next:(res) => {
            console.log(res);
            this.isCallingApi = false;
            this._router.navigate(['/auth/login']);
          },
          error:(err) => {
            this.apiError = err.error.message;
            this.isCallingApi = false;
          },
          complete:() => {
            console.log('done');
      }})
      
    }
  }

  validateRePassword(form:AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


