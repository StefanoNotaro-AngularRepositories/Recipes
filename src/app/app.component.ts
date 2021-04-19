import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from '../environments/environment';
import { LoginService } from './core/services/login.service';

// tslint:disable-next-line: ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Recipes';

  public isLogin = false;

  constructor(public router: Router, protected $gaService: GoogleAnalyticsService, private loginService: LoginService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && environment.production) {
        this.$gaService.pageView(event.urlAfterRedirects, event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.isLogin = this.loginService.getIsLogin();
  }

  public onClick(): void {
    if (!this.isLogin) {
      this.loginService.login();
    } else {
      this.loginService.logout();
    }

    this.isLogin = this.loginService.getIsLogin();
  }
}
