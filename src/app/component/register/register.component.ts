import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/authService/auth-service.service';
import { Router } from '@angular/router';
import { ConfirmedPassword } from 'src/app/validation/confirmed-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regForm()
  }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  regForm(){
    this.form = this.fb.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, ConfirmedPassword]]
    })
  }

  getvalue(){
    let registerUserData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.registerUser(registerUserData)
    .subscribe(
      res => {
        this.router.navigate(['/'])
      },
      err => console.log(err)
    )
  }
}
