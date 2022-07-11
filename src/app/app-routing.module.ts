import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { SuperAuthGuard } from './admin/services/super-auth.guard';
import { EventsComponent } from './events/events/events.component';
import { AdminAuthGuard } from './admin/services/admin-auth.guard';
import { EventFormComponent } from './events/event-form/event-form.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events/admin-events.component';
import { AdminEventComponent } from './admin/admin-events/admin-event/admin-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { TagsComponent } from './events/tags/tags.component';

const routes: Routes = [
  {path: 'admin/login', component: AdminLoginComponent},
  {
    path: 'admin/register', 
    canActivate: [SuperAuthGuard],
    component: AdminRegisterComponent
  },
  {
    path: 'admin/create',
    canActivate: [AdminAuthGuard],
    component: EventFormComponent
  },
  {
    path: 'admin/events/:id/tags',
    canActivate: [AdminAuthGuard],
    component: TagsComponent
  },
  {
    path: 'admin/events', 
    canActivate: [AdminAuthGuard],
    component: AdminEventsComponent
  },
  {
    path: 'admin/events/event/:id', 
    canActivate: [AdminAuthGuard],
    component: AdminEventComponent
  },
  {path: 'events', component: EventsComponent},
  {path: 'events/details/:id', component: EventDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: '', redirectTo: 'events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
