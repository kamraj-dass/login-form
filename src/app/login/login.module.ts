import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [AuthGuard],
})
export class LoginModule { }
