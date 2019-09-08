//Imports
import {Component, OnInit} from '@angular/core';
import {FormsModule}       from '@angular/forms';
import {HttpClient}        from '@angular/common/http';
import {Router}            from '@angular/router';

//Server 
const SERVER = "http://localhost:3000";

//Component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//Home Functions
export class HomeComponent implements OnInit {
  // User
  user = [];
  users = [];
  username="";
  newUser = "";
  newEmail = "";
  newRole = "";

  // Group
  groups = [];
  groupName="";
  newGroup = "";

  // Channel
  channels = [];
  channelName="";
  newChannel="";

  //Error
  error = '';

  constructor(private forms:FormsModule, private router:Router, private http:HttpClient) { }
   // Logout
  logout(){
    console.log('Log out');
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

  // Fetch Current User
  fetchCurrentUser(){
    let userObject = {"username" : this.username};
    this.http.post<any>(SERVER + "/fetchCurrentUser", userObject).subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit() {
    // Remember User
    this.username = localStorage.getItem("username");
    this.fetchCurrentUser();
    this.fetchUsers();
    this.fetchGroups();
    this.fetchChannels();
  }

  // Fetch Users
  fetchUsers(){
    let userObject = {"username" : this.username};
    this.http.post<any>(SERVER + "/fetchUsers", userObject).subscribe((data) => {
      this.users = data;
    });
  }
  // Create User
  createUser(){
    let userObject = {
      "newUser" : "",
      "newEmail" : "",
      "newRole" : "",
    }

    userObject.newUser = this.newUser;
    userObject.newEmail = this.newEmail;
    userObject.newRole = this.newRole;

    this.http.post<any>(SERVER + "/createUser", userObject).subscribe((data) => {
      if(data != "User exists"){
        this.users = data;
      }
      else{
        this.error = data;
      }
    });
  }

  // Delete User
  deleteUser(){
    let userObject = {"username" : this.username};
    this.http.post<any>(SERVER + "/deleteUser", userObject).subscribe((data) => {
      this.users = data;
    })
  }

  // Fetch Groups
  fetchGroups(){
    let userObject = {"groupName" : this.groupName};
    this.http.post<any>(SERVER + "/fetchGroups", userObject).subscribe((data) => {
      this.groups = data;
    });
  }

  // Create Group
  createGroup(){
    let groupObject = {
      "groupName" : this.newGroup
    }

    this.http.post<any>(SERVER + "/createGroup", groupObject).subscribe((data) => {
      if(data != "Group exists"){
        this.groups = data;
      }
      else{
        this.error = data;
      }
    });
  }
  
  // Delete Group
  deleteGroup(){
    let groupObject = {"groupName" : this.groupName};
    this.http.post<any>(SERVER + "/deleteGroup", groupObject).subscribe((data) => {
      this.groups = data;
    })
  }

  // Add User (Group)
  addGroupUser(){
    let groupObject = {
      "groupName" : this.groupName,
      "username" : this.username
    }

    this.http.post<any>(SERVER + "/addGroupUser", groupObject).subscribe((data) => {
      if(data){
        this.groups = data;
      }
      else{
        this.error = data;
      }
    });
  }

  // Remove User (Group)
  removeGroupUser(){
    let groupObject = {
      "groupName" : this.groupName,
      "username" : this.username
    }

    this.http.post<any>(SERVER + "/removeGroupUser", groupObject).subscribe((data) => {
      if(data){
        this.groups = data;
      }
      else{
        this.error = data;
      }
    });
  }

 // Fetch Channels
  fetchChannels(){
    let channelObject = {"channelName" : this.channelName};
    this.http.post<any>(SERVER + "/fetchChannels", channelObject).subscribe((data) => {
      this.channels = data;
    });
  }
  // Create a channel
  createChannel(){
    let channelObj = {
      "channelName" : this.newChannel,
      "groupName" : this.groupName
    }

    this.http.post<any>(SERVER + "/createChannel", channelObj).subscribe((data) => {
      if(data != "Channel exists"){
        this.channels = data;
      }
      else{
        this.error = data;
      }
    });
  }

  // Delete Channel
  deleteChannel(){
    let channelObject = {"channelName" : this.channelName};
    this.http.post<any>(SERVER + "/deleteChannel", channelObject).subscribe((data) => {
      this.channels = data;
    })
  }

  // Add User (Channel)
  addChannelUser(){
    let channelObject = {
      "channelName" : this.channelName,
      "username" : this.username
    }

    this.http.post<any>(SERVER + "/addChannelUser", channelObject).subscribe((data) => {
      if(data){
        this.channels = data;
      }else{
        this.error = data;
      }
    });
  }

  // Delete Users (Channel)
  removeChannelUser(){
    let channelObject = {
      "channelName" : this.channelName,
      "username" : this.username
    }

    this.http.post<any>(SERVER + "/removeChannelUser", channelObject).subscribe((data) => {
      if(data){
        this.channels = data;
      }
      else{
        this.error = data;
      }
    });
  }
}
