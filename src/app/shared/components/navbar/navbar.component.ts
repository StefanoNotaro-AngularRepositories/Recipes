import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void { }

  public onClick(): void {
    if (!this.isLogin) {
      this.loginService.login();
    } else {
      this.loginService.logout();
    }

    this.isLogin = this.loginService.getIsLogin();
  }

}
