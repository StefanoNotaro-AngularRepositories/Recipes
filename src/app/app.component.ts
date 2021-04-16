import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from '../environments/environment';

// tslint:disable-next-line: ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Recipes';

  constructor(public router: Router, protected $gaService: GoogleAnalyticsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && environment.production) {
        this.$gaService.pageView(event.urlAfterRedirects, event.urlAfterRedirects);
      }
    });
  }
}
