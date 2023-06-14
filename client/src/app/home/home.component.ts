import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account-service.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registered: boolean = false;
  user: string = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  setCurrentUser() {

    // Safer to check for user data this way, gets string for user key and later checks it
    const userString = localStorage.getItem('user');
    
    // if there is no userstring, return nothing
    if (!userString) return;

    // at this point we know there is a user in localstorage, safe to parse
    this.user = JSON.parse(userString);
    
    console.log(this.user);
    

  }

}
