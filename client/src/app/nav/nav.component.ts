import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title: string = 'Movie War!';
  model: any = {};
  user: any = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error)
      }
      })
  }
  logout() {
    this.accountService.logout();
  }

}
