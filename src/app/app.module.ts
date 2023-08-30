import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { GridComponent } from './grid/grid.component';
import { AppsService } from './services/apps.service';
import { HttpClientModule } from '@angular/common/http';
import { AppCardComponent } from './app-card/app-card.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { NotificationComponent } from './notification/notification.component';

import { MatDialogModule } from '@angular/material/dialog';
import { AccessFormComponent } from './access-form/access-form.component';
import { AdminGuardService } from './admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GridComponent,
    AppCardComponent,
    LoginFormComponent,
    ProfileComponent,
    AdminOverviewComponent,
    NotificationComponent,
    AccessFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'login',
        component: LoginFormComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'admin',
        component: AdminOverviewComponent,
        pathMatch: 'full',
        canActivate: [AdminGuardService],
      },
    ]),
  ],
  providers: [AppsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
