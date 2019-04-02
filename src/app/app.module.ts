import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './service/firebase.service';

import { fakeBackendProvider } from './_helpers/fake-backend';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { DisplayService } from './display/display.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './service/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthComponent} from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuard } from './service/auth.guard';
import { SearchComponent } from './search/search.component';
import { UserDetailResolver } from './user-detail/user-detail.resolver';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFireAuth } from 'angularfire2/auth';


// import { NebularComponent } from './nebular/nebular.component';
// import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component:RegisterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'detail/:id', component: UserDetailComponent, resolve:{data : UserDetailResolver} },
  { path: 'home', component:HomeComponent },
  { path: 'display', component:DisplayComponent },
  { path: 'users', component:UsersComponent },
  { path: 'search', component:SearchComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DisplayComponent,
    UserDetailComponent,
    UsersComponent,
    SearchComponent,
    AuthComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
   
  ],
  providers: [
    DisplayService,
    FirebaseService,
    fakeBackendProvider,
    JwtInterceptor,
    UserDetailResolver,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    AuthGuard,
    AngularFireAuth
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
