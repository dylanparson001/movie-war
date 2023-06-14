import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(error);
      }
      
    })
  }
}
