import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { SideListComponent } from './side-list/side-list.component';
import { LoginComponent } from './login/login.component';
import { PasswordListComponent } from './password-list/password-list.component';

import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ApiService } from './services/apiService.service';
import { HttpService } from './services/httpService.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideListComponent,
    LoginComponent,
    PasswordListComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
