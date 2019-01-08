import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;
  users: any;
  errorMessage: string;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      let roles = this.tokenStorage.getAuthorities();
      roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.isAdmin = true;
          this.userService.getUsers().subscribe(
            data => {
              this.users = data;
            },
            error => {
              this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
            }
          );
          return false;
        }
        return true;
      });
    }
  }

}
