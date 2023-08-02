import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Authorization } from '../model/authorization';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public tokenKey = 'token';
    public loginForm!: FormGroup;

    constructor(
        private service: AuthenticationService,
        private router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
    }

    public onSubmit() {
        let user: User = new User();

        user.username = this.loginForm.get('username')?.value;
        user.password = this.loginForm.get('password')?.value;

        this.service.login(user);

        this.router.navigate(['/home']);
    }

    public register(): void {
        this.router.navigate(['/register']);
    }
}
