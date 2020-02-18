import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router
     ) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(
      next => {
        //console.log('Logged in successfully');
        this.alertifyService.success('Logged in successfully');
      },
      error => {
        //console.log('Failed to log in');
        //console.log(error);
        this.alertifyService.error(error);

      },
      () => {
        this.router.navigate(['/messages']);
      }
    );
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;

    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    //console.log('logged out');
    this.alertifyService.message('logged out');
  }


}
