import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

// each feature module should have its own route config file - no matter how small
const heroesRoutes: Routes = [
  { path: 'heroes', component: HeroListComponent, data: { animation: 'heroes' } },
  { path: 'hero/:id', component: HeroDetailComponent, data: { animation: 'hero' } }
];

@NgModule({
  // important should only be one RouterModule.forRoot in app module, RouterModule.forChild in feature modules
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
