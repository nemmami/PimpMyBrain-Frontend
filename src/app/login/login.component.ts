import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  notification = "";

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router:Router, private authentificationService: AuthentificationService){}

  ngOnInit(): void {
  }

  onLoginButton(){
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    if(this.loginForm.status==="INVALID"){
      this.notification="Veuillez entrer tous les champs";
      return;
    }

    console.log(this.loginForm.value);
  }
}