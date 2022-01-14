import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthServiceService } from '../service/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }
  
  canActivate():boolean {
    if(this.authService.loggedIn()){
      return true
    }else {
      this.router.navigate(['/'])
      return false
    }
  }
  
}
