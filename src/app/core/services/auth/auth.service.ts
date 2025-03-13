import { HttpClient } from '@angular/common/http';
import { Injectable , afterNextRender, inject } from '@angular/core';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _httpClient = inject(HttpClient);
  _router = inject(Router);
  env = environment.baseURL;
  userData:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { 
    afterNextRender(() => {
      this.isLoggedInUser();
    });
  }

  registerUser (userInfo:AuthUser) : Observable<any> {
    return this._httpClient.post(`${this.env}/auth/signup`, userInfo);
  }
  loginUser (userInfo:LoginUser) : Observable<any> {
    return this._httpClient.post(`${this.env}/auth/signin`, userInfo);
  }
  saveUser(){
    if (localStorage.getItem('token')) {
      this.userData.next(jwtDecode(localStorage.getItem('token')!));
      console.log(this.userData);
      
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._router.navigate(['/auth/login']);
  }

  isLoggedInUser():boolean {
    if (localStorage.getItem('token')) {
      this.userData.next(jwtDecode(localStorage.getItem('token')!));
      return true;
    } else {
      return false;
    }
  }

  getToken(){
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
      
    }
    return ''
  }
}
