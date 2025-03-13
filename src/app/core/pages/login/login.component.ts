import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { log } from 'node:console';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
      apiError! : string;
      isCallingApi : boolean = false;
      subscription: Subscription = new Subscription();
      toggleInput: boolean = false;
      loginForm!: FormGroup;
      _authService = inject(AuthService);
      _router = inject(Router);
      
      ngOnInit(): void {
        this.initForm();
      }
      
      initForm() {
      this.loginForm = new FormGroup({
        email: new FormControl(null,[Validators.required,Validators.email]),
        password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)])
    });

    }
  
    login() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
      }else {
        this.apiError = '';
        
          if (this.subscription) this.subscription.unsubscribe()
          this.isCallingApi = true;
          this.subscription = this._authService.loginUser(this.loginForm.value).subscribe({
            next:(res) => {
              console.log(res);
              this.isCallingApi = false;
              localStorage.setItem('token',res.token);
              this._authService.saveUser();
              this._router.navigate(['/home']);
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
    
    togglePassword() {
      this.toggleInput = !this.toggleInput;
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
