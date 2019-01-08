import { Component, OnInit } from '@angular/core';
import {OneParamCalculation} from './one-param-calculation';
import {TwoParamCalculation} from './two-param-calculation';
import {CalculateService} from '../services/calculate.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUser = false;
  form: any = {};
  isLoggedIn = false;
  calculateSuccess = false;
  errorMessage = '';
  calculateResult;
  isTwoCalculation = true;
  private oneParamCalculation: OneParamCalculation;
  private twoParamCalculation: TwoParamCalculation;

  constructor(private calcService: CalculateService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      let roles = this.tokenStorage.getAuthorities();
      roles.every(role => {
        if (role === 'ROLE_USER') {
          this.isUser = true;
          this.form.type = "addition";
          return false;
        }
        return true;
      });
    }
  }

  onSubmit() {
    if (this.form.type == "square") {
      this.calculateOneParam();
    }else {
      this.calculateTwoParam();
    }
  }

  calculateOneParam(){
    let param = this.form.param;
    if (isNaN(param)) {
      this.errorMessage = "Input must be a number";
      return;
    }
    this.oneParamCalculation = new OneParamCalculation(this.form.type, param);

    this.calcService.calculateOneParam(this.oneParamCalculation).subscribe(
      data => {
        this.calculateResult = data;
        this.calculateSuccess = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.calculateSuccess = false;
      }
    );
  }

  calculateTwoParam(){
    let param1 = this.form.param1;
    let param2 = this.form.param2;
    if (isNaN(param1) || isNaN(param2)) {
      this.errorMessage = "Input must be a number";
      return;
    }
    this.twoParamCalculation = new TwoParamCalculation(this.form.type, param1, param2);

    this.calcService.calculateTwoParam(this.twoParamCalculation).subscribe(
      data => {
        this.calculateResult = data;
        this.calculateSuccess = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.calculateSuccess = false;
      }
    );
  }

  changeOperation(operation){
    if (operation == "square") {
      this.isTwoCalculation = false;
    } else{
      this.isTwoCalculation = true;
    }
  }
}
