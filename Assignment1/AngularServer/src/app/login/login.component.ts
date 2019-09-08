//Imports
import {Component, OnInit} from '@angular/core';
import {FormsModule}       from '@angular/forms';
import {HttpClient}        from '@angular/common/http';
import {Router}            from '@angular/router';


const SERVER = "http://localhost:3000";

//Component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//Login Functions
export class LoginComponent implements OnInit {
  username = "";
  access = false;
  error = "Error, Incorrect Username";

  constructor(private router:Router, private form:FormsModule, private http:HttpClient) { }
  ngOnInit() {}

  // User Authentication
  login(){
    let userObject = {username: this.username};
    this.http.post<any>(SERVER + "/authenticateUser", userObject).subscribe((data) =>{
      if(data){
        this.access = true;
        console.log(userObject);
        localStorage.setItem("username", this.username);
        this.router.navigateByUrl("/home");
      }
      else{
        alert(this.error);
        this.access = false;
      }
    })
  }

}
