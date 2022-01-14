import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  registerUrl = "http://localhost:3000/api/auth/register";
  loginUrl = "http://localhost:3000/api/auth/login";
  googleUrl = "http://localhost:3000/api/auth/google";
  facebookUrl = "http://localhost:3000/api/auth/facebook"
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Register User
  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user)
  }

  //Login by email and password
  loginUser(user: any){
    return this.http.post<any>(this.loginUrl, user)
  }

  // LoggedIn 
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  //token-interceptor service
  getToken(){
    return localStorage.getItem('token')
  }

  // LogOut
  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  //Login with google
  signinWithGoogle(token: any){
    return this.http.post<any>(this.googleUrl, token)
  }

  //Login with Facebook
  loginWithFacebook(token: any){
    return this.http.post<any>(this.facebookUrl, token)
  }
}
