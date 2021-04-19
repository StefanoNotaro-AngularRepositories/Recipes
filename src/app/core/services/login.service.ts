import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginSessionKey = 'loginSessionKey';
  private isLogin = false;

  constructor() { }

  public login(email: string = '', password: string = ''): void {
    this.isLogin = true;
    sessionStorage.setItem(this.loginSessionKey, 'true');
  }

  public logout(): void {
    this.isLogin = false;
    sessionStorage.removeItem(this.loginSessionKey);
  }

  public getIsLogin(): boolean {
    const sessionData = sessionStorage.getItem(this.loginSessionKey);
    this.isLogin = sessionData?.toLowerCase() === 'true';
    return this.isLogin;
  }

}
