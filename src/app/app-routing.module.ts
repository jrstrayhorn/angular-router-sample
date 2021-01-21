import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    data: { preload: true }
  },
  {
    // when the router navigates to this route, it uses the loadChildren string to
    // dynamically load the AdminModule.  Then it adds the AdminModule routes to its
    // current route configuration.  Finally, it loads the requested route to the destination
    // admin component.
    path: 'admin',
    // when using absolute paths, the NgModule file location must begin with src/app
    // in order to resolve correctly.  For custom path mapping with absolute paths,
    // you must configure the baseUrl and paths properties in the project tsconfig.json
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService
        // PreloadAllModules
        // this configures the Router preloader to immediately load all lazy loaded routes
        // (routes with a loadChildren property)
      }
    ),
  ],
  exports: [
    RouterModule // re-exporting here so components declared in appModule have access to router directives
  ],
  providers: [
    SelectivePreloadingStrategyService
  ]
})
export class AppRoutingModule { }
