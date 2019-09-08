//Imports
import {AppRoutingModule} from './app-routing.module';
import {AppComponent}     from './app.component';
import {BrowserModule}    from '@angular/platform-browser';
import {FormsModule}      from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent}    from './home/home.component';
import {LoginComponent}   from './login/login.component';
import {NgModule}         from '@angular/core';


//App Module
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
