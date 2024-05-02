import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { SigninComponent } from './signin/signin.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { InboxComponent } from './inbox/inbox.component';


const routes: Routes = [
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent},
  { path: 'provider', component: ProviderListComponent },
  { path: 'service', component: ServiceListComponent},
  { path: 'createprovider', component: CreateProviderComponent},
  { path: 'createservice', component: CreateServiceComponent},
  { path: 'user', component: UserManagmentComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'admin', component: BoardAdminComponent},
  { path: 'edit-service/:id', component: ServiceEditComponent },
  { path: 'inbox', component: InboxComponent},

  // { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
