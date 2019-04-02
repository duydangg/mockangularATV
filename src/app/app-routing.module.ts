import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SearchComponent } from './search/search.component';
import {UserDetailResolver} from './user-detail/user-detail.resolver';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
// import { NebularComponent } from './nebular/nebular.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'detail/:id', component: UserDetailComponent, resolve:{data : UserDetailResolver} },
  { path: 'home', component:HomeComponent },
  { path: 'display', component:DisplayComponent },
  { path: 'users', component:UsersComponent },
  { path: 'search', component:SearchComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
  )
],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
