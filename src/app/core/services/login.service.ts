import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false;

  constructor() { }

  public login(email: string = '', password: string = ''): void {
    this.isLogin = true;
  }

  public logout(): void {
    this.isLogin = false;
  }

  public getIsLogin(): boolean {
    return this.isLogin;
  }

}
