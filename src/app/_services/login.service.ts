import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl;
  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';
  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);

  }

  login(data: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${btoa(data.username + ':' + data.password)}`,
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'from': 'from'
    });

    return this.http.post(`${this.apiUrl}/exchangeapi/user/authenticate`, data, {
      headers: httpHeaders
    });

  }

  loginSuccess(authToken: string) {
    localStorage.setItem(this.authSecretKey, authToken);
    this.isAuthenticated = true;
  }


  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;

  }
}
