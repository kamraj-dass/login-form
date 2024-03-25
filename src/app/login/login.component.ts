import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  isConfirm: boolean = false;

  token: string | undefined;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      timezone: [''],
      recaptcha: ['', [Validators.required]],
      fbtoken: ['']
    });
    this.token = undefined;

  }

  ngOnInit(): void {
  }


  login() {
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.myForm.controls['timezone'].setValue(timeZone);
    this.loginService.login(this.myForm.value).subscribe((x: any) => {
      if (x?.token) {
        this.loginService.loginSuccess(x.token);
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
      } else {
        alert("invalid username and password")

      }
    })
  }


  public addTokenLog(message: string, token: any) {
    console.log(`${message}: ${this.formatToken(token)}`);
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substring(0, 7)}...${token.substring(token.length - 7)}`
      : 'null';
  }

}
