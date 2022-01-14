import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/authService/auth-service.service';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form!: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb : FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private socialauthService: SocialAuthService
  ) { 
    this.loginForm()
  }

  ngOnInit(): void {
  }

  loginForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required]
    })
  }

  login(){
    let loginUserData = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.loginUser(loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.jwtToken)
        this.router.navigate(['/demo'])
      },
      err => console.log(err)
    )
  }

  // Login by google account
  signinGoogle(){
    this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      let tokenId = {
        "tokenId": data.idToken
      }
      this.authService.signinWithGoogle(tokenId)
      .subscribe(
        res => {
          localStorage.setItem('token', res.jwtToken)
          this.router.navigate(['/demo'])
        },
        err => {
          console.log(err)
        }
      )
    })
  }

  // Login with Facebook
  signinFacebook(){
    this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data)=>{
      let token = {
        "userID": data.id,
        "accessToken": data.authToken
      }
      this.authService.loginWithFacebook(token).subscribe(
        res => {
          localStorage.setItem('token', res.jwtToken)
          this.router.navigate(['/demo'])
        },
        err => {
          console.log(err)
        }
      )
    })
  }
}
