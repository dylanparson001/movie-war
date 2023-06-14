import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Movie War!';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {

    // Safer to check for user data this way, gets string for user key and later checks it
    const userString = localStorage.getItem('user');

    // if there is no userstring, return nothing
    if (!userString) return;

    // at this point we know there is a user in localstorage, safe to parse
    const user: User = JSON.parse(userString);
    
    
    this.accountService.setCurrentUser(user);
  }

}
