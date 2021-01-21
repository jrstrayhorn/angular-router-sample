import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

// each feature module should have its own route config file - no matter how small
const crisisCenterRoutes: Routes = [
  {
    // at top level, paths that being with / refer to the root of the application
    // but child routes extend the path of the parent route. Each step down the route
    // tree, you add a slash followed by the route path, unless the path is empty
    // at this level, parent path is /crisis-center
    path: '',
    component: CrisisCenterComponent,
    // these child routes are shown in the RouterOutlet of the CrisisCenterComponent,
    // not in the RouterOutlet of the AppComponent shell
    children: [
      {
        path: '',
        component: CrisisListComponent,
        // the CrisisListComponent contains the crisis list and a RouterOutlet
        // to display the Crisis Center Home and Crisis Detail route component
        children: [
          {
            // at this level full URL is /crisis-center/2 or (/crisis-center+''+'/2')
            path: ':id',
            // router reuses components by default, so CrisisDetail component
            // will be re-used as you select different crises
            // the Hero Detail route was recreated each time
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService
            }
          },
          {
            // at this level full URL is /crisis-center (/crisis-center+''+'')
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  // important should only be one RouterModule.forRoot in app module, RouterModule.forChild in feature modules
  imports: [RouterModule.forChild(crisisCenterRoutes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
