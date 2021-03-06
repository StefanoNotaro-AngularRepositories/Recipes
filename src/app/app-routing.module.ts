import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { environment } from '../environments/environment';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: '**', pathMatch: 'full', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalytics.streamDataConnectionId),
    NgxGoogleAnalyticsRouterModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
