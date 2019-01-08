import { Component, OnInit } from '@angular/core';
import {HistoryService} from '../services/history.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isUser = false;
  histories: any;
  errorMessage: string;
  isLoggedIn = false;

  constructor(private historyService: HistoryService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      let roles = this.tokenStorage.getAuthorities();
      roles.every(role => {
        if (role === 'ROLE_USER') {
          this.isUser = true;
          this.historyService.getHistories().subscribe(
            data => {
              this.histories = data;
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
