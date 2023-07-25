import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        private service: AuthenticationService,
        private router: Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', Validators.required)
        })
    }

    public onSubmit() {
        let user: User = new User();

        user.email = this.loginForm.get('email')?.value;
        user.password = this.loginForm.get('password')?.value;

        this.router.navigate(['/home'])

        // this.service.login(user);
    }

    public registrar(): void {
        this.router.navigate(['/register']);
    }
}
