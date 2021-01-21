import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';

// Example of component-less route: grouping routes without a component
// the child route under AdminComponent has a path and a children property
// but it's not using a component
// to group the Crisis Center management routes under the admin path a component is unnecessary
// additionally, a component-less route makes it easier to guard child routes!!
const adminRoutes: Routes = [
  {
    // use empty path routes to group routes together without adding any additional
    // path segments to the URL.  Users will still visit /admin and the AdminComponent
    // still serves as the Routing Component containing child routes
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
