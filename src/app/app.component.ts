import { Component } from '@angular/core';
import { LoginService } from './_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.isLogin = this.loginService.isAuthenticatedUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/'])
  .then(() => {
    window.location.reload();
  });
  }
}
