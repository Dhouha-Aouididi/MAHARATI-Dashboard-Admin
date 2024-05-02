import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';
import { InboxComponent } from './inbox/inbox.component';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserManagmentComponent,
    CreateServiceComponent,
    CreateProviderComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    BoardAdminComponent,
    ServiceListComponent,
    ServiceEditComponent,
    ProviderListComponent,
    ProviderEditComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
