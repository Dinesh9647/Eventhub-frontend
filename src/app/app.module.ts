import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { EventsComponent } from './events/events/events.component';
import { EventCardComponent } from './events/event-card/event-card.component';
import { EventsFilterComponent } from './events/events-filter/events-filter.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events/admin-events.component';
import { AdminEventComponent } from './admin/admin-events/admin-event/admin-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { TagsComponent } from './events/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    EventsComponent,
    EventCardComponent,
    EventsFilterComponent,
    EventFormComponent,
    AdminEventsComponent,
    AdminEventComponent,
    EventDetailsComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
