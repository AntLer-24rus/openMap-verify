import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './about-page.component';
import {AuthGuard} from 'src/app/api/guard/auth.guard';

const routes: Routes = [
  {path: 'about', component: AboutPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {
}
